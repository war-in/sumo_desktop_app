import PersonalDetails from "./PersonalDetails";

export default class Competitor {
    private _id: number;
    private _personalDetails: PersonalDetails;
    private _country: string;
    private _club: string;
    private _weight: number | null;
    private _points: number;

    constructor(id: number, personalDetails: PersonalDetails, country: string, club: string, weight: number | null) {
        this._id = id;
        this._personalDetails = personalDetails;
        this._country = country;
        this._club = club;
        this._weight = weight;
        this._points = 0
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get personalDetails(): PersonalDetails {
        return this._personalDetails;
    }

    set personalDetails(value: PersonalDetails) {
        this._personalDetails = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get club(): string {
        return this._club;
    }

    set club(value: string) {
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