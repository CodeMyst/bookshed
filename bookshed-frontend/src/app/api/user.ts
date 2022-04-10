import { environment } from "src/environments/environment";

export interface User {
    username: string;
    email: string;
    role: Role;
    password_hash: string;
    created_at: Date;
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

const apiServerUrl = environment.apiBaseUrl;