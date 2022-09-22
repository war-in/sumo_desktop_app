import Competitor from "../Competitor";

export default class Bucket {
    private _competitors: Competitor[];
    private _currentBucketIndex: number;
    private _buckets: Bucket[];
    private _done: boolean;

    constructor(competitors: Competitor[]) {
        this._competitors = competitors;
        this._currentBucketIndex = 0;
        this._buckets = [];
        this._done = false;
    }

    get competitors(): Competitor[] {
        return this._competitors;
    }

    set competitors(value: Competitor[]) {
        this._competitors = value;
    }

    get currentBucketIndex(): number {
        return this._currentBucketIndex;
    }

    set currentBucketIndex(value: number) {
        this._currentBucketIndex = value;
    }

    get buckets(): Bucket[] {
        return this._buckets;
    }

    set buckets(value: Bucket[]) {
        this._buckets = value;
    }

    public addBucket(bucket: Bucket) {
        this._buckets.push(bucket);
    }

    public addCompetitor(competitor: Competitor) {
        this._competitors.push(competitor);
    }

    get done(): boolean {
        return this._done;
    }

    set done(value: boolean) {
        this._done = value;
    }
}