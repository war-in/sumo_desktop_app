import Country from "./Country";

export default class City {
    private _id: BigInteger;
    private _name: string;
    private _country: Country;

    constructor(name: string, country: Country,id:BigInteger) {
        this._id=id;
        this._name = name;
        this._country = country;
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

    get country(): Country {
        return this._country;
    }

    set country(value: Country) {
        this._country = value;
    }
}