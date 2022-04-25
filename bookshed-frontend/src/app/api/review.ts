import { async } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { Book } from "./book";
import { User } from "./user";

export interface Review {
    id: number;
    book: Book;
    author: User;
    content: string;
    createdAt: Date;
    lastEdit: Date;
}

const apiServerUrl = environment.apiBaseUrl;

export interface ReviewCreateResult {
    success: boolean;
    message: string;
    url: string;
}

export const createReview = async (idBook: number, content: string) : Promise<ReviewCreateResult> => {
    const res = await fetch(`${apiServerUrl}/api/review/${idBook}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "text/html; charset=UTF-8"
        },
        credentials: "include",
        body: content
    });

    if (res.ok) {
        return {
            success: true,
            message: "Review posted",
            url: (await res.json()).url
        };
    } else {
        let msg: string;

        try {
            msg = (await res.json()).message;
        } catch (_) {
            msg = "Something went wrong with posting your review. Try again."
        }

        return {
            success: false,
            message: msg,
            url: ""
        };
    }
}

export const getBookReviews = async (idBook: number) : Promise<Review[]> => {
    const res = await fetch(`${apiServerUrl}/api/review/${idBook}`, {
        method : "GET",
        mode : "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
}

export const deleteReview = async (idReview: number) : Promise<void> => {
    const res = await fetch(`${apiServerUrl}/api/review/${idReview}`, {
        method : "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
}
