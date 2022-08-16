import PersonalDetails from "./PersonalDetails";
import Category from "./Category";

export default class Competitor {
    private _id: number | null;
    private _personalDetails: PersonalDetails;
    private _country: string;
    private _club: string;
    private _category: Category;
    private _weight: number | null;
    private _points: number = 0;

    constructor(id: number | null, personalDetails: PersonalDetails, country: string, club: string, category: Category, weight: number | null) {
        this._id = id;
        this._personalDetails = personalDetails;
        this._country = country;
        this._club = club;
        this._category = category;
        this._weight = weight;
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
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

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
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