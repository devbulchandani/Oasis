import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formdata: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Token Invalid")
    }

    return response.json();

}

export const signIn = async (formdata: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    })
    if (!response.ok) {
        throw new Error("Error signing out");
    }
}

export const addMyHotel = async (hotelFormdata: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormdata
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
}