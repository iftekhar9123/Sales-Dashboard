import { Box, List, ListItem, ListItemText, ListItemButton, Divider } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
    { label: "Sales Overview", icon: <DashboardIcon fontSize="small" /> },
    { label: "Stores", icon: <StoreIcon fontSize="small" /> },
    { label: "Notifications", icon: <NotificationsIcon fontSize="small" /> },
    { label: "Settings", icon: <SettingsIcon fontSize="small" /> },
];

const Sidebar = ({ open, onToggle, activePage, onPageChange }: { open: boolean; onToggle: () => void; activePage: string; onPageChange: (page: string) => void }) => {
    const { mode, toggleTheme } = useThemeContext();

    const SIDEBAR_BG = mode === "light" ? "#334155" : "#0f172a";
    const SIDEBAR_TEXT = "#f1f5f9";
    const SIDEBAR_SUBTEXT = "#94a3b8";
    const SIDEBAR_HOVER = mode === "light" ? "#475569" : "#1e293b";
    const SIDEBAR_DIVIDER = mode === "light" ? "#475569" : "#1e293b";
    const SIDEBAR_ACTIVE = mode === "light" ? "#409191" : "#0e7490";

    return (
        <Box
            sx={{
                width: open ? 240 : 0,
                flexShrink: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: SIDEBAR_BG,
                borderRight: `1px solid ${SIDEBAR_DIVIDER}`,
                color: SIDEBAR_TEXT,
                overflow: "hidden",
                transition: "width 0.25s ease",
                p: open ? 2 : 0,
                whiteSpace: "nowrap",
            }}
        >
            <Divider sx={{ mb: 1, borderColor: SIDEBAR_DIVIDER }} />

            <List sx={{ flex: 1 }}>
                {navItems.map(({ label, icon }) => {
                    const isActive = activePage === label;
                    return (
                        <ListItem
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                background: isActive ? SIDEBAR_ACTIVE : "transparent",
                                "&:hover": { background: isActive ? SIDEBAR_ACTIVE : SIDEBAR_HOVER },
                            }}
                            key={label}
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => onPageChange(label)}
                                sx={{ gap: 1, borderRadius: 2 }}
                            >
                                <Box sx={{ color: isActive ? "#ffffff" : SIDEBAR_SUBTEXT }}>{icon}</Box>
                                <ListItemText primary={label} sx={{ color: SIDEBAR_TEXT }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}

                {/* Theme Toggle */}
                <ListItem
                    sx={{
                        borderRadius: 2,
                        mt: 1,
                        "&:hover": { background: SIDEBAR_HOVER },
                    }}
                    disablePadding
                >
                    <ListItemButton onClick={toggleTheme} sx={{ gap: 1, borderRadius: 2 }}>
                        <Box sx={{ color: SIDEBAR_SUBTEXT }}>
                            {mode === "dark" ? (
                                <LightModeIcon fontSize="small" />
                            ) : (
                                <DarkModeIcon fontSize="small" />
                            )}
                        </Box>
                        <ListItemText
                            primary={mode === "dark" ? "Light Theme" : "Dark Theme"}
                            sx={{ color: SIDEBAR_TEXT }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
