import * as Joi from 'joi';
import { BaseProps } from 'src/typings/common';
import { Model as BaseModel, RepoFactory, SchemeValidator } from 'zuu';

export interface QuoteProps extends BaseProps {
    author: string;
    text: string;
    year: number | null;
}

export class QuoteModel extends BaseModel<QuoteProps> {
    public constructor(props: QuoteProps) {
        super(props);
    }

    public static modelName = 'Quote';

    public static repo = RepoFactory.getSql<QuoteModel, QuoteProps>(QuoteModel);

    public static buildFromSql(data: QuoteProps): QuoteModel {
        return new QuoteModel({
            id: data.id,
            author: data.author,
            text: data.text,
            year: data.year,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at
        });
    }

    public static create(data: QuoteProps): QuoteModel {
        return new QuoteModel(data);
    }

    public async save(): Promise<void> {
        await QuoteModel.repo.upsert({ id: this.id }, this.toJson({ removeTimestamps: true }));
    }

    public async validate(): Promise<void> {
        const payload = this.toJson();
        const validationScheme = Joi.object({
            author: Joi.string().min(4).max(50).required(),
            text: Joi.string().min(10).required(),
            year: Joi.number().integer().optional().allow(null, '')
        });
        await SchemeValidator(payload, validationScheme);
    }
}

export default QuoteModel;
