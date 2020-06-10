import BaseEvent from '../base/base_event';
import { EVENT_NAMES } from '../../utils/constant';
import { UserProperties } from '../../models/user_model';

export interface UserLoginEventPayload {
    user: UserProperties;
}

export default class UserLoginEvent extends BaseEvent {
    public constructor() {
        super(EVENT_NAMES.USER_LOGIN);
    }

    protected async handler({ data }: { data: UserLoginEventPayload }): Promise<void> {
        console.info(`user with username ${data.user.username} logged in`);
    }
}
