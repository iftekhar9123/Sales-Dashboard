const salesData = require("../sales.json");
const { successResponse, errorResponse } = require("../utils/responseHandler.js");
const CONSTANT = require("../utils/constants.js");

exports.getAllStates = (req, res) => {
    try {
        const states = [...new Set(salesData.map(item => item.State))];
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.STATES_RETRIEVED, { states }, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.STATES_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.STATES_RETRIEVED_FAILED, 500);
    }
}


exports.getMinMaxDates = (req, res) => {
    try {
        const { state } = req.query;
        const filteredData = salesData.filter(item => item.State === state);
        if (filteredData.length === 0) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        }
        const dates = filteredData.map(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.DATE_RANGE_RETRIEVED, { minDate, maxDate }, 200);
    }
    catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.DATE_RANGE_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.DATE_RANGE_RETRIEVED_FAILED, 500);
    }
}


exports.getDashboardStatistics = (req, res) => {
    try {
        const { state, fromDate, toDate, customerId } = req.query;
        let filteredData = salesData.filter(item => item.State === state);

        if (filteredData.length === 0) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        }

        if (!fromDate || !toDate) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.FROM_TO_DATE_REQUIRED, 400);
        }

        if (fromDate) {
            const from = new Date(fromDate);
            filteredData = filteredData.filter(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]) >= from);
        }
        if (toDate) {
            const to = new Date(toDate);
            filteredData = filteredData.filter(item => new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]) <= to);
        }
        if (customerId) {
            filteredData = filteredData.filter(item => item[CONSTANT.FIELD_NAME.CUSTOMER_ID] === customerId);
        }

        const totalSales = filteredData.reduce((sum, item) => sum + item.Sales, 0);
        const totalProfit = filteredData.reduce((sum, item) => sum + item.Profit, 0);
        const totalQuantity = filteredData.reduce((sum, item) => sum + item.Quantity, 0);
        const totalDiscountValue = filteredData.reduce((sum, item) => sum + (item.Sales * item.Discount), 0);
        const discountPercentage = totalSales ? (totalDiscountValue / totalSales) * 100 : 0;

        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.DASHBOARD_STATS_RETRIEVED, {
            totalSales: Number(totalSales.toFixed(2)),
            totalProfit: Number(totalProfit.toFixed(2)),
            totalQuantity,
            discountPercentage: Number(discountPercentage.toFixed(2))
        }, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.DASHBOARD_STATS_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.DASHBOARD_STATS_RETRIEVED_FAILED, 500);
    }
}

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

exports.getChartData = (req, res) => {
    try {
        const { state, fromDate, toDate } = req.query;

        if (!state) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 400);
        }
        if (!fromDate || !toDate) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.FROM_TO_DATE_REQUIRED, 400);
        }

        let filteredData = salesData.filter(item => item.State === state);
        if (filteredData.length === 0) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);
        filteredData = filteredData.filter(item => {
            const d = new Date(item[CONSTANT.FIELD_NAME.ORDER_DATE]);
            return d >= from && d <= to;
        });

        const salesByCity = aggregateByField(filteredData, "City", 10);
        const salesByProduct = aggregateByField(filteredData, "Product Name", 10);
        const salesByCategory = aggregateByField(filteredData, "Category");
        const salesBySubCategory = aggregateByField(filteredData, "Sub-Category", 10);
        const salesBySegment = aggregateByField(filteredData, "Segment");

        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.CHART_DATA_RETRIEVED, {
            salesByCity,
            salesByProduct,
            salesByCategory,
            salesBySubCategory,
            salesBySegment,
        }, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.CHART_DATA_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.CHART_DATA_RETRIEVED_FAILED, 500);
    }
}