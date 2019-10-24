import BaseRepository from './base_repository';
import { IContext, IPagination, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type Context = IContext | null;

export default class ElasticRepo<Model> extends BaseRepository {
    protected index: string;

    public constructor(index: string, context?: Context) {
        super(context);
        this.index = index;
    }
}
