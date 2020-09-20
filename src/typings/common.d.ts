import { IContext as Context } from 'zuu/modules/typings/common';

export type IContext = Context<{
    username: string;
    user_id: string;
    clearance: number;
}>
