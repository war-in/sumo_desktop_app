import City from "./City";

export default class Club {
    private _name: string;
    private _city: City;
    private _id: BigInteger;

    constructor(name: string, city: City, id: BigInteger) {
        this._name = name;
        this._city = city;
        this._id = id;
    }

    get id(): BigInteger {
        return this._id;
    }

    set id(value: BigInteger) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get city(): City {
        return this._city;
    }

    set city(value: City) {
        this._city = value;
    }
}