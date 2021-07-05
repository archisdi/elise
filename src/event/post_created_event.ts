import { PostProperties } from 'src/entity/models/post_model';
import { EventFactory } from '@archisdi/zuu';

interface EventPayload {
    post: PostProperties;
}

const PostCreatedEvent = EventFactory<EventPayload>(
    class Event {
        public static eventName = 'post-created';

        public static async handler(payload: EventPayload): Promise<void> {
            console.info(`post with id ${payload.post.id} created`);
        }
    }
);

export default PostCreatedEvent;
