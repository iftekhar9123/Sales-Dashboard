const salesData = require("../sales.json");
const CONSTANT = require("../utils/constants.js");

// Helper: aggregate sales by a field key, returns sorted array [{name, value}]
function aggregateByField(data, fieldKey, topN = null) {
    const map = {};
    data.forEach(item => {
        const key = item[fieldKey] || "Unknown";
        map[key] = (map[key] || 0) + item.Sales;
    });
    let result = Object.entries(map)
        .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
        .sort((a, b) => b.value - a.value);
    if (topN) result = result.slice(0, topN);
    return result;
}

// Helper: filter sales data by state + date range
function filterData(state, fromDate, toDate, customerId = null) {
    let data = salesData.filter(item => item.State === state);
    if (fromDate) {
        const from = new Date(fromDate);
        data = data.filter(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]) >= from);
    }
    if (toDate) {
        const to = new Date(toDate);
        data = data.filter(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]) <= to);
    }
    if (customerId) {
        data = data.filter(item => item[CONSTANT.FIELD_NAME.CUSTOMER_ID] === customerId);
    }
    return data;
}

exports.getAllStates = () => {
    const states = [...new Set(salesData.map(item => item.State))];
    return states;
};

exports.getMinMaxDates = (state) => {
    const filteredData = salesData.filter(item => item.State === state);
    if (filteredData.length === 0) return null;

    const dates = filteredData.map(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    return { minDate, maxDate };
};

exports.getDashboardStatistics = (state, fromDate, toDate, customerId) => {
    const filteredData = filterData(state, fromDate, toDate, customerId);
    if (filteredData.length === 0) return null;

    const totalSales = filteredData.reduce((sum, item) => sum + item.Sales, 0);
    const totalProfit = filteredData.reduce((sum, item) => sum + item.Profit, 0);
    const totalQuantity = filteredData.reduce((sum, item) => sum + item.Quantity, 0);
    const totalDiscountValue = filteredData.reduce((sum, item) => sum + (item.Sales * item.Discount), 0);
    const discountPercentage = totalSales ? (totalDiscountValue / totalSales) * 100 : 0;

    return {
        totalSales: Number(totalSales.toFixed(2)),
        totalProfit: Number(totalProfit.toFixed(2)),
        totalQuantity,
        discountPercentage: Number(discountPercentage.toFixed(2)),
    };
};

exports.getChartData = (state, fromDate, toDate) => {
    const filteredData = filterData(state, fromDate, toDate);
    if (filteredData.length === 0) return null;

    return {
        salesByCity: aggregateByField(filteredData, "City", 10),
        salesByProduct: aggregateByField(filteredData, "Product Name", 10),
        salesByCategory: aggregateByField(filteredData, "Category"),
        salesBySubCategory: aggregateByField(filteredData, "Sub-Category", 10),
        salesBySegment: aggregateByField(filteredData, "Segment"),
    };
};
