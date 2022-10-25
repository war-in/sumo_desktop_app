import Competitor from "../Competitor";

export default class FightFromDatabase {
    private _firstCompetitor: Competitor;
    private _secondCompetitor: Competitor;
    private _whoIsWinner: number;
    private _numberOfPlaceInDraw: number;

    constructor(firstCompetitor: Competitor, secondCompetitor: Competitor, whoIsWinner: number, numberOfPlaceInDraw: number) {
        this._firstCompetitor = firstCompetitor;
        this._secondCompetitor = secondCompetitor;
        this._whoIsWinner = whoIsWinner;
        this._numberOfPlaceInDraw = numberOfPlaceInDraw;
    }

    get firstCompetitor(): Competitor {
        return this._firstCompetitor;
    }

    set firstCompetitor(value: Competitor) {
        this._firstCompetitor = value;
    }

    get secondCompetitor(): Competitor {
        return this._secondCompetitor;
    }

    set secondCompetitor(value: Competitor) {
        this._secondCompetitor = value;
    }

    get whoIsWinner(): number {
        return this._whoIsWinner;
    }

    set whoIsWinner(value: number) {
        this._whoIsWinner = value;
    }

    get numberOfPlaceInDraw(): number {
        return this._numberOfPlaceInDraw;
    }

    set numberOfPlaceInDraw(value: number) {
        this._numberOfPlaceInDraw = value;
    }
}