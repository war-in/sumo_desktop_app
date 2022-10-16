export default class PersonalDetails {
    private _id: number;
    private _name: string | null;
    private _surname: string | null;
    private _profilePhoto: string | undefined;
    private _birthdate: string | null;
    private _sex: string | null;

    constructor(id: number, name: string | null, surname: string | null, profilePhoto: string | undefined, birthdate: string | null, sex: string | null) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._profilePhoto = profilePhoto;
        this._birthdate = birthdate;
        this._sex = sex;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string | null {
        return this._name;
    }

    set name(value: string | null) {
        this._name = value;
    }

    get surname(): string | null {
        return this._surname;
    }

    set surname(value: string | null) {
        this._surname = value;
    }

    get profilePhoto(): string | undefined {
        return this._profilePhoto;
    }

    set profilePhoto(value: string | undefined) {
        this._profilePhoto = value;
    }

    get birthdate(): string | null {
        return this._birthdate;
    }

    set birthdate(value: string | null) {
        this._birthdate = value;
    }

    get sex(): string | null {
        return this._sex;
    }

    set sex(value: string | null) {
        this._sex = value;
    }
}