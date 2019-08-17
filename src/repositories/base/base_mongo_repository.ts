import BaseRepository from './base_repository';
import { IContext, IMeta, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = IContext | null;

export default class MongoRepo extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }
}
