import Competitor from "../Competitor";

export default class IndividualMatch{
    private _firstCompetitor:Competitor|null
    private _secondCompetitor:Competitor|null
    private _winner:Competitor|null


    constructor(firstCompetitor: Competitor|null, secondCompetitor: Competitor|null, winner: Competitor|null) {
        this._firstCompetitor = firstCompetitor;
        this._secondCompetitor = secondCompetitor;
        this._winner = winner;
    }


    get firstCompetitor(): Competitor|null {
        return this._firstCompetitor;
    }

    set firstCompetitor(value: Competitor|null) {
        this._firstCompetitor = value;
    }

    get secondCompetitor(): Competitor|null {
        return this._secondCompetitor;
    }

    set secondCompetitor(value: Competitor|null) {
        this._secondCompetitor = value;
    }

    get winner(): Competitor|null {
        return this._winner;
    }

    set winner(value: Competitor|null) {
        this._winner = value;
    }

    isFirstCompetitorWinner(){
        return this._firstCompetitor === this._winner
    }

    playMatch(isFirstWinner:boolean){
        this._winner = isFirstWinner? this._firstCompetitor : this._secondCompetitor;
    }
}