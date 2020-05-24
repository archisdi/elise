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

export interface UpdatePostRequest {
    body: {
        title?: string;
        content?: string;
    };
    query: {};
    params: {
        id: string;
    };
}

export interface UpdatePostResponse {
    id: string;
}
