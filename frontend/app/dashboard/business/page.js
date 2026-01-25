"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button/Button";
import "../../../styles/dashboard.css";
import DashboardCard from "../../../components/DashboardCard";

export default function BusinessDashboard() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Business Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </header>

        <section className="dashboard-grid">
            <DashboardCard title="Active Queues" value="0" />
            <DashboardCard title="People Waiting" value="0" />
            <DashboardCard title="Served Today" value="0" />
        </section>

      </main>
    </ProtectedRoute>
  );
}
