export interface LoginRequest {
    body: {
        username: string;
        password: string;
    };
    query: {};
    params: {};
}

export interface LoginReponse {
    token: string;
    refresh_token: string;
    expires_in: number;
}
