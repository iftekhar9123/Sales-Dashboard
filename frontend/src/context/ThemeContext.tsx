import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

interface ThemeContextType {
    mode: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    mode: "dark",
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">("dark");

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "dark"
                        ? {
                            background: {
                                default: "#020617",
                                paper: "#0f172a",
                            },
                            divider: "#1e293b",
                            text: {
                                primary: "#f1f5f9",
                                secondary: "#94a3b8",
                            },
                            action: {
                                hover: "#1e293b",
                            },
                        }
                        : {
                            background: {
                                default: "#f1f5f9",
                                paper: "#ffffff",
                            },
                            divider: "#e2e8f0",
                            text: {
                                primary: "#0f172a",
                                secondary: "#64748b",
                            },
                            action: {
                                hover: "#f1f5f9",
                            },
                        }),
                },
            }),
        [mode]
    );

    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
