import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";

export default class TreeDrawUnder16 implements IDraw {
    actualFightIndex: number;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[]
    actualFightIndexToArrayIndex: Map<number, number>

    constructor(competitors: Competitor[]) {
        this.matches = new Array(24).fill(new IndividualMatch())
        this.competitors = competitors
        let actualCompetitor = 0;
        this.actualFightIndex = 0
        this.rounds = []
        // key actualFightindex value: place in match array
        this.actualFightIndexToArrayIndex = new Map<number, number>()
        let fightIndex = 0
        let startFightIndex
        //eliminacje
        startFightIndex = fightIndex
        for (let i = 8; i <= 11; i++) {
            this.matches[i] = new IndividualMatch(competitors[actualCompetitor], competitors[actualCompetitor + 1], null)
            actualCompetitor += 2
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Eliminacje I", startFightIndex, fightIndex - 1))
        for (let i = 12; i <= 15; i++) {
            this.matches[i] = new IndividualMatch(competitors[actualCompetitor], competitors[actualCompetitor + 1], null)
            actualCompetitor += 2
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Eliminacje II", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex
        // 1/4 finału
        for (let i = 4; i <= 7; i++) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Ćwierć finały", startFightIndex, fightIndex - 1))
        //pół finały
        for (let i = 2; i <= 3; i++) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Pół finały", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex

        //repasarze I
        for (let i = 20; i <= 23; i++) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Repasarze I runda", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex

        //repasarze II runda i brąz
        for (let i = 19; i >= 16; i--) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Repasarze II i brązy", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex
        //finał
        this.matches[1] = new IndividualMatch(null, null, null)
        this.actualFightIndexToArrayIndex.set(fightIndex, 1)
        this.rounds.push(new Round("Finał", startFightIndex, startFightIndex))
        this.matches[8].actualPlaying = true
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
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true

    }

    goToPrevMatch(): void {
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true
    }

    playActualMatch(firstWinn: boolean): void {
        debugger
        console.log("po rozegraniu meczuuu")
        console.log(this.actualFightIndex)
        console.log(this)
        this.getActualMatch().playMatch(firstWinn);
        //przepisanie wygranego z eliminacji do ćwierć finałów
        if (this.actualFightIndex < 8) {
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner
        }

        //przepisanie wygranego z ćwierć finałów do pół finałów
        //przepisanie zawodników do repasarzy
        if (this.actualFightIndex >= 8 && this.actualFightIndex < 12) {
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner
            switch (this.actualFightIndex) {
                case 8:
                    debugger
                    this.matches[20].secondCompetitor = this.getActualMatch().looser
                    this.matches[20].firstCompetitor = firstWinn ? this.matches[8].looser : this.matches[9].looser
                    break;
                case 9:
                    this.matches[21].secondCompetitor = this.getActualMatch().looser
                    this.matches[21].firstCompetitor = firstWinn ? this.matches[10].looser : this.matches[11].looser
                    break;
                case 10:
                    this.matches[22].secondCompetitor = this.getActualMatch().looser
                    this.matches[22].firstCompetitor = firstWinn ? this.matches[12].looser : this.matches[13].looser
                    break;
                case 11:
                    this.matches[23].secondCompetitor = this.getActualMatch().looser
                    this.matches[23].firstCompetitor = firstWinn ? this.matches[14].looser : this.matches[15].looser
                    break;
            }
        }

        //przepisanie wygranego z pół finałów do finałów a przegranych do walk o brąz
        if (this.actualFightIndex >= 12 && this.actualFightIndex < 14) {
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner
            //przepisanie do walki o brąz przegranego
            if (this.actualFightIndex == 12) {
                this.matches[16].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
            } else {
                this.matches[17].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
            }
        }

        // repasarze
        if (this.actualFightIndex >= 14 && this.actualFightIndex < 20) {
            debugger
            switch (this.actualFightIndex) {
                case 14:
                    this.matches[18].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 15:
                    this.matches[18].secondCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 16:
                    this.matches[19].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 17:
                    this.matches[19].secondCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 18:
                    this.matches[16].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 19:
                    this.matches[17].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
            }
        }
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex++
        if (this.getActualMatch()) {
            this.getActualMatch().actualPlaying = true
        }
    }

    getActualRound(): Round {
        return this.rounds[0];
    }

}