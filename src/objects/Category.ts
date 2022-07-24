export default class Category {
    private _age: string;
    private _sex: string;
    private _weight: string;

    constructor(age: string, sex: string, weight: string) {
        this._age = age;
        this._sex = sex;
        this._weight = weight;
    }

    get age(): string {
        return this._age;
    }

    set age(value: string) {
        this._age = value;
    }

    get sex(): string {
        return this._sex;
    }

    set sex(value: string) {
        this._sex = value;
    }

    get weight(): string {
        return this._weight;
    }

    set weight(value: string) {
        this._weight = value;
    }
}