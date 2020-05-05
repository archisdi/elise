export interface IRefreshToken {
    token: string;
    valid_until: string;
}

export interface ITokens {
    token: string;
    refresh_token: IRefreshToken;
}

export interface ICredential {
    username: string;
    password: string;
}

export interface ITokenable {
    user_id: string;
    username: string;
}
