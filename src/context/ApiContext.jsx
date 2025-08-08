import { createContext, useMemo, useContext } from "react";
import ConfigurationContext from "./ConfigurationContext";

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
    const config = useContext(ConfigurationContext);

    const api = useMemo(() => {
        const base = (path) =>
            /^https?:\/\//i.test(path) ? path : `${config.backendUrl}${path}`;

        return {
            secureGet: (path, opts) =>
                fetch(base(path), { credentials: "include", ...(opts || {}) }),

            securePost: (path, body, opts) =>
                fetch(base(path), {
                    method: "POST",
                    headers: { "Content-Type": "application/json", ...(opts?.headers || {}) },
                    credentials: "include",
                    body: JSON.stringify(body),
                    ...opts,
                }),

            securePut: (path, body, opts) =>
                fetch(base(path), {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", ...(opts?.headers || {}) },
                    credentials: "include",
                    body: JSON.stringify(body),
                    ...opts,
                }),

            secureDelete: (path, opts) =>
                fetch(base(path), { method: "DELETE", credentials: "include", ...(opts || {}) }),
        };
    }, [config.backendUrl]);

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export default ApiContext;
