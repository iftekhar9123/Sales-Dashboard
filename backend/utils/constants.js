const CONSTANTS = {
    FIELD_NAME: {
        STATE: "State",
        ORDER_DATE: "Order Date",
        CUSTOMER_ID: "Customer ID"
    },
    SALES_DASHBOARD: {
        SUCCESS: {
            STATES_RETRIEVED: "States retrieved successfully",
            DATE_RANGE_RETRIEVED: "Date range retrieved successfully",
            DASHBOARD_STATS_RETRIEVED: "Dashboard statistics retrieved successfully",
            CHART_DATA_RETRIEVED: "Chart data retrieved successfully"
        },
        ERROR: {
            STATES_RETRIEVED_FAILED: "Failed to retrieve states",
            NO_DATA_FOUND: "No data found for the selected state",
            DATE_RANGE_RETRIEVED_FAILED: "Failed to retrieve date range",
            DASHBOARD_STATS_RETRIEVED_FAILED: "Failed to retrieve dashboard statistics",
            FROM_TO_DATE_REQUIRED: "fromDate and toDate are required",
            CHART_DATA_RETRIEVED_FAILED: "Failed to retrieve chart data"
        }
    }
};

module.exports = CONSTANTS;   