import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";
import PersonalDetails from "../../PersonalDetails";
import Category from "../../Category";

export default class RoundRobinDraw implements IDraw {
    actualFightIndex: number;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[]
    carousel:Competitor[]

    constructor(competitors: Competitor[]) {
        this.actualFightIndex = 0
        this.competitors = competitors;
        this.rounds = []
        this.carousel = competitors.slice()

        let personal = new PersonalDetails(null, "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los")
        let freeFight = new Competitor(null, personal, "Wolny Los", "Wolny Los", 0)

        let numberOfMatches = (this.carousel.length * (this.carousel.length - 1) / 2)
        let numberOfRounds = this.carousel.length
        this.matches = []
        let startConnected = 0;
        let lastConnected = this.carousel.length - 1
        let roundIndex = 1

        this.rounds.push(new Round("Runda " + roundIndex, 0, undefined))
        for (let i = 0; i < numberOfMatches; i++) {
            if (lastConnected <= startConnected) {
                roundIndex++
                this.rounds[this.rounds.length - 1].lastFightIndex = i - 1

                if (numberOfRounds != 4 || roundIndex != 4)
                    this.rounds.push(new Round("Runda " + roundIndex, i, undefined))

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
        this.rounds[this.rounds.length - 1].lastFightIndex = numberOfMatches - 1
        if (this.matches.length>0)
            this.matches[0].actualPlaying = true
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
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true

    }

    goToPrevMatch(): void {
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true
    }

    playActualMatch(firstWin: boolean): void {
        try{
            if(firstWin){
                this.getActualMatch().firstCompetitor.points ++
            }else{
                this.getActualMatch().secondCompetitor.points ++
            }
        }catch (e){
            console.log(e)
        }

        this.getActualMatch().playMatch(firstWin);

        this.goToNextMatch();
    }

    getActualRound(): Round {
        return this.rounds[0]
    }


}