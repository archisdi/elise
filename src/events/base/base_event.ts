import * as Bull from 'bull';

export interface StaticEventHandler<dispatchPayload = any> {
    eventName: string;
    handler(payload: dispatchPayload): Promise<void>
}

export interface StaticBaseEvent<InstanceBaseEvent, dispatchPayload = any> {
    new (...param: any): InstanceBaseEvent;
    getInstance(): InstanceBaseEvent;
    dispatch(payload: dispatchPayload): Promise<void>
}

export abstract class BaseEvent<PayloadData = any> {
    public queue: Bull.Queue;

    public constructor(eventName: string) {
        this.queue = new Bull(eventName, String(process.env.QUEUE_WORKER_CONNECTION_STRING));
        this.queue.process(this.handler);
    }

    protected abstract handler({ data }: { data: PayloadData }): Promise<void>
}

export interface StaticEvent {
    new (...params: any): BaseEvent;
}
