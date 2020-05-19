import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

interface IObjectString {
    [s: string]: string;
}

const repoDirPath = './';
let paths: IObjectString;

const normalizeRepoName = (name: string): string => {
    const splitted = name.split('_').slice(0, -1);
    return _.camelCase(splitted.join('_'));
};

const generateRepoPath = (): IObjectString => {
    if (!paths) {
        paths = fs.readdirSync(path.join(__dirname, repoDirPath)).reduce((acc: IObjectString, item): object => {
            const normal: string = normalizeRepoName(item);
            if (normal) acc[normal] = `${repoDirPath}${item}`;
            return acc;
        }, {});
    }
    return paths;
};
class RepoFactory {
    private context: any;
    private instance: { [s: string]: any };
    private repoPath: IObjectString;

    public constructor(context = {}) {
        this.context = context;
        this.instance = {};
        this.repoPath = generateRepoPath();
    }

    public get(repoName: string): any {
        if (!this.instance[repoName]) {
            const { default: Repo }: any = require(this.repoPath[repoName]); // eslint-disable-line
            this.instance[repoName] = new Repo(this.context);
        }
        return this.instance[repoName];
    }
}

export default RepoFactory;
