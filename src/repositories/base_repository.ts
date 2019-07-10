// import * as Firebase from '../lib/firebase';
import { Firebase } from 'tymon';

export default class BaseRepository {
    public context: any;
    public firestore: any;
    public realtimedb: any;

    constructor(context: any = null) {
        this.context = context;
        this.firestore = null;
        this.realtimedb = null;
    }

    public async getFirestoreInstance() {
        if (!this.firestore) {
            const firebase: any = await Firebase.getInstance();
            this.firestore = await firebase.firestore();
        }
        return this.firestore;
    }

    public async getRealtimeDbInstance() {
        if (!this.realtimedb) {
            const firebase: any = await Firebase.getInstance();
            this.realtimedb = await firebase.database();
        }
        return this.realtimedb;
    }
}
