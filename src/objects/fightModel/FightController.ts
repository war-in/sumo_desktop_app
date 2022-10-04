import IndividualMatch from "./IndividualMatch";
import axios from "axios";

const desktopServerUrl = "http://localhost:8080/"


export default class FightController {
    static async saveFight(individualMatch: IndividualMatch, drawId: number, numberOfPlaceInDraw: number): Promise<boolean> {
        const body = {
            draw: drawId,
            firstCompetitor: individualMatch.firstCompetitor,
            secondCompetitor: individualMatch.secondCompetitor,
            winner: individualMatch.winner,
            numberOfPlaceInDraw: numberOfPlaceInDraw,
        }

        await axios.post(desktopServerUrl + '/save', body)
            .then(
            )
        return true;
    }
}