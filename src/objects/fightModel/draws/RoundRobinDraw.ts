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
    carusele:Competitor[]

    constructor(competitors: Competitor[]) {
        let personal = new PersonalDetails(null, "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los", "Wolny Los")
        let competitor = new Competitor(null, personal, "Wolny Los", "Wolny Los", new Category("Wolny Los", "Wolny Los", "Wolny Los"), 0)
        this.actualFightIndex = 0
        this.competitors = competitors;
        this.rounds = []
        this.carusele = competitors.slice()
        this.carusele = this.carusele.length % 2 == 0 ? this.carusele : this.carusele.concat([competitor])
        let numberOfMatches = (this.carusele.length * (this.carusele.length - 1) / 2)
        this.matches = []
        let startConnected = 0;
        let lastConnected = this.carusele.length - 1
        let actualFightIndex = 0
        let roundIndex = 1
        console.log("karuzela")
        console.log(this.carusele)

        this.rounds.push(new Round("Runda " + roundIndex, 0, undefined))
        for (let i = 0; i < numberOfMatches; i++) {
            if (lastConnected <= startConnected) {
                roundIndex++
                this.rounds[this.rounds.length - 1].lastFightIndex = i - 1
                this.rounds.push(new Round("Rouna" + roundIndex, i, undefined))
                console.log("karuzela przed obracaniem")
                console.log(this.carusele)
                startConnected = 0;
                lastConnected = this.carusele.length - 1
                if ((competitors.length % 2) == 0) {
                    let last = this.carusele.slice(this.carusele.length - 1, this.carusele.length)
                    let rest = this.carusele.slice(0, this.carusele.length - 1)
                    this.carusele = last.concat(rest)
                    console.log("po obróceniu")
                    console.log(this.carusele)
                } else {
                    let first = this.carusele.slice(this.carusele.length - 2, this.carusele.length - 1)
                    let middle = this.carusele.slice(0, length - 2)
                    let last = this.carusele.slice(this.carusele.length - 1, this.carusele.length)
                    this.carusele = first.concat(middle).concat(last)
                    console.log("po obróceniu")
                    console.log(this.carusele)
                }
            }
            this.matches.push(new IndividualMatch(this.carusele[startConnected], this.carusele[lastConnected], null))
            startConnected++;
            lastConnected--;
        }
        this.rounds[this.rounds.length - 1].lastFightIndex = numberOfMatches - 1
        console.log("mecze")
        console.log(this.matches)
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
        this.actualFightIndex = (this.actualFightIndex + 1) % (this.matches.length - 1);
        this.getActualMatch().actualPlaying = true

    }

    goToPrevMatch(): void {
        this.getActualMatch().actualPlaying = false
        this.actualFightIndex = (this.actualFightIndex - 1) % (this.matches.length - 1);
        this.getActualMatch().actualPlaying = true
    }

    playActualMatch(firstWinn: boolean): void {
        try{
            if(firstWinn){
                this.getActualMatch().firstCompetitor.points ++
            }else{
                this.getActualMatch().secondCompetitor.points ++
            }
        }catch (e){
            console.log(e)
        }

        this.getActualMatch().playMatch(firstWinn);

        this.actualFightIndex++
    }

    getActualRound(): Round {
        return this.rounds[0]
    }


}