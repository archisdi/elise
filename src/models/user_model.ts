import { User } from 'src/typings/models/user';

export class UserModel {
    private id: string;
    private name: string;
    private _username: string;
    private _password: string;
    private refresh_token: string;
    private token_validity: string;
    private created_at: string;
    private updated_at: string;
    private deleted_at: string;

    public constructor(data: User) {
        this.id = data.id;
        this.name = data.name;
        this._username = data.username;
        this._password = data.password;
        this.refresh_token = data.refresh_token;
        this.token_validity = data.token_validity;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
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

    public print(): void {
        console.table(this);
    }
}
