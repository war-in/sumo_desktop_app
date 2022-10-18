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
    actualFightIndexToArrayIndex: Map<number, number>

    constructor(competitors: Competitor[], drawId: number, saveFightsToDatabase: boolean) {
        // this.matches = new Array(12)
        this.matches = new Array(30).fill(new IndividualMatch(null, null, null))
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
        for (let i = 4; i <= 7; i++) {
            this.matches[i] = new IndividualMatch(competitors[actualCompetitor], competitors[actualCompetitor + 1], null)
            actualCompetitor += 2
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Eliminacje", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex
        //pół finały
        for (let i = 2; i < 4; i++) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Pół finały", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex
        //repasarze
        for (let i = 11; i >= 10; i--) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Repasarze", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex

        for (let i = 9; i >= 8; i--) {
            this.matches[i] = new IndividualMatch(null, null, null)
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        this.rounds.push(new Round("Brązy", startFightIndex, fightIndex - 1))
        startFightIndex = fightIndex

        //finał
        this.matches[1] = new IndividualMatch(null, null, null)
        this.actualFightIndexToArrayIndex.set(fightIndex, 1)
        this.rounds.push(new Round("Finał", startFightIndex, fightIndex - 1))
        this.matches[4].actualPlaying = true

        if (saveFightsToDatabase)
            this.saveGeneratedFights(drawId).finally();
    }

    async saveGeneratedFights(drawId: number): Promise<void> {
        for(let i=0; i < this.matches.length; i++) {
            await FightController.saveFight(this.matches[i], drawId, i);
        }
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
            switch (this.actualFightIndex) {
                case 0:
                    this.matches[10].firstCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    break;
                case 1:
                    this.matches[10].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    break;
                case 2:
                    this.matches[11].firstCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                    break;
                case 3:
                    this.matches[11].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
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
            //przepisanie do walki o brąz przegranego
            if (this.actualFightIndex == 4) {
                this.matches[8].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
            } else {
                this.matches[9].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
            }
        }
        // debugger
        if (this.actualFightIndex >= 6 && this.actualFightIndex < 10) {
            // debugger
            switch (this.actualFightIndex) {
                case 6:
                    this.matches[8].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
                case 7:
                    this.matches[9].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    break;
            }
        }

        await FightController.saveFight(this.getActualMatch(), drawId, this.actualFightIndex);

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