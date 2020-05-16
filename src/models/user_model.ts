import { GeneralModelInterface, SqlModel } from './base/base_model';
import jwt, { validatePassword } from '../libs/jwt';
import { HttpError } from 'tymon';
import RepoService from '../utils/factory/repository';
import { BasicType, OptionalRelation } from 'src/typings/common';
import { PostModel } from './post_model';

export class UserModel extends SqlModel<UserModel> {
    private _id: string;
    private _name: string;
    private _username: string;
    private _password: string;
    private _refresh_token: string;
    private _token_validity: string;
    private _created_at: string;
    private _updated_at: string;
    private _deleted_at: string;
    private _posts: PostModel[];

    protected hidden = ['password', 'deleted_at'];

    public constructor(
        id: string,
        name: string,
        username: string,
        password: string,
        refreshToken: string,
        tokenValidity: string,
        createdAt: string,
        updatedAt: string,
        deletedAt: string,
        posts: OptionalRelation
    ) {
        super(UserModel);
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._refresh_token = refreshToken;
        this._token_validity = tokenValidity;
        this._created_at = createdAt;
        this._updated_at = updatedAt;
        this._deleted_at = deletedAt;
        this._posts = posts ? posts.map((item): PostModel => PostModel.buildFromSql(item)) : [];
    }

    public static modelName = 'User';

    public static collectionName = 'users';

    public static buildFromSql(data: any): UserModel {
        return new UserModel(
            data.id,
            data.name,
            data.username,
            data.password,
            data.refresh_token,
            data.token_validity,
            data.created_at,
            data.updated_at,
            data.deleted_at,
            data.posts
        );
    }

    public signJwtToken(password: string): string {
        if (!validatePassword(password, this.password)) {
            throw HttpError.UnauthorizedError('credential not match', 'CREDENTIAL_NOT_MATCH');
        }
        const { token, valid_until } = jwt.generateRefreshToken();
        this.refresh_token = token;
        this.token_validity = valid_until;
        return jwt.generateToken({ user_id: this.id, username: this.username });
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get refresh_token(): string {
        return this._refresh_token;
    }

    public set refresh_token(value: string) {
        this._refresh_token = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get token_validity(): string {
        return this._token_validity;
    }

    public set token_validity(value: string) {
        this._token_validity = value;
    }

    public get created_at(): string {
        return this._created_at;
    }

    public set created_at(value: string) {
        this._created_at = value;
    }

    public get updated_at(): string {
        return this._updated_at;
    }

    public set updated_at(value: string) {
        this._updated_at = value;
    }

    public get deleted_at(): string {
        return this._deleted_at;
    }

    public set deleted_at(value: string) {
        this._deleted_at = value;
    }

    public get posts(): PostModel[] {
        return this._posts;
    }

    public toJson(isProtected: boolean = true, withTimestamp: boolean = true): Partial<UserModel> {
        const data: { [x: string]: any } = {
            id: this._id,
            name: this._name,
            username: this._username,
            password: this._password,
            refresh_token: this._refresh_token,
            token_validity: this._token_validity,
            created_at: this._created_at,
            updated_at: this._updated_at,
            deleted_at: this._deleted_at
        };
        if (isProtected) this.removeHidden(data);
        if (!withTimestamp) this.removeTimestamps(data);
        return data;
    }

    public async save(): Promise<void> {
        await this.repo.upsert({ id: this.id }, this.toJson(false, false));
    }

    public async cache(): Promise<void> {
        const redisRepo = RepoService.getRedis<UserModel>('user');
        const payload = this.toJson() as Partial<UserModel>;
        await redisRepo.set(this.id, payload, 300);
    }
}
