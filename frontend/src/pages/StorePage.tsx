import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const StorePage = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 2 }}>
            <StoreIcon sx={{ fontSize: 64, color: "text.secondary" }} />
            <Typography variant="h5" fontWeight={700} color="text.primary">Stores</Typography>
            <Typography variant="body2" color="text.secondary">Store management coming soon.</Typography>
        </Box>
    );
};

export default StorePage;
