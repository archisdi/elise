import { BaseProps, BasicType } from 'src/typings/common';
import { HttpError } from 'tymon';
import RepoFactory from '../factories/repository';
import Auth from '../utils/auth';
import { BaseModel } from './base/base_model';
import { PostModel, PostProperties } from './post_model';

export interface UserProperties extends BaseProps {
    name: string;
    username: string;
    password: string;
    refresh_token: string;
    token_validity: string;
    clearance: number;

    posts?: PostProperties[];
}

export class UserModel extends BaseModel<UserProperties> {
    protected hidden = ['password', 'deleted_at'];

    public constructor(props: UserProperties) {
        super(props);
    }

    public static modelName = 'User';
    public static collectionName = 'users';
    public static cacheName = 'user';

    public static repo = RepoFactory.getSql<UserModel, UserProperties>(UserModel);

    public static buildFromSql(data: UserProperties): UserModel {
        return new UserModel({
            id: data.id,
            name: data.name,
            username: data.username,
            password: data.password,
            refresh_token: data.refresh_token,
            token_validity: data.token_validity,
            clearance: data.clearance,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            posts: data.posts
        });
    }

    public static buildFromRedis(data: any): UserModel {
        return new UserModel({
            id: data.id,
            name: data.name,
            username: data.username,
            password: data.password,
            refresh_token: data.refresh_token,
            token_validity: data.token_validity,
            clearance: data.clearance,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
            posts: []
        });
    }

    public signJwtToken(password: string): { token: string; lifetime: number } {
        if (!Auth.validatePassword(password, this.password)) {
            throw HttpError.UnauthorizedError('credential not match', 'CREDENTIAL_NOT_MATCH');
        }
        const { token, valid_until } = Auth.generateRefreshToken();
        this.refresh_token = token;
        this.token_validity = valid_until;
        return Auth.generateToken({ user_id: this.id, username: this.username, clearance: this.clearance });
    }

    public get password(): string {
        return this.props.password;
    }

    public set password(value: string) {
        this.props.password = value;
    }

    public get username(): string {
        return this.props.username;
    }
    public set username(value: string) {
        this.props.username = value;
    }

    public get refresh_token(): string {
        return this.props.refresh_token;
    }

    public set refresh_token(value: string) {
        this.props.refresh_token = value;
    }

    public get name(): string {
        return this.props.name;
    }

    public set name(value: string) {
        this.props.name = value;
    }

    public get clearance(): number {
        return this.props.clearance;
    }

    public set clearance(value: number) {
        this.props.clearance = value;
    }

    public get token_validity(): string {
        return this.props.token_validity;
    }

    public set token_validity(value: string) {
        this.props.token_validity = value;
    }

    public get posts(): PostModel[] {
        return this.props.posts?.map((post) => PostModel.buildFromSql(post)) || [];
    }

    public async save({ cache }: { cache: boolean } = { cache: true }): Promise<void> {
        const payload = this.toJson() as Partial<UserModel>;
        await UserModel.repo.upsert({ id: this.id }, payload).then((): any => (cache ? this.cache() : null));
    }

    public async cache(): Promise<void> {
        const redisRepo = RepoFactory.getRedis(UserModel);
        const payload = this.toJson() as Partial<UserModel>;
        await redisRepo.set(this.id, payload, 300);
    }

    public static async findFromCache(id: string): Promise<UserModel | null> {
        const redisRepo = RepoFactory.getRedis(UserModel);
        const user = await redisRepo.get(id);
        return user ? this.buildFromRedis(user) : null;
    }
}

export default UserModel;
