import { Context as IContext } from '@archisdi/zuu';

export type Context = IContext<{
    username: string;
    user_id: string;
    clearance: number;
}>
