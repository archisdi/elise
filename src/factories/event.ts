import { BaseEvent, StaticBaseEvent, StaticEventHandler } from '../events/base/base_event';

export const EventFactory = <dispatchPayload = any>(eventHandler: StaticEventHandler<dispatchPayload>): StaticBaseEvent<BaseEvent, dispatchPayload> => {
    return class EventClass extends BaseEvent {
        private static instance: EventClass;

        public constructor() {
            super(eventHandler.eventName);
        }

        protected async handler({ data }: { data: dispatchPayload }): Promise<void> {
            await eventHandler.handler(data);
        }

        public static getInstance(): EventClass {
            if (!this.instance) {
                this.instance = new EventClass();
            }
            return this.instance;
        }

        public static async dispatch(payload: dispatchPayload): Promise<void> {
            const instance = this.getInstance();
            await instance.queue.add(payload);
        }
    };
};

export default EventFactory;
