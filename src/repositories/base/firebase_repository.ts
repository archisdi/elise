import BaseRepository from './base_repository';
import { IContext, IMeta, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = IContext | null;

export default class FirebaseRepo<Model, ModelFillable> extends BaseRepository {
    protected ref: string;

    public constructor(ref: string, context?: Context) {
        super(context);
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

    public async create(id: string, data: ModelFillable): Promise<Model> {
        const fb = await this.getFirebaseInstance();
        const db = await fb.database();
        return db.ref(`${this.ref}${id}`).set(data);
    }

    public async update(id: string, data: ModelFillable): Promise<Model> {
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
