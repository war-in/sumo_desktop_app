import PersonalDetails from "./PersonalDetails";
import Club from "./Club";

export default class Competitor {
    private _personalDetails: PersonalDetails;
    private _actualClub: Club;
    private _id: BigInteger;

    constructor(personalDetails: PersonalDetails, actualClub: Club, id: BigInteger) {
        this._personalDetails = personalDetails;
        this._actualClub = actualClub;
        this._id = id;
    }

    get id(): BigInteger {
        return this._id;
    }

    set id(value: BigInteger) {
        this._id = value;
    }

    get personalDetails(): PersonalDetails {
        return this._personalDetails;
    }

    set personalDetails(value: PersonalDetails) {
        this._personalDetails = value;
    }

    get actualClub(): Club {
        return this._actualClub;
    }

    set actualClub(value: Club) {
        this._actualClub = value;
    }
}