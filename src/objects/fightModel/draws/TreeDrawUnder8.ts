import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";
import FightController from "../FightController";

export default class TreeDrawUnder8 implements IDraw {
    actualFightIndex: number;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[]
    results:Competitor[]
    actualFightIndexToArrayIndex: Map<number, number>

    constructor(competitors: Competitor[], matches: IndividualMatch[], drawId: number, saveFightsToDatabase: boolean) {
        this.competitors = competitors
        this.results = new Array(8)
        this.actualFightIndexToArrayIndex = new Map<number, number>()
        this.initializeActualFightIndexMap();

        if (matches.length != 0) {
            this.matches = matches.concat(
                new Array(12 - matches.length).fill(new IndividualMatch(null, null, null)))
        } else {
            this.matches = new Array(12).fill(new IndividualMatch(null, null, null));

            let actualCompetitor = 0;
            for (let i = 4; i <= 7; i++) {
                this.matches[i] = new IndividualMatch(competitors[actualCompetitor], competitors[actualCompetitor + 1], null)
                actualCompetitor += 2
            }

            for (let i = 1; i < 4; i++)
                this.matches[i] = new IndividualMatch(null, null, null)

            for (let i = 11; i >= 8; i--)
                this.matches[i] = new IndividualMatch(null, null, null)

            if (saveFightsToDatabase)
                this.saveGeneratedFights(drawId).finally();
        }

        this.rounds = []
        this.rounds.push(new Round("Elimination", 1, 4));
        this.rounds.push(new Round("Semi-finals", 5, 6));
        this.rounds.push(new Round("Repechage", 7, 8));
        this.rounds.push(new Round("Bronze medals", 9, 10));
        this.rounds.push(new Round("Final", 11, 11));

        let [actualFightIndex, indexInArray] = this.findActualFightIndex();
        this.actualFightIndex = actualFightIndex;
        this.matches[indexInArray].actualPlaying = true;
    }

    async saveGeneratedFights(drawId: number): Promise<void> {
        for (let i = 0; i < this.matches.length; i++) {
            await FightController.saveFight(this.matches[i], drawId, i);
        }
    }

    initializeActualFightIndexMap(): void {
        let fightIndex = 0
        for (let i = 4; i <= 7; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++;
        }
        for (let i = 2; i < 4; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 11; i >= 10; i--) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 9; i >= 8; i--) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.actualFightIndexToArrayIndex.set(fightIndex, 1)
    }

    findActualFightIndex(): [number, number] {
        let matchId = 0;
        let minFightId = 100;
        for (let i = 0; i < this.matches.length; i++) {
            let arrayId = this.actualFightIndexToArrayIndex.get(i) as number
            if (i < minFightId && this.matches[arrayId].winner == null) {
                minFightId = i;
                matchId = arrayId;
                break;
            }
        }
        return [minFightId, matchId];
    }

    getActualMatch(): IndividualMatch {
        return this.matches[this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number];
    }

    getNextMatch(): IndividualMatch {
        return this.matches[this.actualFightIndexToArrayIndex.get(this.actualFightIndex + 1) as number];
    }

    goToMatch(matchNumber: number): void {
        this.actualFightIndex = matchNumber;
    }

    goToNextMatch(): void {
        if (this.actualFightIndex + 1 == this.matches.length ||
            (this.getNextMatch().firstCompetitor == null && this.getNextMatch().secondCompetitor == null)
        ) return;

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length - 1);
        this.getActualMatch().actualPlaying = true

    }

    goToPrevMatch(): void {
        if (this.actualFightIndex == 0) return;

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length - 1);
        this.getActualMatch().actualPlaying = true
    }

    async playActualMatch(firstWinn: boolean, drawId: number): Promise<void> {
        this.getActualMatch().playMatch(firstWinn);
        //przepisanie wygranego z eliminacji do pół finałów
        //a przegranego do repasarzy

        if (this.actualFightIndex < 4) {
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner
            await FightController.saveFight(this.matches[parentIndex], drawId, parentIndex)

            // debugger
            switch (this.actualFightIndex) {
                case 0:
                    this.matches[10].firstCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    await FightController.saveFight(this.matches[10], drawId, 10)
                    break;
                case 1:
                    this.matches[10].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    await FightController.saveFight(this.matches[10], drawId, 10)
                    break;
                case 2:
                    this.matches[11].firstCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    await FightController.saveFight(this.matches[11], drawId, 11)
                    break;
                case 3:
                    this.matches[11].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    await FightController.saveFight(this.matches[11], drawId, 11)
                    break;
            }
        }
        //a z pół finałów do finałów i repasarzy
        if (this.actualFightIndex >= 4 && this.actualFightIndex < 6) {
            //przepisanie do finału wygranego
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner
            await FightController.saveFight(this.matches[parentIndex], drawId, parentIndex)
            //przepisanie do walki o brąz przegranego
            if (this.actualFightIndex == 4) {
                this.matches[8].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                await FightController.saveFight(this.matches[8], drawId, 8)
            } else {
                this.matches[9].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                await FightController.saveFight(this.matches[9], drawId, 9)
            }
        }
        // debugger
        if (this.actualFightIndex >= 6 && this.actualFightIndex < 10) {
            // debugger
            switch (this.actualFightIndex) {
                case 6:
                    this.matches[8].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[8], drawId, 8)
                    this.results[7] = <Competitor>this.getActualMatch().looser;
                    break;
                case 7:
                    this.matches[9].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[9], drawId, 9)
                    this.results[6] = <Competitor>this.getActualMatch().looser;

                    break;
            }
        }

        await FightController.saveFight(this.getActualMatch(), drawId, this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number);
        console.log(this.getActualMatch())
        await FightController.saveFight(this.getActualMatch(), drawId, this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number);
        await FightController.saveResult(drawId,this.getResults())

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex++
        if (this.getActualMatch()) {
            this.getActualMatch().actualPlaying = true
        }
    }

    getActualRound(): Round {
        return this.rounds[0];
    }

    getResults(): Competitor[]{
        this.results[0] = <Competitor>this.matches[1]?.winner
        this.results[1] = <Competitor>this.matches[1]?.looser
        this.results[2] = <Competitor>this.matches[8]?.winner
        this.results[3] = <Competitor>this.matches[9]?.winner
        this.results[4] = <Competitor>this.matches[8]?.looser
        this.results[5] = <Competitor>this.matches[9]?.looser
        return this.results;
    }
}