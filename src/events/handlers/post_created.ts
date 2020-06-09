import BaseEvent from '../base/base_event';
import { EVENT_NAMES } from '../../utils/constant';
import { PostProperties } from 'src/models/post_model';

export interface PostCreatedPayload {
    post: PostProperties;
}

export default class PostCreatedEvent extends BaseEvent<PostCreatedPayload> {
    public constructor() {
        super(EVENT_NAMES.POST_CREATED);
    }

    protected async handler({ data }: { data: PostCreatedPayload }): Promise<void> {
        console.info(`post with id ${data.post.id} created`);
    }
}
