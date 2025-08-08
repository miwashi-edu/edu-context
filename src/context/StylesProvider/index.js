import { useContext, useEffect } from "react";
import SettingsContext from "../SettingsContext";
import styles from "./styles.module.css";

const StyleProvider = ({ children }) => {
    const { theme = "light" } = useContext(SettingsContext);

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove(styles.light, styles.dark);
        html.classList.add(styles[theme] || styles.light);
    }, [theme]);

    return children;
};

export default StyleProvider;
