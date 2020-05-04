export interface LoginHandlerInput {
    body: {
        username: string;
        password: string;
    };
    query: {};
    params: {};
}

export interface LoginHandlerOutput {
    token: string;
    refresh_token: string;
    expires_in: number;
}
