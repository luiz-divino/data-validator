import type { IUser } from "./user.type.js";

export interface ILogDetails {
    action: string;
    timestamp: number;
}

export type UserAuditlog = IUser & ILogDetails;