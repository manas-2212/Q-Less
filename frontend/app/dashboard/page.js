"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import DashboardCard from "../../components/DashboardCard";

import "../../styles/dashboard.css";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </header>
        <section className="dashboard-grid">
          <DashboardCard title="Active Queues" value="0" />
          <DashboardCard title="People Waiting" value="0" />
          <DashboardCard title="Total Served" value="0" />
        </section>

      </main>
    </ProtectedRoute>
  );
}

// not in use //