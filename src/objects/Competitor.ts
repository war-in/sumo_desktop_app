import PersonalDetails from "./PersonalDetails";

export default class Competitor {
    private _id: number | null;
    private _personalDetails: PersonalDetails | null;
    private _country: string  | null;
    private _club: string | null;
    private _weight: number | null;
    private _points: number;

    constructor(id: number | null, personalDetails: PersonalDetails | null, country: string | null, club: string | null, weight: number | null) {
        this._id = id;
        this._personalDetails = personalDetails;
        this._country = country;
        this._club = club;
        this._weight = weight;
        this._points = 0
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }

    get personalDetails(): PersonalDetails  | null{
        return this._personalDetails;
    }

    set personalDetails(value: PersonalDetails | null) {
        this._personalDetails = value;
    }

    get country(): string  | null{
        return this._country;
    }

    set country(value: string | null) {
        this._country = value;
    }

    get club(): string  | null{
        return this._club;
    }

    set club(value: string | null) {
        this._club = value;
    }

    get weight(): number | null {
        return this._weight;
    }

    set weight(value: number | null) {
        this._weight = value;
    }

    get points(): number {
        return this._points;
    }

    set points(value: number) {
        this._points = value;
    }
}