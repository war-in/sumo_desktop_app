export default class Competition {

    private _name: string | null;
    private _city: string | null;
    private _type: string | null;
    private _startDate: string | null;
    private _id: number | null;


    constructor(name: string | null, city: string | null, type: string | null, startDate: string | null, id: number | null) {

        this._name = name;
        this._city = city;
        this._type = type;
        this._startDate = startDate;
        this._id = id;
    }

    get city(): string | null {
        return this._city;
    }

    set city(value: string | null) {
        this._city = value;
    }

    get type(): string | null {
        return this._type;
    }

    set type(value: string | null) {
        this._type = value;
    }

    get startDate(): string | null {
        return this._startDate;
    }

    set startDate(value: string | null) {
        this._startDate = value;
    }

    get name(): string | null {
        return this._name;
    }

    set name(value: string | null) {
        this._name = value;
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }
}

