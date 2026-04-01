import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsPage = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}>
            <NotificationsIcon sx={{ fontSize: 64, color: "text.secondary" }} />
            <Typography variant="h5" fontWeight={700} color="text.primary">Notifications</Typography>
            <Typography variant="body2" color="text.secondary">No new notifications at this time.</Typography>
        </Box>
    );
};

export default NotificationsPage;
