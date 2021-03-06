import { environment } from "src/environments/environment";
import { User } from "./user";

export interface Book {
    id: number;
    title: string;
    author: string;
    category: BookCategory;
    description: string;
    imageUrl: string;
}

export interface BookCategory {
    id: number;
    name: string;
}

export interface BookCreateResult {
    success: boolean;
    message: string;
    url: string;
}

export interface SellInfo {
    id: number;
    location: string;
    price: number;
}

export interface BookRating {
    id: number;
    author: User;
    ratedAt: Date;
    rating: number;
    book: Book; 
}

const apiServerUrl = environment.apiBaseUrl;

export const getAllBooks = async (): Promise<Book[]> => {
    const res = await fetch(`${apiServerUrl}/api/book/all`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const getAllBookCategories = async (): Promise<BookCategory[]> => {  
    const res = await fetch(`${apiServerUrl}/api/book/allCat`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const getByCategory = async (categoryId: number): Promise<Book[]> => {  
    const res = await fetch(`${apiServerUrl}/api/book/getByCategory?categoryId=${categoryId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const searchBooks = async (query: string, categoryId: number): Promise<Book[]> => {  
    const res = await fetch(`${apiServerUrl}/api/book/search?query=${query}&categoryId=${categoryId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const createBook = async (title: string, author: string, categoryId: number, description: string, imageUrl: string): Promise<BookCreateResult> => {
    const data = {
        title: title,
        author: author,
        categoryId: categoryId,
        description: description,
        imageUrl: imageUrl
    };

    const res = await fetch(`${apiServerUrl}/api/book/createBook`, {
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

export const deleteBook = async (id: number) => {
    await fetch(`${apiServerUrl}/api/book/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
};

export const editBook = async (title: string, author: string, categoryId: number, description: string, imageUrl: string, id: number): Promise<BookCreateResult> => {
    const data = {
        title: title,
        author: author,
        categoryId: categoryId,
        description: description,
        imageUrl: imageUrl
    };

    const res = await fetch(`${apiServerUrl}/api/book/${id}`, {
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

export const getBook = async (id: number): Promise<Book> => {
    const res = await fetch(`${apiServerUrl}/api/book/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
}

export const getBookSellInfos = async (id: number): Promise<SellInfo[]> => {
    const res = await fetch(`${apiServerUrl}/api/book/${id}/sellInfo`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const addBookSellInfo = async (id: number, location: string, price: number) => {
    const data = {
        location: location,
        price: price
    };

    await fetch(`${apiServerUrl}/api/book/${id}/sellInfo`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
};

export const rateBook = async (id: number, ratingValue: number) => {
    await fetch(`${apiServerUrl}/api/book/${id}/rate?ratingValue=${ratingValue}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
};

export const getUserBookRating = async (id: number): Promise<BookRating> => {
    const res = await fetch(`${apiServerUrl}/api/book/${id}/rate`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const getBestInLastMonth = async (): Promise<BookRating[]> => {
    const res = await fetch(`${apiServerUrl}/api/book/bestLastMonth`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};

export const getAverageRating = async (id: number): Promise<number> => {
    const res = await fetch(`${apiServerUrl}/api/book/${id}/avgRating`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
};