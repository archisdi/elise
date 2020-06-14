import { BaseModel } from './base/base_model';
import { BaseProps } from 'src/typings/common';
import RepoFactory from '../repositories';

export interface QuoteProps extends BaseProps {
    author_name: string;
    text: string;
    year: number;
}

export class QuoteModel extends BaseModel<QuoteProps> {
    public constructor(props: QuoteProps) {
        super(props);
    }

    public static modelName = 'Quote';

    public static repo = RepoFactory.getSql(QuoteModel);

    public static buildFromSql(data: QuoteProps): QuoteModel {
        return new QuoteModel({
            id: data.id,
            author_name: data.author_name,
            text: data.text,
            year: data.year,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at
        });
    }

    public get id(): string {
        return this.props.id;
    }

    public async save(): Promise<void> {
        return QuoteModel.repo.upsert({ id: this.id }, this.toJson({ withHidden: true }));
    }
}

export default QuoteModel;
