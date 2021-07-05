import { BaseProps, Model as BaseModel } from '@archisdi/zuu';
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

}

export default UserModel;
