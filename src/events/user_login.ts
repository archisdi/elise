import BaseEvent from './base/base_event';
import { EVENTS } from '../utils/constant';
import { UserProperties } from '../models/user_model';

export interface UserLoginEventPayload {
    user: UserProperties;
}

export default class UserLoginEvent extends BaseEvent<UserLoginEventPayload> {
    public constructor() {
        super(EVENTS.USER_LOGIN);
    }

    protected async handler({ data }: { data: UserLoginEventPayload }): Promise<void> {
        console.info(`user with username ${data.user.username} logged in`);
    }
}
