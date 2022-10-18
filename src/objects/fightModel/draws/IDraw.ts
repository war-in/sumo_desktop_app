import IndividualMatch from "../IndividualMatch";
import {Round} from "../Round";
import Competitor from "../../Competitor";

export interface IDraw {

    actualFightIndex:number
    matches:IndividualMatch[]
    rounds:Round[]
    competitors:Competitor[]

    // in this place we will add team match when it will be ready
    getActualMatch():IndividualMatch
    getNextMatch():IndividualMatch
    getActualRound():Round
    playActualMatch(firstWinn:boolean, drawId: number): Promise<void>
    goToNextMatch():void
    goToPrevMatch():void
    goToMatch(matchNumber:number):void
    saveGeneratedFights(drawId: number): Promise<void>
}