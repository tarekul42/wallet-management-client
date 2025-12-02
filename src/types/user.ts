import type { TRole } from "./index";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: TRole;
    phone?: string;
    address?: string;
    isDeleted: boolean;
    status: "active" | "blocked";
    createdAt: string;
    updatedAt: string;
}
