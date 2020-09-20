export interface LoginRequest {
    body: {
        username: string;
        password: string;
    };
    query: Record<string, unknown>;
    params: Record<string, unknown>;
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
    query: Record<string, unknown>;
    params: {
        id: string;
    };
}

export interface UpdatePostResponse {
    id: string;
}
