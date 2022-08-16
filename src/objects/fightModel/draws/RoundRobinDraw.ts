import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";

export default class RoundRobinDraw implements IDraw {
    actualFightIndex: number;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[]


    constructor(competitors: Competitor[]) {
        this.competitors = competitors;
        this.rounds = [new Round("Round robin", 0, undefined)]
        let numberOfMatches = (competitors.length * (competitors.length - 1) / 2)
        this.matches = new Array(numberOfMatches).fill(new IndividualMatch(null, null, null))
        let carusele = competitors.length % 2 == 0 ? new Array(competitors.length) : new Array(competitors.length + 1)
        let startConnected = 0;
        let lastConnected = competitors.length % 2 ? competitors.length - 1 : competitors.length - 2
        let actualFightIndex = 0
        this.matches.forEach(function (match:IndividualMatch){
            match.firstCompetitor = competitors[startConnected]
            match.secondCompetitor = competitors[lastConnected]
            startConnected++;
            lastConnected--;

            if(lastConnected<=startConnected){
                let startConnected = 0;
                let lastConnected = competitors.length % 2 ? competitors.length - 1 : competitors.length - 2

            //    tutaj przesłuwam tablice
            }
        })
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
        this.actualFightIndex++;
    }

    goToPrevMatch(): void {
        this.actualFightIndex--;
    }

    playActualMatch(firstWinn: boolean): void {
        this.getActualMatch().playMatch(firstWinn);
    }


}