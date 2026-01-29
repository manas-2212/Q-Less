"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Button from "../../../components/Button/Button";
import DashboardCard from "../../../components/DashboardCard";

import { useAuth } from "../../../context/AuthContext";
import {
  createQueue,
  callNextCustomer,
  getBusinessQueues
} from "../../../lib/api";

import "../../../styles/dashboard.css";

export default function BusinessDashboard() {
  const { token, logout } = useAuth();

  const [queues, setQueues] = useState([]);
  const [queueName, setQueueName] = useState("");
  const [loading, setLoading] = useState(false);


  console.log("Business token:", token);

  useEffect(() => {
    if (!token) return;

    const fetchQueues = async () => {
      try {
        const data = await getBusinessQueues(token);
        setQueues(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQueues();
  }, [token]);


  const handleCreateQueue = async () => {
    if (!queueName.trim()) return;

    setLoading(true);
    try {
      const newQueue = await createQueue(token, queueName);
      setQueues(prev => [newQueue, ...prev]);
      setQueueName("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCallNext = async (queueId) => {
    try {
      await callNextCustomer(token, queueId);
      alert("Next customer called");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <main className="dashboard">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Business Dashboard</h1>
          <Button onClick={logout}>Logout</Button>
        </header>

        {/* Create Queue */}
        <section className="dashboard-grid">
          <DashboardCard
            title="Create New Queue"
            value={
              <div>
                <input
                  type="text"
                  placeholder="Queue name"
                  value={queueName}
                  onChange={(e) => setQueueName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.6rem"
                  }}
                />
                <Button onClick={handleCreateQueue} disabled={loading}>
                  {loading ? "Creating..." : "Create Queue"}
                </Button>
              </div>
            }
          />
        </section>

        {/* Existing Queues */}
        <section className="dashboard-grid" style={{ marginTop: "2rem" }}>
          {queues.map(queue => (
            <DashboardCard
              key={queue.id}
              title={queue.name}
              value={
                <Button onClick={() => handleCallNext(queue.id)}>
                  Call Next
                </Button>
              }
            />
          ))}
        </section>
      </main>
    </ProtectedRoute>
  );
}
