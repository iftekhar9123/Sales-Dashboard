const { successResponse, errorResponse } = require("../utils/responseHandler.js");
const CONSTANT = require("../utils/constants.js");
const dashboardService = require("../services/dashboardService.js");

exports.getAllStates = (req, res) => {
    try {
        const states = dashboardService.getAllStates();
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.STATES_RETRIEVED, { states }, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.STATES_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.STATES_RETRIEVED_FAILED, 500);
    }
};

exports.getMinMaxDates = (req, res) => {
    try {
        const { state } = req.query;
        const result = dashboardService.getMinMaxDates(state);
        if (!result) return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.DATE_RANGE_RETRIEVED, result, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.DATE_RANGE_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.DATE_RANGE_RETRIEVED_FAILED, 500);
    }
};

exports.getDashboardStatistics = (req, res) => {
    try {
        const { state, fromDate, toDate, customerId } = req.query;
        if (!fromDate || !toDate) {
            return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.FROM_TO_DATE_REQUIRED, 400);
        }
        const result = dashboardService.getDashboardStatistics(state, fromDate, toDate, customerId);
        if (!result) return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.DASHBOARD_STATS_RETRIEVED, result, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.DASHBOARD_STATS_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.DASHBOARD_STATS_RETRIEVED_FAILED, 500);
    }
};

exports.getChartData = (req, res) => {
    try {
        const { state, fromDate, toDate } = req.query;
        if (!state) return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 400);
        if (!fromDate || !toDate) return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.FROM_TO_DATE_REQUIRED, 400);
        const result = dashboardService.getChartData(state, fromDate, toDate);
        if (!result) return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.NO_DATA_FOUND, 404);
        return successResponse(res, CONSTANT.SALES_DASHBOARD.SUCCESS.CHART_DATA_RETRIEVED, result, 200);
    } catch (error) {
        console.error(CONSTANT.SALES_DASHBOARD.ERROR.CHART_DATA_RETRIEVED_FAILED, error);
        return errorResponse(res, CONSTANT.SALES_DASHBOARD.ERROR.CHART_DATA_RETRIEVED_FAILED, 500);
    }
};