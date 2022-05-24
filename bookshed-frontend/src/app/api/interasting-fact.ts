import { environment } from "src/environments/environment";

const apiServerUrl = environment.apiBaseUrl;

export interface InterestingFact {
    id: number;
    createdAt: Date;
    content: string;
}

export const getFact = async (): Promise<InterestingFact> => {
    const res = await fetch(`${apiServerUrl}/api/fact/`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    return await res.json();
}

export const postFact = async (content: string): Promise<InterestingFact> => {
    const res = await fetch(`${apiServerUrl}/api/fact/`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: content
    });

    return await res.json();
}