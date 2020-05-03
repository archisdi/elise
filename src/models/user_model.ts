import { BaseSqlModelInterface, BaseModelInterface, BaseMongoModelInterface, BaseModel } from './base/base_model';
import jwt, { validatePassword } from '../libs/jwt';
import { HttpError } from 'tymon';

export interface UserDefinition {
    id: string;
    name: string;
    username: string;
    password: string;
    refresh_token: string;
    token_validity: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export class UserModel extends BaseModel implements BaseModelInterface<UserDefinition> {
    private _id: string;
    private _name: string;
    private _username: string;
    private _password: string;
    private _refresh_token: string;
    private _token_validity: string;
    private _created_at: string;
    private _updated_at: string;
    private _deleted_at: string;

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
        deletedAt: string
    ) {
        super();
        this._id = id;
        this._name = name;
        this._username = username;
        this._password = password;
        this._refresh_token = refreshToken;
        this._token_validity = tokenValidity;
        this._created_at = createdAt;
        this._updated_at = updatedAt;
        this._deleted_at = deletedAt;
    }

    public static modelName(): string {
        return 'User';
    }

    public static collectionName(): string {
        return 'users';
    }

    public static buildFromSql(data: UserDefinition): UserModel {
        return new UserModel(
            data.id,
            data.name,
            data.username,
            data.password,
            data.refresh_token,
            data.token_validity,
            data.created_at,
            data.updated_at,
            data.deleted_at
        );
    }

    public signJwtToken(password: string): string {
        if (!validatePassword(password, this.password)) {
            throw HttpError.NotAuthorized(null, 'CREDENTIAL_NOT_MATCH');
        }
        return jwt.generateToken({ user_id: this.username });
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

    public toJson(): Partial<UserDefinition> {
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
        this.hidden?.forEach((param): void => {
            delete data[param];
        });
        return data;
    }
}

// export const UserSqlClass: BaseSqlModelClass<UserModel> = UserModel;

// export const UserMongoClass: BaseMongoModelClass<UserModel> = UserModel;
