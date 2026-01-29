"use client";

import { useEffect, useState, useRef } from "react";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Button from "../../../components/Button/Button";
import DashboardCard from "../../../components/DashboardCard";
import BeingServed from "../../../components/BeingServed";

import { useAuth } from "../../../context/AuthContext";
import {
  getAllQueues,
  joinQueue,
  getMyQueueStatus
} from "../../../lib/api";

import "../../../styles/dashboard.css";

export default function CustomerDashboard() {
  const { token, logout } = useAuth();

  const [queues, setQueues] = useState([]);
  const [joinedQueueId, setJoinedQueueId] = useState(null);
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const pollingRef = useRef(null);

/* FETCH ALL QUEUES */
  useEffect(() => {
    if (!token) return;

    const fetchQueues = async () => {
      try {
        const data = await getAllQueues(token);
        setQueues(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQueues()
  }, [token])


  useEffect(() => {
    if (!joinedQueueId || !token || status === "CALLED") return;

    const pollStatus = async () => {
      try {
        const res = await getMyQueueStatus(token, joinedQueueId);
        setPosition(res.position);
        setStatus(res.status);
      } catch (err) {
        console.error("Polling failed", err);
      }
    };

    pollStatus();
    pollingRef.current = setInterval(pollStatus, 5000);

    return () => clearInterval(pollingRef.current);
  }, [joinedQueueId, token, status]);

  /* JOIN QUEUE*/
  const handleJoinQueue = async (queueId) => {
    setLoading(true);
    try {
      await joinQueue(token, queueId);
      setJoinedQueueId(queueId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ProtectedRoute>
      {status === "CALLED" ? (
        <BeingServed />
      ) : (
        <main className="dashboard">
          <header className="dashboard-header">
            <h1 className="dashboard-title">Customer Dashboard</h1>
            <Button onClick={logout}>Logout</Button>
          </header>

          {joinedQueueId && (
            <section className="dashboard-grid">
              <DashboardCard
                title="Queue Status"
                value={
                  status === "WAITING"
                    ? `Position ${position}`
                    : "—"
                }
              />
            </section>
          )}

          <section className="dashboard-grid" style={{ marginTop: "2rem" }}>
            {queues.map(queue => (
              <DashboardCard
                key={queue.id}
                title={queue.name}
                value={
                  <Button
                    onClick={() => handleJoinQueue(queue.id)}
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Queue"}
                  </Button>
                }
              />
            ))}
          </section>
        </main>
      )}
    </ProtectedRoute>
  );
}
