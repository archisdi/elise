export interface RefreshToken {
    token: string;
    valid_until: string;
}

export interface Tokenable {
    user_id: string;
    username: string;
    clearance: number;
}
