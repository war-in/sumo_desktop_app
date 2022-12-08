import Competitor from "../Competitor";
import FightFromDatabase from "./FightFromDatabase";

export default class CompetitorsAndFightsInDraw {
    private _competitors: Competitor[];
    private _fights: FightFromDatabase[];

    constructor(competitors: Competitor[], fights: FightFromDatabase[]) {
        this._competitors = competitors;
        this._fights = fights;
    }

    get competitors(): Competitor[] {
        return this._competitors;
    }

    set competitors(value: Competitor[]) {
        this._competitors = value;
    }

    get fights(): FightFromDatabase[] {
        return this._fights;
    }

    set fights(value: FightFromDatabase[]) {
        this._fights = value;
    }
}