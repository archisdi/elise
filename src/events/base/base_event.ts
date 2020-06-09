import * as Bull from 'bull';

export default abstract class BaseEvent<PayloadData = any> {
    protected _queue: Bull.Queue;
    protected _eventName: string;

    public constructor(eventName: string, isConsumer?: boolean) {
        this._eventName = eventName;
        this._queue = new Bull(eventName, String(process.env.QUEUE_WORKER_CONNECTION_STRING));
        this._queue.process(this.handler);
    }

    public async dispatch(payload: PayloadData): Promise<void> {
        this._queue.add(payload);
    }

    protected abstract handler(payload: { data: PayloadData }): Promise<void>;

    public get event_name(): string {
        return this._eventName;
    }
}

export interface StaticEvent {
    new (...params: any): BaseEvent;
}
