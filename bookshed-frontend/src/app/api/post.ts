import { environment } from "src/environments/environment";
import { User } from "./user";

export interface Post {
    id: number;
    // title: string;
    content: string;
    sticky: boolean;
    author: User;
    createdAt: Date;
}

export interface PostCreateResult {
    success: boolean;
    message: string;
    url: string;
}

const apiServerUrl = environment.apiBaseUrl;

export const createPost = async (content: string, sticky: boolean): Promise<PostCreateResult> => {
    const data = {
        content: content,
        sticky: sticky
    };

    const res = await fetch(`${apiServerUrl}/api/post/create`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    if (res.ok) {
        return {
            success: true,
            message: "",
            url: (await res.json()).url
        };
    } else {
        let msg: string;

        try {
            msg = (await res.json()).message;
        } catch (_) {
            msg = "Something went wrong. Try again."
        }

        return {
            success: false,
            message: msg,
            url: ""
        };
    }
};