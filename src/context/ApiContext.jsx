import { createContext, useContext, useMemo } from "react";
import ConfigurationContext from "./ConfigurationContext";
import AuthContext from "./AuthContext";

class ApiError extends Error {
    constructor(message, { status, body } = {}) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
    const { backendUrl } = useContext(ConfigurationContext);
    const { token, logout } = useContext(AuthContext);

    const api = useMemo(() => {
        const base = (path) => (/^https?:\/\//i.test(path) ? path : `${backendUrl}${path}`);

        const request = async (method, path, body, opts = {}) => {
            const headers = { ...(opts.headers || {}) };
            if (token) headers.Authorization = `Bearer ${token}`;
            if (body != null && !headers["Content-Type"]) headers["Content-Type"] = "application/json";

            const res = await fetch(base(path), {
                method,
                credentials: "include",
                headers,
                body: body != null ? (headers["Content-Type"]?.includes("json") ? JSON.stringify(body) : body) : undefined,
                signal: opts.signal,
            });

            // Basic error handling + auth guard
            let payload = null;
            const ct = res.headers.get("content-type") || "";
            if (ct.includes("application/json")) { try { payload = await res.json(); } catch {} }
            else { payload = await res.text().catch(() => null); }

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) { // auth lost/invalid
                    try { await logout(); } catch {}
                }
                throw new ApiError(`${method} ${path} failed`, { status: res.status, body: payload });
            }
            return payload;
        };

        return {
            secureGet: (path, opts) => request("GET", path, null, opts),
            securePost: (path, body, opts) => request("POST", path, body, opts),
            securePut: (path, body, opts) => request("PUT", path, body, opts),
            secureDelete: (path, opts) => request("DELETE", path, null, opts),
            ApiError,
        };
    }, [backendUrl, token, logout]);

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export default ApiContext;
