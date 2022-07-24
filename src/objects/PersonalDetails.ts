export default class PersonalDetails {
    private _id: number | null;
    private _name: string;
    private _surname: string;
    private _profilePhoto: string;
    private _birthdate: string;
    private _sex: string;

    constructor(id: number | null, name: string, surname: string, profilePhoto: string, birthdate: string, sex: string) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._profilePhoto = profilePhoto;
        this._birthdate = birthdate;
        this._sex = sex;
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get profilePhoto(): string {
        return this._profilePhoto;
    }

    set profilePhoto(value: string) {
        this._profilePhoto = value;
    }

    get birthdate(): string {
        return this._birthdate;
    }

    set birthdate(value: string) {
        this._birthdate = value;
    }

    get sex(): string {
        return this._sex;
    }

    set sex(value: string) {
        this._sex = value;
    }
}