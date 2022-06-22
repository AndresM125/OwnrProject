const JWT_LOCAL_STORAGE_KEY = "jwt";

export default class AuthService {
    static getJWT() {
        return localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    }

    static setJWT(token) {
        localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
    }

    static isLoggedIn()
    {
        return this.getJWT() != null;
    }

    static logout() {
        localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
    }

    static getAuthHeader() {
        return `Bearer ${this.getJWT()}`
    }
}