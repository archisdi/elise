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
}
