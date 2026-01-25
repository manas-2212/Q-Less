"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button/Button";
import "../../../styles/dashboard.css";
import DashboardCard from "../../../components/DashboardCard";

export default function CustomerDashboard() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Customer Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </header>

        <section className="dashboard-grid">
            <DashboardCard title="Active Queue" value="—" />
            <DashboardCard title="Position" value="—" />
            <DashboardCard title="Estimated Time" value="—" />
        </section>

      </main>
    </ProtectedRoute>
  );
}
