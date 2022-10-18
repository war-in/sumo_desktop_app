import IndividualMatch from "./IndividualMatch";
import axios from "axios";

const desktopServerUrl = "http://localhost:8080/"


export default class FightController {
    static async saveFight(individualMatch: IndividualMatch, drawId: number, numberOfPlaceInDraw: number): Promise<void> {
        console.log(individualMatch.firstCompetitor)
        const body = {
            draw: {
                id: drawId
            },
            firstCompetitor: {
                id: individualMatch.firstCompetitor?.id,
            },
            secondCompetitor: {
                id: individualMatch.secondCompetitor?.id
            },
            winner: individualMatch.winner == individualMatch.firstCompetitor,
            numberOfPlaceInDraw: numberOfPlaceInDraw,
        }

        await axios.post(desktopServerUrl + 'fights/save', body)
    }
}