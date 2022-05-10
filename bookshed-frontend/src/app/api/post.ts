import { environment } from "src/environments/environment";
import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
    sticky: boolean;
    createdAt: Date;
    lastEdit: Date;
}

export interface Reply {
    id: number;
    author: User;
    createdAt: Date;
    lastEdit: Date;
    content: string;
}

export interface PostCreateResult {
    success: boolean;
    message: string;
    post: Post | null;
}

const apiServerUrl = environment.apiBaseUrl;

export const createPost = async (title: string, content: string, sticky: boolean): Promise<PostCreateResult> => {
    const data = {
        title: title,
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
            post: await res.json()
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
            post: null
        };
    }
};

export const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${apiServerUrl}/api/post/all`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (res.ok) {
        return await res.json();
    }

    return [];
};

export const getPost = async (id: number): Promise<Post> => {
    const res = await fetch(`${apiServerUrl}/api/post/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    return await res.json();
};

export const getReplies = async (id: number): Promise<Reply[]> => {
    const res = await fetch(`${apiServerUrl}/api/post/reply/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if (res.ok) {
        return await res.json();
    }

    return [];
};

export const editPost = async (id: number, title: string, content: string, sticky: boolean): Promise<PostCreateResult> =>  {
    const data = {
        title: title,
        content: content,
        sticky: sticky
    };

    const res = await fetch(`${apiServerUrl}/api/post/${id}`, {
        method: "PATCH",
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
            post: await res.json()
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
            post: null
        };
    }
}

export const deletePost = async (id: number) => {
    await fetch(`${apiServerUrl}/api/post/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
};

export const deleteReply = async (postId: number, replyId: number) => {
    await fetch(`${apiServerUrl}/api/post/${postId}/${replyId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
};

export const replyPost = async (postId: number, content: string) => {
    await fetch(`${apiServerUrl}/api/post/${postId}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: content
    });
};
