import BaseRepository from './base_repository';
import { IContext, IPagination, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = IContext | null;

export default class MongoRepo<Model> extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }
}
