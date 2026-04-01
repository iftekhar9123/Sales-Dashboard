import { Card, CardContent, Typography, useTheme, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BalanceIcon from "@mui/icons-material/Balance";
import MonitorIcon from "@mui/icons-material/Monitor";

const Cards = ({ data }: any) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const items = [
        {
            label: "Total Sales",
            value: data.totalSales ? `$${Number(data.totalSales).toLocaleString()}` : "$0",
            icon: <CurrencyRupeeIcon sx={{ fontSize: 32 }} />,
            color: "#00c853",
            bg: isDark ? "rgba(0,200,83,0.15)" : "#e8f5e9",
        },
        {
            label: "Quantity Sold",
            value: data.totalQuantity ?? 0,
            icon: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
            color: "#42a5f5",
            bg: isDark ? "rgba(66,165,245,0.15)" : "#e3f2fd",
        },
        {
            label: "Discount%",
            value: data.discountPercentage ? `${data.discountPercentage}%` : "0%",
            icon: <BalanceIcon sx={{ fontSize: 32 }} />,
            color: "#ffb300",
            bg: isDark ? "rgba(255,179,0,0.15)" : "#fff8e1",
        },
        {
            label: "Profit",
            value: data.totalProfit ? `$${Number(data.totalProfit).toLocaleString()}` : "$0",
            icon: <MonitorIcon sx={{ fontSize: 32 }} />,
            color: "#ef5350",
            bg: isDark ? "rgba(239,83,80,0.15)" : "#ffebee",
        },
    ];

    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid size={{ xs: 12, md: 3 }} key={item.label}>
                    <Card
                        sx={{
                            background: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: "16px !important" }}>
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    background: item.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: item.color,
                                    flexShrink: 0,
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Box>
                                <Typography variant="body2" fontWeight={800} fontSize={14}>
                                    {item.label}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                    {item.value}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Cards;