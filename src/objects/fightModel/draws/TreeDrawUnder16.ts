import {IDraw} from "./IDraw";
import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";
import FightController from "../FightController";

export default class TreeDrawUnder16 implements IDraw {
    actualFightIndex: number;
    matches: IndividualMatch[];
    rounds: Round[];
    competitors: Competitor[]
    actualFightIndexToArrayIndex: Map<number, number>

    constructor(competitors: Competitor[], matches: IndividualMatch[], drawId: number, saveFightsToDatabase: boolean) {
        this.competitors = competitors

        this.actualFightIndexToArrayIndex = new Map<number, number>()
        this.initializeActualFightIndexMap()

        if (matches.length != 0) {
            this.matches = matches.concat(
                new Array(24 - matches.length).fill(new IndividualMatch(null, null, null)))
        } else {
            this.matches = new Array(24).fill(new IndividualMatch(null, null, null))

            let actualCompetitor = 0;
            for (let i = 8; i <= 15; i++) {
                this.matches[i] = new IndividualMatch(competitors[actualCompetitor], competitors[actualCompetitor + 1], null)
                actualCompetitor += 2
            }

            for (let i = 1; i <= 7; i++)
                this.matches[i] = new IndividualMatch(null, null, null)

            for (let i = 16; i <= 23; i++)
                this.matches[i] = new IndividualMatch(null, null, null)

            if (saveFightsToDatabase)
                this.saveGeneratedFights(drawId).finally();
        }

        this.rounds = []
        this.rounds.push(new Round("Eliminacje", 1, 8));
        this.rounds.push(new Round("Ćwierć finały", 9, 12));
        this.rounds.push(new Round("Pół finały", 13, 14));
        this.rounds.push(new Round("Repasarze I runda", 15, 18));
        this.rounds.push(new Round("Repasarze II runda", 19, 20));
        this.rounds.push(new Round("Brązy", 21, 22));
        this.rounds.push(new Round("Finał", 23, 23));

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
        for (let i = 8; i <= 15; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 4; i <= 7; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 2; i <= 3; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 20; i <= 23; i++) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 19; i >= 18; i--) {
            this.actualFightIndexToArrayIndex.set(fightIndex, i)
            fightIndex++
        }
        for (let i = 17; i >= 16; i--) {
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
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true

    }

    goToPrevMatch(): void {
        if (this.actualFightIndex == 0) return;

        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length);
        this.getActualMatch().actualPlaying = true
    }

    async playActualMatch(firstWinn: boolean, drawId: number): Promise<void> {
        this.getActualMatch().playMatch(firstWinn);
        //przepisanie wygranego z eliminacji do ćwierć finałów
        if (this.actualFightIndex < 8) {
            let index = this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number
            let parentIndex = Math.floor(index / 2)
            if (this.actualFightIndex % 2 == 0)
                this.matches[parentIndex].firstCompetitor = this.getActualMatch().winner
            else
                this.matches[parentIndex].secondCompetitor = this.getActualMatch().winner

            await FightController.saveFight(this.matches[parentIndex], drawId, parentIndex)
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
            await FightController.saveFight(this.matches[parentIndex], drawId, parentIndex)
            switch (this.actualFightIndex) {
                case 8:
                    this.matches[20].secondCompetitor = this.getActualMatch().looser
                    this.matches[20].firstCompetitor = firstWinn ? this.matches[8].looser : this.matches[9].looser
                    await FightController.saveFight(this.matches[20], drawId, 20)
                    break;
                case 9:
                    this.matches[21].secondCompetitor = this.getActualMatch().looser
                    this.matches[21].firstCompetitor = firstWinn ? this.matches[10].looser : this.matches[11].looser
                    await FightController.saveFight(this.matches[21], drawId, 21)
                    break;
                case 10:
                    this.matches[22].secondCompetitor = this.getActualMatch().looser
                    this.matches[22].firstCompetitor = firstWinn ? this.matches[12].looser : this.matches[13].looser
                    await FightController.saveFight(this.matches[22], drawId, 22)
                    break;
                case 11:
                    this.matches[23].secondCompetitor = this.getActualMatch().looser
                    this.matches[23].firstCompetitor = firstWinn ? this.matches[14].looser : this.matches[15].looser
                    await FightController.saveFight(this.matches[23], drawId, 23)
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
            await FightController.saveFight(this.matches[parentIndex], drawId, parentIndex)
            //przepisanie do walki o brąz przegranego
            if (this.actualFightIndex == 12) {
                this.matches[16].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                await FightController.saveFight(this.matches[16], drawId, 16)
            } else {
                this.matches[17].secondCompetitor = firstWinn ? this.getActualMatch().secondCompetitor : this.getActualMatch().firstCompetitor
                await FightController.saveFight(this.matches[17], drawId, 17)
            }
        }

        // repasarze
        if (this.actualFightIndex >= 14 && this.actualFightIndex < 20) {
            switch (this.actualFightIndex) {
                case 14:
                    this.matches[18].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[18], drawId, 18)
                    break;
                case 15:
                    this.matches[18].secondCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[18], drawId, 18)
                    break;
                case 16:
                    this.matches[19].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[19], drawId, 19)
                    break;
                case 17:
                    this.matches[19].secondCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[19], drawId, 19)
                    break;
                case 18:
                    this.matches[16].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[16], drawId, 16)
                    break;
                case 19:
                    this.matches[17].firstCompetitor = firstWinn ? this.getActualMatch().firstCompetitor : this.getActualMatch().secondCompetitor
                    await FightController.saveFight(this.matches[17], drawId, 17)
                    break;
            }
        }

        await FightController.saveFight(this.getActualMatch(), drawId, this.actualFightIndexToArrayIndex.get(this.actualFightIndex) as number);

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