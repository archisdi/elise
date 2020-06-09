import Event, { StaticEvent } from './base/base_event';
import { EVENTS } from 'src/utils/constant';
import UserLoginEvent from './user_login';

let instance: { [s: string]: Event };

const events: StaticEvent[] = [UserLoginEvent];

export const initialize = (): void => {
    instance = {};
    for (const event of events) {
        const EventInstance = new event();
        instance[EventInstance.event_name] = EventInstance;
    }
};

export const dispatch = async <Data = any>(event: EVENTS, data: Data): Promise<void> => {
    if (!instance) {
        throw new Error('Job not initialized');
    }
    await instance[event].dispatch(data);
    console.info(`${event} dispatched`);
};

export default {
    initialize,
    dispatch
};
