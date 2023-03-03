import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";
import PersonalDetails from "../../PersonalDetails";
import Bucket from "../Bucket";
import FightController from "../FightController";

export default class RoundRobinDraw implements IDraw {
    actualFightIndex: number = 0;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[];
    carousel: Competitor[];
    bucket: Bucket;
    playedMatches: number = 0;
    currentBucket: Bucket | null;

    constructor(competitors: Competitor[], matches: IndividualMatch[], drawId: number, saveFightsToDatabase: boolean) {
        this.competitors = competitors;
        this.rounds = []
        this.matches = []
        this.carousel = competitors.slice()

        this.bucket = new Bucket(this.competitors, null)
        this.currentBucket = this.bucket

        let personal = new PersonalDetails(0, "Free", "Fight", "", "", "")
        let freeFight = new Competitor(null, personal, "", "", 0)

        let numberOfMatches = (this.carousel.length * (this.carousel.length - 1) / 2)
        let numberOfRounds = this.carousel.length

        let startConnected = 0;
        let lastConnected = this.carousel.length - 1
        let roundIndex = 1

        this.createRounds(numberOfMatches, numberOfRounds);

        if (matches.length > 0) {
            this.matches = matches.slice(0, numberOfMatches);
            this.matches[0].actualPlaying = true;

            for (let i = 0; i < this.countPlayedMatches(matches); i++)
                this.playActualMatch(matches[i].winner == matches[i].firstCompetitor, drawId).finally();
        } else {
            for (let i = 0; i < numberOfMatches; i++) {
                if (lastConnected <= startConnected) {
                    roundIndex++

                    if (numberOfRounds % 2 == 0 && roundIndex == Math.floor(numberOfRounds / 2) + 1) {
                        this.carousel = this.carousel.concat([freeFight])
                    } else if (numberOfRounds % 2 == 0 && roundIndex > Math.floor(numberOfRounds / 2) + 1) {
                        let last = this.carousel.slice(this.carousel.length - 1, this.carousel.length)
                        let first = this.carousel.slice(this.carousel.length - 2, this.carousel.length - 1)
                        let middle = this.carousel.slice(0, this.carousel.length - 2)
                        this.carousel = first.concat(middle).concat(last)
                    } else {
                        let first = this.carousel.slice(this.carousel.length - 1, this.carousel.length)
                        let rest = this.carousel.slice(0, length - 1)
                        this.carousel = first.concat(rest)
                    }

                    startConnected = 0;
                    lastConnected = this.carousel.length - 1;
                }
                if (this.carousel[lastConnected] != freeFight)
                    this.matches.push(new IndividualMatch(this.carousel[startConnected], this.carousel[lastConnected], null));
                else i--;

                startConnected++;
                lastConnected--;
            }

            if (saveFightsToDatabase)
                this.saveGeneratedFights(drawId).finally();
        }
        if (this.matches.length != 0) {
            this.actualFightIndex = this.findActualFightIndex();
            this.matches[this.actualFightIndex].actualPlaying = true;
        }

        this.playedMatches = this.countPlayedMatches(this.matches);
    }

    async saveGeneratedFights(drawId: number): Promise<void> {
        for (let i = 0; i < this.matches.length; i++) {
            await FightController.saveFight(this.matches[i], drawId, i);
        }
    }

    createRounds(numberOfMatches: number, numberOfRounds: number) {
        let numOfMatchesInRound = Math.ceil(numberOfMatches / numberOfRounds);
        this.rounds.push(new Round("Round 1", 0, numOfMatchesInRound - 1));
        for (let i = 2; i < numberOfRounds + 1; i++) {
            if (numberOfRounds == 4 && i == 4)
                continue
            const firstFightIndex = this.rounds[i - 2].lastFightIndex + 1
            this.rounds.push(new Round("Round " + i, firstFightIndex, firstFightIndex + numOfMatchesInRound - 1));
        }
    }

    findActualFightIndex(): number {
        for (let i = 0; i < this.matches.length; i++) {
            if (this.matches[i].winner == null)
                return i;
        }
        return 0;
    }

    countPlayedMatches(matches: IndividualMatch[]): number {
        let playedMatches = 0;
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].winner != null)
                playedMatches++;
        }
        return playedMatches;
    }

    getActualMatch(): IndividualMatch {
        return this.matches[this.actualFightIndex];
    }

    getNextMatch(): IndividualMatch {
        return this.matches[this.actualFightIndex + 1];
    }

    goToMatch(matchNumber: number): void {
        this.actualFightIndex = matchNumber;
    }

    goToNextMatch(): void {
        if (this.actualFightIndex + 1 == this.matches.length ||
            (this.getNextMatch().firstCompetitor == null && this.getNextMatch().secondCompetitor == null)
        ) return;

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true
    }

    goToPrevMatch(): void {
        if (this.actualFightIndex == 0) return;

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true
    }

    async playActualMatch(firstWin: boolean, drawId: number): Promise<void> {
        if (firstWin)
            this.getActualMatch().firstCompetitor!.points++;
        else
            this.getActualMatch().secondCompetitor!.points++;

        this.getActualMatch().playMatch(firstWin);
        if (this.getActualMatch().winner != null)
            this.playedMatches++;

        FightController.saveFight(this.getActualMatch(), drawId, this.actualFightIndex).finally();

        if (this.playedMatches == this.matches.length) {
            let breakLoop: boolean = true;
            let stepBack: boolean = false;
            do {
                if (!stepBack)
                    this.generateBuckets();

                let bucketWithOvertime = this.findBucketWithOvertime();
                if (bucketWithOvertime != null) {
                    this.generateNewRounds(drawId);
                    this.currentBucket = bucketWithOvertime;
                    breakLoop = false;
                    stepBack = false;
                } else {
                    this.setCompetitorsInProperOrder();
                    this.currentBucket = this.currentBucket!.parent
                    stepBack = true;
                }
            } while (breakLoop && this.currentBucket != null)
            if (this.currentBucket != null)
                this.goToNextMatch();
        } else {
            this.goToNextMatch();
        }
    }

    getActualRound(): Round {
        return this.rounds[0]
    }

    generateBuckets() {
        let currentBucket = this.currentBucket;
        currentBucket!.competitors.sort((a, b) => b.points - a.points);

        currentBucket!.addBucket(new Bucket([currentBucket!.competitors[0]], currentBucket));
        let numberOfCompetitorsInBucket: number = 1;
        for (let i = 1; i < currentBucket!.competitors.length; i++) {
            if (currentBucket!.buckets[currentBucket!.currentBucketIndex].competitors[0].points
                != currentBucket!.competitors[i].points) {
                currentBucket!.addBucket(new Bucket([currentBucket!.competitors[i]], currentBucket));

                if (numberOfCompetitorsInBucket < 3)
                    currentBucket!.buckets[currentBucket!.currentBucketIndex].done = true;

                currentBucket!.currentBucketIndex++;
                numberOfCompetitorsInBucket = 1;
            } else {
                currentBucket!.buckets[currentBucket!.currentBucketIndex].addCompetitor(currentBucket!.competitors[i])
                numberOfCompetitorsInBucket++;
            }
        }

        if (numberOfCompetitorsInBucket < 3)
            currentBucket!.buckets[currentBucket!.currentBucketIndex].done = true;

        currentBucket!.currentBucketIndex = 0;
    }

    findBucketWithOvertime(): Bucket | null {
        let currentBucket = this.currentBucket;

        while (currentBucket!.currentBucketIndex < currentBucket!.buckets.length && currentBucket!.buckets[currentBucket!.currentBucketIndex].done) {
            currentBucket!.currentBucketIndex++;
        }

        if (currentBucket!.currentBucketIndex == currentBucket!.buckets.length)
            return null
        return currentBucket!.buckets[currentBucket!.currentBucketIndex]
    }

    generateNewRounds(drawId: number) {
        let bucketWhichNeedsOvertime = this.findBucketWithOvertime();

        let competitors = bucketWhichNeedsOvertime!.competitors;
        this.carousel = competitors.slice()

        let personal = new PersonalDetails(0, "Free", "Fight", "Free Fight", "Free Fight", "Free Fight")
        let freeFight = new Competitor(null, personal, "Free Fight", "Free Fight", 0)

        let numberOfMatches = (this.carousel.length * (this.carousel.length - 1) / 2)
        let numberOfRounds = this.carousel.length
        let startConnected = 0;
        let lastConnected = this.carousel.length - 1
        let roundsBefore = this.rounds.length
        let roundIndex = this.rounds.length + 1

        this.rounds.push(new Round("Round " + roundIndex, this.playedMatches, 0))
        for (let i = 0; i < numberOfMatches; i++) {
            if (lastConnected <= startConnected) {
                roundIndex++
                this.rounds[this.rounds.length - 1].lastFightIndex = this.playedMatches + i - 1

                if (numberOfRounds != 4 || roundIndex - roundsBefore != 4)
                    this.rounds.push(new Round("Round " + roundIndex, this.playedMatches + i, 0))

                if (numberOfRounds % 2 == 0 && roundIndex == roundsBefore + Math.floor(numberOfRounds / 2) + 1) {
                    this.carousel = this.carousel.concat([freeFight])
                } else if (numberOfRounds % 2 == 0 && roundIndex > roundsBefore + Math.floor(numberOfRounds / 2) + 1) {
                    let last = this.carousel.slice(this.carousel.length - 1, this.carousel.length)
                    let first = this.carousel.slice(this.carousel.length - 2, this.carousel.length - 1)
                    let middle = this.carousel.slice(0, this.carousel.length - 2)
                    this.carousel = first.concat(middle).concat(last)
                } else {
                    let first = this.carousel.slice(this.carousel.length - 1, this.carousel.length)
                    let rest = this.carousel.slice(0, length - 1)
                    this.carousel = first.concat(rest)
                }

                startConnected = 0;
                lastConnected = this.carousel.length - 1;
            }
            if (this.carousel[lastConnected] != freeFight) {
                this.matches.push(new IndividualMatch(this.carousel[startConnected], this.carousel[lastConnected], null));
                FightController.saveFight(this.matches[this.matches.length - 1], drawId, this.matches.length - 1).finally();
            } else i--;

            startConnected++;
            lastConnected--;
        }
        this.rounds[this.rounds.length - 1].lastFightIndex = this.playedMatches + numberOfMatches - 1

        this.matches[this.playedMatches + 1].actualPlaying = true
    }

    setCompetitorsInProperOrder() {
        let currentBucket = this.currentBucket;
        let localRanking: Competitor[] = []
        for (let i = 0; i < currentBucket!.buckets.length; i++) {
            localRanking.concat(currentBucket!.buckets[i].competitors);
        }

        currentBucket!.competitors = localRanking;
        currentBucket!.buckets = [];
        currentBucket!.done = true;
    }
}