import BaseEvent from '../base/base_event';
import { EVENT_NAMES } from '../../utils/constant';
import { PostProperties } from 'src/models/post_model';

export interface PostCreatedPayload {
    post: PostProperties;
}

export default class PostCreatedEvent extends BaseEvent {
    public constructor() {
        super(EVENT_NAMES.POST_CREATED);
    }

    protected async handler(payload: { data: PostCreatedPayload }): Promise<void> {
        const { data } = payload;
        console.info(`post with id ${data.post.id} created`);
    }
}
