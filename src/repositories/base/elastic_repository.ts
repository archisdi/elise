import BaseRepository from './base_repository';
import { IContext } from '../../typings/common';

type Context = IContext | null;

export default class ElasticRepo<Model = any> extends BaseRepository {
    protected index: string;

    public constructor(index: string) {
        super();
        this.index = index;
    }
}
