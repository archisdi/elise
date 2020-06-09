import Event, { StaticEvent } from './base/base_event';
import { EVENT_NAMES } from 'src/utils/constant';
import EventHandlers from './handlers';

let instance: { [s: string]: Event };

export const initialize = (): void => {
    instance = {};
    for (const event of EventHandlers) {
        const EventInstance = new event();
        instance[EventInstance.event_name] = EventInstance;
    }
};

export const dispatch = async <Data = any>(event: EVENT_NAMES, data: Data): Promise<void> => {
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
