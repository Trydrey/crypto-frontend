export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};