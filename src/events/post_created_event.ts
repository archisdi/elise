import EventFactory from '../factories/event';
import { PostProperties } from 'src/models/post_model';

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
