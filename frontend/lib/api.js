const API_BASE_URL = "http://localhost:5001/api";

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
};

export const signupUser = async (name, email, password, role) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    });
  
    if (!res.ok) {
      throw new Error("Signup failed");
    }
  
    return res.json();
  };
  