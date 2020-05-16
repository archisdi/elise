import BaseRepository from './base_repository';
import { IContext } from '../../typings/common';

export default class FirebaseRepo<Model> extends BaseRepository {
    protected ref: string;

    public constructor(ref: string) {
        super();
        this.ref = ref;
    }

    public async find(id: string): Promise<Model | undefined> {
        const fb = await this.getFirebaseInstance();
        const db = await fb.database();
        return db
            .ref(`${this.ref}/${id}`)
            .once('value')
            .then((res: any): Model => res.val());
    }

    public async create(id: string, data: Partial<Model>): Promise<void> {
        const fb = await this.getFirebaseInstance();
        const db = await fb.database();
        return db.ref(`${this.ref}${id}`).set(data);
    }

    public async update(id: string, data: Partial<Model>): Promise<void> {
        const fb = await this.getFirebaseInstance();
        const db = await fb.database();
        return db.ref(`${this.ref}/${id}`).update(data);
    }

    public async remove(id: string): Promise<void> {
        const fb = await this.getFirebaseInstance();
        const db = await fb.database();
        return db.ref(`${this.ref}/${id}`).remove();
    }
}
