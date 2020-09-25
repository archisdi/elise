import { IContext as Context } from 'zuu';

export type IContext = Context<{
    username: string;
    user_id: string;
    clearance: number;
}>
