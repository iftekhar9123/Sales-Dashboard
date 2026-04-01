import { Box, Typography, IconButton, Avatar, useTheme } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = ({ sidebarOpen, onToggleSidebar }: any) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === "light";
    const headerBg = isLight ? "#409191" : "#0f172a";
    const headerBorder = isLight ? "#357a7a" : "#1e293b";

    return (
        <Box
            sx={{
                height: 64,
                flexShrink: 0,
                background: headerBg,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${headerBorder}`,
                px: 2,
                zIndex: 10,
            }}
        >
            {/* Left: hamburger toggle + Sales Dashboard title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                    onClick={onToggleSidebar}
                    size="small"
                    sx={{ color: "#ffffff" }}
                    title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffffff", letterSpacing: 1 }}>
                    Sales Dashboard
                </Typography>
            </Box>

            {/* Right: Hello User + Avatar */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="body2" sx={{ color: "#ffffff" }}>Hello User</Typography>
                <Avatar
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    sx={{ width: 38, height: 38, border: "2px solid rgba(255,255,255,0.7)" }}
                />
            </Box>
        </Box>
    );
};

export default Topbar;
