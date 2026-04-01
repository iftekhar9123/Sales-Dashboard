import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllStates = () => API.get("/states");
export const getMinMaxDates = (state: string) =>
  API.get(`/date-range?state=${state}`);

export const getDashboardStatistics = (params: any) =>
  API.get("/statistics", { params });

export const getChartData = (params: any) =>
  API.get("/chart-data", { params });