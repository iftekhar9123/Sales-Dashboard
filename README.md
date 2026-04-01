# Sales Dashboard

A full-stack **Sales Analytics Dashboard** built with React + TypeScript and Node.js + Express. It lets you explore sales data filtered by state and date range, with interactive charts, KPI cards, and a dark/light theme toggle.

---

## Preview

> **Dark Mode**
> ![Dashboard Dark Mode](https://placehold.co/900x500?text=Dashboard+Dark+Mode)

> **Light Mode**
> ![Dashboard Light Mode](https://placehold.co/900x500?text=Dashboard+Light+Mode)

*(Replace the above placeholders with real screenshots after running the app)*

---

## Features

| Feature | Description |
|---------|-------------|
| 📊 Sales by City | Horizontal bar chart showing top 10 cities by sales |
| 📦 Sales by Product | Top 10 products ranked by revenue |
| 🥧 Sales by Category & Segment | Donut pie charts with color coding |
| 📋 Sales by Sub-Category | Table view with highlighted values |
| 💰 KPI Cards | Total Sales, Profit, Quantity Sold, Discount % |
| 🌗 Theme Toggle | Switch between dark and light mode |
| 📅 Filters | Filter by US State + custom date range |
| 🔀 Navigation | Sidebar with Sales Overview, Stores, Notifications, Settings |

---

## Prerequisites

Before you begin, make sure you have installed:

- [Node.js](https://nodejs.org/) **v16 or higher**
- **npm v8 or higher**

Verify with:
```bash
node -v
npm -v
```

---

## Environment Variables

The backend uses a `.env` file for configuration. A sample file is provided at `backend/.env.example`.

### Setup

```bash
cd backend
cp .env.example .env
```

### `backend/.env.example`

```env
PORT=5000
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Port on which the Express backend server runs |

> The frontend connects to `http://localhost:5000` by default. If you change the port, update `frontend/src/services/api.ts` accordingly.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/iftekhar9123/Sales-Dashboard.git
cd Sales-Dashboard
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

✅ Backend will run at: **http://localhost:5000**

### 3. Start the Frontend

Open a **new terminal**, then:

```bash
cd frontend
npm install
npm start
```

✅ App will open at: **http://localhost:3000**

> ⚠️ Both backend and frontend must be running simultaneously for the app to work.

---

## How to Use

1. Open **http://localhost:3000** in your browser
2. Select a **State** from the dropdown in the top filter bar
3. The **date range** auto-fills with min/max dates for that state
4. Adjust the **From Date** / **To Date** if needed
5. All charts and KPI cards update automatically
6. Click the **moon/sun icon** in the sidebar to toggle dark/light mode
7. Use the **sidebar** to navigate between pages

---

## Project Structure

```
dashboard-app/
├── backend/
│   ├── Controllers/
│   │   └── dashboardController.js   # Handles HTTP requests/responses
│   ├── routes/
│   │   └── dashboardRoute.js        # API route definitions
│   ├── services/
│   │   └── dashboardService.js      # Core business logic
│   ├── utils/
│   │   ├── constants.js             # Shared message constants
│   │   └── responseHandler.js       # Unified success/error responses
│   ├── sales.json                   # Source data (Superstore dataset)
│   ├── server.js                    # Express app entry point
│   └── package.json
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Cards.tsx            # KPI summary cards
        │   ├── Dashboard.tsx        # Charts & tables
        │   └── Filters.tsx          # State & date pickers
        ├── context/
        │   └── ThemeContext.tsx     # Dark/Light theme provider
        ├── layout/
        │   ├── Layout.tsx           # App shell layout
        │   ├── Topbar.tsx           # Top header
        │   └── Sidebar.tsx          # Navigation sidebar
        ├── pages/
        │   ├── StorePage.tsx
        │   ├── NotificationsPage.tsx
        │   └── SettingsPage.tsx
        ├── services/
        │   └── api.ts               # Axios API calls
        ├── App.tsx
        └── index.tsx
```

---

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Query Params | Description |
|--------|----------|--------------|-------------|
| GET | `/states` | — | Returns list of all states |
| GET | `/date-range` | `state` | Returns min & max order dates for a state |
| GET | `/statistics` | `state`, `fromDate`, `toDate` | Returns KPI totals |
| GET | `/chart-data` | `state`, `fromDate`, `toDate` | Returns all chart data |

**Example:**
```
GET http://localhost:5000/api/chart-data?state=California&fromDate=2016-01-01&toDate=2019-12-31
```

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, TypeScript, MUI v7, Apache ECharts, Day.js, Axios |
| Backend | Node.js, Express.js, CORS, dotenv |
| Data | JSON flat-file (Superstore sales dataset) |

---

## Troubleshooting

**Charts not loading / blank dashboard?**
- Make sure the backend is running on port 5000
- Check browser console for CORS or network errors

**`Cannot find module` errors on frontend?**
- Delete `frontend/node_modules/.cache` and restart: `npm start`

**Port already in use?**
- Backend: change port in `backend/.env` → `PORT=5001`
- Frontend: React will prompt to use another port automatically
