# Sales Dashboard App

A full-stack sales analytics dashboard built with **React + TypeScript** (frontend) and **Node.js + Express** (backend).

---

## Project Structure

```
dashboard-app/
├── backend/                        # Express REST API (port 5000)
│   ├── Controllers/
│   │   └── dashboardController.js  # Business logic
│   ├── routes/
│   │   └── dashboardRoute.js       # API routes
│   ├── utils/
│   │   ├── constants.js            # Shared constants
│   │   └── responseHandler.js      # Unified response helpers
│   ├── sales.json                  # Sales dataset
│   ├── server.js                   # Entry point
│   └── package.json
└── frontend/                       # React + TypeScript app (port 3000)
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Cards.tsx           # KPI summary cards
    │   │   ├── Dashboard.tsx       # Main dashboard with charts
    │   │   └── Filters.tsx         # State & date filters
    │   ├── context/
    │   │   └── ThemeContext.tsx    # Dark/Light theme provider
    │   ├── layout/
    │   │   ├── Layout.tsx          # App shell
    │   │   ├── Topbar.tsx          # Top navigation bar
    │   │   └── Sidebar.tsx         # Collapsible sidebar
    │   ├── pages/
    │   │   ├── StorePage.tsx
    │   │   ├── NotificationsPage.tsx
    │   │   └── SettingsPage.tsx
    │   ├── services/
    │   │   └── api.ts              # Axios API calls
    │   ├── App.tsx
    │   └── index.tsx
    └── package.json
```

---

## Features

- 📊 Sales by City — horizontal bar chart with color intensity
- 📦 Sales by Product & Sub-Category — styled table view
- 🥧 Sales by Category & Segment — donut pie charts
- 💰 KPI Cards — Total Sales, Profit, Quantity, Discount
- 🌗 Dark / Light theme toggle
- 📅 Date range & state filters
- 📱 Collapsible sidebar navigation
- 🔔 Navigation pages: Sales Overview, Stores, Notifications, Settings

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iftekhar9123/Sales-Dashboard.git
cd Sales-Dashboard
```

### 2. Setup & Run Backend

```bash
cd backend
npm install
npm start
```

Backend server runs at: **http://localhost:5000**

### 3. Setup & Run Frontend

Open a **new terminal tab**, then:

```bash
cd frontend
npm install
npm start
```

Frontend app runs at: **http://localhost:3000**

> Make sure both backend and frontend are running at the same time.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/states` | Get all available states |
| GET | `/api/date-range?state=California` | Get min/max date range for a state |
| GET | `/api/statistics?state=California&fromDate=2016-01-01&toDate=2019-12-31` | Get KPI statistics |
| GET | `/api/chart-data?state=California&fromDate=2016-01-01&toDate=2019-12-31` | Get all chart data |

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, TypeScript, MUI v7, Apache ECharts, Day.js, Axios |
| Backend | Node.js, Express.js, CORS |
| Data | JSON flat-file (sales.json) |
