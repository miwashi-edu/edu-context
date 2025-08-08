import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ConfigurationContext from "./ConfigurationContext";

const LS_KEY = "auth:token";

const AuthContext = createContext({
    status: "idle",           // 'idle' | 'authenticating' | 'authenticated' | 'error'
    isAuthenticated: false,
    user: null,
    token: null,
    login: async (_creds) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const { backendUrl } = useContext(ConfigurationContext);
    const [status, setStatus] = useState("idle");
    const [token, setToken] = useState(() => localStorage.getItem(LS_KEY));
    const [user, setUser] = useState(null);

    // Try to hydrate user when token exists
    useEffect(() => {
        let ignore = false;
        (async () => {
            if (!token) return;
            try {
                setStatus("authenticating");
                const r = await fetch(`${backendUrl}/me`, { credentials: "include", headers: { Authorization: `Bearer ${token}` }});
                if (!r.ok) throw new Error(`GET /me ${r.status}`);
                const u = await r.json();
                if (!ignore) { setUser(u); setStatus("authenticated"); }
            } catch {
                if (!ignore) { setToken(null); setUser(null); setStatus("idle"); localStorage.removeItem(LS_KEY); }
            }
        })();
        return () => { ignore = true; };
    }, [backendUrl, token]);

    const login = useCallback(async (credentials) => {
        setStatus("authenticating");
        try {
            const r = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            });
            if (!r.ok) throw new Error(`POST /auth/login ${r.status}`);
            const { token: t, user: u } = await r.json();
            setToken(t); localStorage.setItem(LS_KEY, t);
            setUser(u); setStatus("authenticated");
            return { ok: true };
        } catch (e) {
            setToken(null); setUser(null); setStatus("error");
            localStorage.removeItem(LS_KEY);
            return { ok: false, error: e };
        }
    }, [backendUrl]);

    const logout = useCallback(async () => {
        try { await fetch(`${backendUrl}/auth/logout`, { method: "POST", credentials: "include" }); } catch {}
        setToken(null); setUser(null); setStatus("idle"); localStorage.removeItem(LS_KEY);
    }, [backendUrl]);

    const value = useMemo(() => ({
        status,
        isAuthenticated: status === "authenticated" && !!token,
        user,
        token,
        login,
        logout,
    }), [status, token, user, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
