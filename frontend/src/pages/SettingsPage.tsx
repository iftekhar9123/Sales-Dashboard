import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsPage = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}>
            <SettingsIcon sx={{ fontSize: 64, color: "text.secondary" }} />
            <Typography variant="h5" fontWeight={700} color="text.primary">Settings</Typography>
            <Typography variant="body2" color="text.secondary">Settings panel coming soon.</Typography>
        </Box>
    );
};

export default SettingsPage;
