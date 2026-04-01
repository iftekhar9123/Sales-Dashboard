import { useState, useCallback } from "react";
import Layout from "./layout/Layout";
import Dashboard from "./components/Dashboard";
import StorePage from "./pages/StorePage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import { AppThemeProvider } from "./context/ThemeContext";

function App() {
  const [filters, setFilters] = useState<any>({});
  const [activePage, setActivePage] = useState("Sales Overview");

  const handleFilterChange = useCallback((f: any) => setFilters(f), []);

  const renderPage = () => {
    switch (activePage) {
      case "Stores": return <StorePage />;
      case "Notifications": return <NotificationsPage />;
      case "Settings": return <SettingsPage />;
      default: return <Dashboard filters={filters} />;
    }
  };

  return (
    <AppThemeProvider>
      <Layout
        onFilterChange={handleFilterChange}
        activePage={activePage}
        onPageChange={setActivePage}
        showFilters={activePage === "Sales Overview"}
      >
        {renderPage()}
      </Layout>
    </AppThemeProvider>
  );
}

export default App;