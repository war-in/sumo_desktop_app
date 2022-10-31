export class Round {
    private _roundName: string
    private _firstFightIndex: number
    private _lastFightIndex: number

    constructor(roundName: string, firstFightIndex: number, lastFightIndex: number) {
        this._roundName = roundName;
        this._firstFightIndex = firstFightIndex;
        this._lastFightIndex = lastFightIndex;
    }

    get roundName(): string {
        return this._roundName;
    }

    set roundName(value: string) {
        this._roundName = value;
    }

    get firstFightIndex(): number {
        return this._firstFightIndex;
    }

    set firstFightIndex(value: number) {
        this._firstFightIndex = value;
    }

    get lastFightIndex(): number {
        return this._lastFightIndex;
    }

    set lastFightIndex(value: number) {
        this._lastFightIndex = value;
    }
}