export type UserRole = 'admin' | 'editor' | 'viewer';

export interface IUser {
    readonly id: string;

    username: string;
    email: string;

    role: UserRole;
    bio?: string;
}


