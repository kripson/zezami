import { User } from "../models";

export interface ServerResponse {
    status: number;
    message: string;
    data: User[];
}