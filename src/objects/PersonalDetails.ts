export default class PersonalDetails {
    private _names: string;
    private _surname: string;
    private _phoneNumber: string;
    private _emailAdress: string;
    private _profilePhoto: string;
    private _birthDate: string;
    private _gender: string;
    private _id:BigInteger;

    constructor(names: string, surname: string, phoneNumber: string, emailAdress: string, profilePhoto: string, birthDate: string, gender: string,id:BigInteger) {
        this._id = id;
        this._names = names;
        this._surname = surname;
        this._phoneNumber = phoneNumber;
        this._emailAdress = emailAdress;
        this._profilePhoto = profilePhoto;
        this._birthDate = birthDate;
        this._gender = gender;
    }

    get id(): BigInteger {
        return this._id;
    }

    set id(value: BigInteger) {
        this._id = value;
    }

    get names(): string {
        return this._names;
    }

    set names(value: string) {
        this._names = value;
    }

    get surname(): string {
        return this._surname;
    }

    set surname(value: string) {
        this._surname = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get emailAdress(): string {
        return this._emailAdress;
    }

    set emailAdress(value: string) {
        this._emailAdress = value;
    }

    get profilePhoto(): string {
        return this._profilePhoto;
    }

    set profilePhoto(value: string) {
        this._profilePhoto = value;
    }

    get birthDate(): string {
        return this._birthDate;
    }

    set birthDate(value: string) {
        this._birthDate = value;
    }

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }
}