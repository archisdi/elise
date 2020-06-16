import { BaseModel } from './base/base_model';
import { BaseProps } from 'src/typings/common';
import RepoFactory from '../factories/repository';

export interface PostProperties extends BaseProps {
    author_id: string;
    title: string;
    content: string;
}

export class PostModel extends BaseModel<PostProperties> {
    public constructor(props: PostProperties) {
        super(props);
    }

    public static modelName = 'Post';

    public static repo = RepoFactory.getSql(PostModel);

    public static buildFromSql(data: PostProperties): PostModel {
        return new PostModel({
            id: data.id,
            author_id: data.author_id,
            content: data.content,
            title: data.title,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at
        });
    }

    public get id(): string {
        return this.props.id;
    }

    public set id(value: string) {
        this.props.id = value;
    }

    public get title(): string {
        return this.props.title;
    }

    public set title(value: string) {
        this.props.title = value;
    }

    public get author_id(): string {
        return this.props.author_id;
    }

    public set author_id(value: string) {
        this.props.author_id = value;
    }

    public get content(): string {
        return this.props.content;
    }

    public set content(value: string) {
        this.props.content = value;
    }

    public get created_at(): string {
        return this.props.created_at;
    }

    public set created_at(value: string) {
        this.props.created_at = value;
    }

    public get updated_at(): string {
        return this.props.updated_at;
    }

    public set updated_at(value: string) {
        this.props.updated_at = value;
    }

    public get deleted_at(): string {
        return this.props.deleted_at;
    }

    public set deleted_at(value: string) {
        this.props.deleted_at = value;
    }

    public async save(): Promise<void> {
        return PostModel.repo.upsert({ id: this.id }, this.toJson());
    }
}

export default PostModel;
