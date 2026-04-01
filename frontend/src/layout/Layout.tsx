import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Filters from "../components/Filters";

const SIDEBAR_BG = { dark: "#0f172a", light: "#334155" };

const Layout = ({ children, onFilterChange, activePage, onPageChange, showFilters }: any) => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const isDark = mode === "dark";
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

            {/* Header — full width across the top */}
            <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(o => !o)} />

            {/* Body: sidebar + content side by side */}
            <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
                <Sidebar
                    open={sidebarOpen}
                    onToggle={() => setSidebarOpen(o => !o)}
                    activePage={activePage}
                    onPageChange={onPageChange}
                />

                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                    {/* Sub-header bar: page title LEFT, filters RIGHT */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            px: 3,
                            py: 1.5,
                            background: isDark ? SIDEBAR_BG.dark : theme.palette.background.paper,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        {/* Left: current page title */}
                        <Typography variant="subtitle1" fontWeight={700} sx={{ whiteSpace: "nowrap", color: theme.palette.text.primary }}>
                            {activePage}
                        </Typography>

                        {/* Right: filters — only on Sales Overview */}
                        {showFilters && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Filters onFilterChange={onFilterChange} compact />
                            </Box>
                        )}
                    </Box>

                    {/* Main content */}
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            p: 2,
                            pb: 2,
                            background: isDark ? SIDEBAR_BG.dark : theme.palette.background.default,
                            color: theme.palette.text.primary,
                            overflow: "hidden",
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;