import { Context as IContext } from 'zuu';

export type Context = IContext<{
    username: string;
    user_id: string;
    clearance: number;
}>
