import { User } from "./user";
import { environment } from "src/environments/environment";

export interface AuthResult {
    success: boolean;
    message: string;
}

const apiServerUrl = environment.apiBaseUrl;

export const register = async (username: string, email: string, password: string): Promise<AuthResult> => {

    const data = {
        username: username,
        email: email,
        password: password
    };

    const res = await fetch(`${apiServerUrl}/api/auth/register`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const success = res.ok;

    if (res.ok) {
        return {
            success: true,
            message: ""
        };
    } else {
        let msg: string;

        try {
            msg = (await res.json()).message;
        } catch (_) {
            msg = "Something went wrong. Try again.";
        }

        return {
            success: false,
            message: msg
        };
    }
};

export const login = async (username: string, password: string): Promise<AuthResult> => {
    const data = {
        username: username,
        password: password
    };

    const res = await fetch(`${apiServerUrl}/api/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    const success = res.ok;

    let msg = "";

    if (!success) msg = "Wrong username/password combination.";

    return {
        success: success,
        message: msg
    };
};

export const logout = async () => {
    const res = await fetch(`${apiServerUrl}/api/auth/logout`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
};

export const isLoggedIn = async (): Promise<boolean> => {
    const res = await fetch(`${apiServerUrl}/auth/self`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return res.ok;
};

export const getUser = async (): Promise<User> => {
    const res = await fetch(`${apiServerUrl}/api/auth/self`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};