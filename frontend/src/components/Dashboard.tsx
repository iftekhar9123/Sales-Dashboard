import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import Cards from "./Cards";
import ReactECharts from "echarts-for-react";
import { getDashboardStatistics, getChartData } from "../services/api";

interface ChartItem { name: string; value: number; }
interface ChartData {
    salesByCity: ChartItem[];
    salesByProduct: ChartItem[];
    salesByCategory: ChartItem[];
    salesBySubCategory: ChartItem[];
    salesBySegment: ChartItem[];
}

// Table-with-progress-bar component for Products / Sub-Category
const SalesTable = ({ title, colLabel, items, theme }: { title: string; colLabel: string; items: ChartItem[]; theme: any }) => {
    const isDark = theme.palette.mode === "dark";
    const divider = `1px solid ${theme.palette.divider}`;
    const nameBg = isDark ? "rgb(221, 238, 240)" : "#a2e7ec";
    const valBg = "#29a5b6";

    return (
        <Card sx={{ background: theme.palette.background.paper, border: divider, color: theme.palette.text.primary, height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <CardContent sx={{ p: "12px !important", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", "&:last-child": { pb: "12px" } }}>
                <Typography fontWeight="bold" mb={1.5}>{title}</Typography>

                {/* Header */}
                <Box sx={{ display: "flex", pb: 0.75, borderBottom: divider }}>
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700}>{colLabel}</Typography>
                    </Box>
                    <Box sx={{ width: 95, textAlign: "right", flexShrink: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={700}>Sales in $</Typography>
                    </Box>
                </Box>

                {/* Rows */}
                <Box sx={{ flex: 1, overflow: "auto", minHeight: 0, pt: 0.5 }}>
                    {items.map((item) => (
                        <Box
                            key={item.name}
                            sx={{
                                display: "flex",
                                alignItems: "stretch",
                                mb: 0.5,
                                borderRadius: "4px",
                                overflow: "hidden",
                            }}
                        >
                            {/* Name cell */}
                            <Box sx={{ flex: 1, bgcolor: nameBg, px: 1.5, py: 0.4, overflow: "hidden" }}>
                                <Typography variant="body2" noWrap title={item.name} sx={{ fontSize: 13, color: "#0f172a" }}>
                                    {item.name}
                                </Typography>
                            </Box>
                            {/* Value cell — teal background, white text */}
                            <Box sx={{ width: 95, flexShrink: 0, bgcolor: valBg, display: "flex", alignItems: "center", justifyContent: "center", px: 1 }}>
                                <Typography variant="body2" fontWeight={700} sx={{ fontSize: 10, color: "#241a1a", whiteSpace: "nowrap" }}>
                                    ${item.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

const Dashboard = ({ filters }: any) => {
    const theme = useTheme();
    const [data, setData] = React.useState<any>({});
    const [chartData, setChartData] = React.useState<ChartData>({
        salesByCity: [],
        salesByProduct: [],
        salesByCategory: [],
        salesBySubCategory: [],
        salesBySegment: [],
    });

    useEffect(() => {
        if (filters?.state && filters?.fromDate && filters?.toDate) {
            getDashboardStatistics(filters).then((res) => setData(res.data.data));
            getChartData(filters).then((res) => setChartData(res.data.data));
        }
    }, [filters]);

    const textColor = theme.palette.text.primary;
    const bgColor = theme.palette.background.paper;

    const isDark = theme.palette.mode === "dark";

    // Horizontal green-intensity bar chart for Sales by City
    const makeCityBarOption = (items: ChartItem[]) => {
        const maxVal = items.length ? Math.max(...items.map(i => i.value)) : 1;
        const colorRange = isDark
            ? ["#3fa1a7", "#28a8a8", "#29a5b6"]
            : ["#30c8d3", "#71cbcf", "#1b4332"];
        const trackColor = isDark ? "rgba(203, 231, 231, 0.94)" : "#a2e7ec";
        return {
            backgroundColor: bgColor,
            tooltip: {
                trigger: "axis",
                formatter: (params: any) => {
                    const p = params[0];
                    return `${p.name}<br/>$${p.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
                },
            },
            grid: { left: "2%", right: "4%", top: "4%", bottom: "8%", containLabel: true },
            visualMap: {
                show: false,
                min: 0,
                max: maxVal,
                inRange: { color: colorRange },
            },
            xAxis: {
                type: "value",
                min: 0,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: textColor,
                    formatter: (val: number) =>
                        `$${val >= 1000 ? (val / 1000).toFixed(0) + "k" : val}`,
                },
                splitLine: { show: false },
            },
            yAxis: {
                type: "category",
                data: [...items].reverse().map(i => i.name),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: textColor, fontSize: 12 },
            },
            series: [{
                type: "bar",
                data: [...items].reverse().map(i => i.value),
                itemStyle: { borderRadius: [0, 4, 4, 0] },
                showBackground: true,
                backgroundStyle: {
                    color: trackColor,
                    borderRadius: [0, 4, 4, 0],
                },
                label: { show: false },
            }],
        };
    };

    const makePieOption = (items: ChartItem[], colors?: string[]) => ({
        backgroundColor: bgColor,
        tooltip: { trigger: "item" },
        textStyle: { color: textColor },
        legend: { bottom: "0%", textStyle: { color: textColor } },
        color: colors,
        series: [{
            type: "pie",
            radius: ["40%", "65%"],
            center: ["50%", "45%"],
            label: { show: false },
            data: items,
        }],
    });

    const categoryColors = ["#b99015", "#1976D2", "#FF5722"];  // deep orange, blue, yellow

    const cardSx = {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
    };

    // topbar=64, subheader≈48, p:2 top+bottom=32, cards≈88, mb*2=24, gap*2=32, extra=12
    // Available for 2 chart rows = 100vh - 268px, each row = half
    const ROW_H = "calc((100vh - 268px) / 2)";

    return (
        <Box sx={{ overflow: "hidden" }}>

            {/* Cards row */}
            <Box sx={{ mb: 1.5 }}>
                <Cards data={data} />
            </Box>

            {/* Row 1: City bar + Products table */}
            <Box sx={{ height: ROW_H, display: "flex", gap: 2, mb: 1.5, overflow: "hidden" }}>
                {/* City bar */}
                <Box sx={{ flex: 1, minWidth: 0, height: "100%" }}>
                    <Card sx={{ ...cardSx, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <CardContent sx={{ p: "12px !important", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", "&:last-child": { pb: "12px" } }}>
                            <Typography mb={1} fontWeight="bold" sx={{ flexShrink: 0 }}>Sales by City</Typography>
                            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                                <ReactECharts
                                    option={makeCityBarOption(chartData.salesByCity)}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                {/* Products table */}
                <Box sx={{ flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>
                    <SalesTable title="Sales by Products" colLabel="Product Name" items={chartData.salesByProduct} theme={theme} />
                </Box>
            </Box>

            {/* Row 2: Category pie + SubCategory table + Segment pie */}
            <Box sx={{ height: ROW_H, display: "flex", gap: 2, overflow: "hidden" }}>
                {/* Category pie */}
                <Box sx={{ flex: 1, minWidth: 0, height: "100%" }}>
                    <Card sx={{ ...cardSx, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <CardContent sx={{ p: "12px !important", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", "&:last-child": { pb: "12px" } }}>
                            <Typography mb={1} fontWeight="bold" sx={{ flexShrink: 0 }}>Sales By Category</Typography>
                            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                                <ReactECharts
                                    option={makePieOption(chartData.salesByCategory, categoryColors)}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                {/* SubCategory table */}
                <Box sx={{ flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>
                    <SalesTable title="Sales By Sub Category" colLabel="Sub Category" items={chartData.salesBySubCategory} theme={theme} />
                </Box>
                {/* Segment pie */}
                <Box sx={{ flex: 1, minWidth: 0, height: "100%" }}>
                    <Card sx={{ ...cardSx, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <CardContent sx={{ p: "12px !important", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", "&:last-child": { pb: "12px" } }}>
                            <Typography mb={1} fontWeight="bold" sx={{ flexShrink: 0 }}>Sales By Segment</Typography>
                            <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
                                <ReactECharts
                                    option={makePieOption(chartData.salesBySegment, categoryColors)}
                                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

        </Box>
    );
};

export default Dashboard;