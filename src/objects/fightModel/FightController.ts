import IndividualMatch from "./IndividualMatch";
import axios from "axios";

const desktopServerUrl = "http://localhost:8080/"


export default class FightController {
    static async saveFight(individualMatch: IndividualMatch, drawId: number, numberOfPlaceInDraw: number): Promise<void> {
        let winner: number = 0;
        if (individualMatch.winner == null)
            winner = 0;
        else if (individualMatch.winner == individualMatch.firstCompetitor)
            winner = 1;
        else if (individualMatch.winner == individualMatch.secondCompetitor)
            winner = 2;

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
            whoIsWinner: winner,
            numberOfPlaceInDraw: numberOfPlaceInDraw,
        }

        await axios.post(desktopServerUrl + 'fights/save', body)
    }
}