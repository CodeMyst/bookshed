import { environment } from "src/environments/environment";

export interface ImageUploadResult {
    success: boolean;
    message: string;
    filename: string;
}

const apiServerUrl = environment.apiBaseUrl;

export const uploadImage = async (file: File): Promise<ImageUploadResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${apiServerUrl}/api/image/`, {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        return {
            success: true,
            message: "",
            filename: (await res.json()).filename
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
            filename: ""
        };
    }
};