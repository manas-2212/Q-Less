const API_BASE_URL = "https://q-less-gh3z.onrender.com/api";



export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const signupUser = async (name, email, password, role) => {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};



export const createQueue = async (token, name) => {
  const res = await fetch(`${API_BASE_URL}/queues/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });

  if (!res.ok) throw new Error("Failed to create queue");
  return res.json();
};

export const callNextCustomer = async (token, queueId) => {
  const res = await fetch(`${API_BASE_URL}/queues/call-next`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ queueId })
  });

  if (!res.ok) throw new Error("Failed to call next customer");
  return res.json();
};

export const getBusinessQueues = async (token) => {
  const res = await fetch(`${API_BASE_URL}/queues/business`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch business queues");
  return res.json();
};



export const getAllQueues = async (token) => {
  const res = await fetch(`${API_BASE_URL}/queues`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch queues");
  return res.json();
};

export const joinQueue = async (token, queueId) => {
  const res = await fetch(`${API_BASE_URL}/queues/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ queueId })
  });

  if (!res.ok) throw new Error("Failed to join queue");
  return res.json();
};

export const getMyQueueStatus = async (token, queueId) => {
  const res = await fetch(`${API_BASE_URL}/queues/${queueId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to get queue status");
  return res.json();
};
