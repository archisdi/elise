export interface User {
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

export class UserModel {
    private _id: string;
    private _name: string;
    private _username: string;
    private _password: string;
    private _refresh_token: string;
    private _token_validity: string;
    private _created_at: string;
    private _updated_at: string;
    private _deleted_at: string;

    public constructor(data: User) {
        this._id = data.id;
        this._name = data.name;
        this._username = data.username;
        this._password = data.password;
        this._refresh_token = data.refresh_token;
        this._token_validity = data.token_validity;
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
        this._deleted_at = data.deleted_at;
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

    public print(): void {
        console.table(this);
    }
}
