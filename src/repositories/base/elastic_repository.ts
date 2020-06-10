export default class ElasticsearchRepo {
    protected index: string;

    public constructor(index: string) {
        this.index = index;
    }
}
