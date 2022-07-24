import PersonalDetails from "./PersonalDetails";
import Category from "./Category";

export default class Competitor {
    private _id: number;
    private _personalDetails: PersonalDetails;
    private _category: Category;
    private _weight: number | null;

    constructor(id: number, personalDetails: PersonalDetails, category: Category, weight: number | null) {
        this._id = id;
        this._personalDetails = personalDetails;
        this._category = category;
        this._weight = weight;
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
}