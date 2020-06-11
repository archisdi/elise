import { UserProperties } from '../models/user_model';
import EventFactory from '../factories/event';

interface EventPayload {
    user: UserProperties;
}

const UserLoggedInEvent = EventFactory<EventPayload>(class Event {
    public static eventName = 'user-login';

    public static async handler(payload: EventPayload): Promise<void> {
        console.info(`user with username ${payload.user.username} logged in`);
    }
}
);

export default UserLoggedInEvent;
