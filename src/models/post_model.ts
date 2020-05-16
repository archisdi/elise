import { BasicType } from 'src/typings/common';
import { BaseModel, BaseModelInterface } from './base/base_model';

export class PostModel extends BaseModel<PostModel> implements BaseModelInterface<BasicType<PostModel>> {
    private _id: string;
    private _author_id: string;
    private _title: string;
    private _content: string;
    private _created_at: string;
    private _updated_at: string;
    private _deleted_at: string;

    public constructor(
        id: string,
        author_id: string,
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        deletedAt: string
    ) {
        super(PostModel);
        this._id = id;
        this._author_id = author_id;
        this._title = title;
        this._content = content;
        this._created_at = createdAt;
        this._updated_at = updatedAt;
        this._deleted_at = deletedAt;
    }

    public static modelName: string = 'Post';

    public static buildFromSql(data: any): PostModel {
        return new PostModel(
            data.id,
            data.author_id,
            data.title,
            data.content,
            data.created_at,
            data.updated_at,
            data.deleted_at
        );
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get author_id(): string {
        return this._author_id;
    }

    public set author_id(value: string) {
        this._author_id = value;
    }

    public get content(): string {
        return this._content;
    }

    public set content(value: string) {
        this._content = value;
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

    public toJson(isProtected: boolean = true, withTimestamp: boolean = true): Partial<PostModel> {
        const data = {
            id: this.id,
            author_id: this.author_id,
            title: this.title,
            content: this.content,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at
        };
        if (isProtected) this.removeHidden(data);
        if (!withTimestamp) this.removeTimestamps(data);
        return data;
    }

    public async save(): Promise<void> {
        this.repo.upsert({ id: this.id }, this.toJson(false, false));
    }
}
