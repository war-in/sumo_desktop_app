export default class PersonalDetails {
    private _id: number;
    private _name: string;
    private _surname: string;
    private _phoneNumber: string | null;
    private _linkToProfilePicture: string | null;
    private _birthDate: [number, number, number] | null;
    private _sex: {
        sex: string | null
    } ;

    constructor(id: number, name: string, surname: string, phoneNumber: string | null, profilePhoto: string | null, birthdate: [number, number, number] | null, sex: string | null) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._phoneNumber = phoneNumber;
        this._linkToProfilePicture = profilePhoto;
        this._birthDate = birthdate;
        this._sex = { sex: sex }
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
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

    get phoneNumber(): string | null {
        return this._phoneNumber;
    }

    set phoneNumber(value: string | null) {
        this._phoneNumber = value;
    }

    get profilePhoto(): string | null {
        return this._linkToProfilePicture;
    }

    set profilePhoto(value: string | null) {
        this._linkToProfilePicture = value;
    }

    get birthdate(): [number, number, number] | null {
        return this._birthDate;
    }

    set birthdate(value: [number, number, number] | null) {
        this._birthDate = value;
    }

    get sex(): string | null {
        return this._sex.sex;
    }

    set sex(value: string | null) {
        this._sex.sex = value;
    }
}