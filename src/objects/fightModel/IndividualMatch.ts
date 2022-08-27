import Competitor from "../Competitor";

export default class IndividualMatch {
    private _firstCompetitor: Competitor | null
    private _secondCompetitor: Competitor | null
    private _winner: Competitor | null
    private _losser: Competitor | null
    private _actualPlaying: boolean


    constructor(firstCompetitor: Competitor | null, secondCompetitor: Competitor | null, winner: Competitor | null) {
        this._firstCompetitor = firstCompetitor;
        this._secondCompetitor = secondCompetitor;
        this._winner = winner;
        this._losser = null
        this._actualPlaying = false
    }


    get firstCompetitor(): Competitor | null {
        return this._firstCompetitor;
    }

    set firstCompetitor(value: Competitor | null) {
        this._firstCompetitor = value;
        console.log("setuje pierwszego")
        console.log(value)

    }

    get secondCompetitor(): Competitor | null {
        return this._secondCompetitor;
    }

    set secondCompetitor(value: Competitor | null) {
        this._secondCompetitor = value;
    }

    get winner(): Competitor | null {
        return this._winner;
    }

    set winner(value: Competitor | null) {
        this._winner = value;
    }

    isFirstCompetitorWinner() {
        return this._firstCompetitor === this._winner
    }

    playMatch(isFirstWinner: boolean) {
        this._winner = isFirstWinner ? this._firstCompetitor : this._secondCompetitor;
        this._losser = isFirstWinner ? this._secondCompetitor : this._firstCompetitor;
    }


    get actualPlaying(): boolean {
        return this._actualPlaying;
    }

    set actualPlaying(value: boolean) {
        this._actualPlaying = value;
    }

    get losser(): Competitor | null {
        return this._losser;
    }

    set losser(value: Competitor | null) {
        this._losser = value;
    }
}