import BaseRepository from './base_repository';

export default class ElasticRepo<Model = any> extends BaseRepository {
    protected index: string;

    public constructor(index: string) {
        super();
        this.index = index;
    }
}
