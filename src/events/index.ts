import Event from './base/base_event';
import { EVENT_NAMES } from 'src/utils/constant';
import EventHandlers from './handlers';

export type EventsInstance = { [s: string]: Event };

export class Events {
    public static instance: EventsInstance;

    public static initialize(): void {
        this.instance = {};
        for (const event of EventHandlers) {
            const EventInstance = new event();
            this.instance[EventInstance.event_name] = EventInstance;
        }
    }
    
    public static async dispatch<Data = any>(event: EVENT_NAMES, data: Data): Promise<void> {
        if (!this.instance) {
            throw new Error('Job not initialized');
        }
        await this.instance[event].dispatch(data);
        console.info(`${event} dispatched`);
    }
    
}

export default Events;
