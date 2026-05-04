import API_URL from "../config/api"; 
fetch(`${API_URL}/api/login`)

async function login(email, password) {
  const res = await fetch(`${API_URL}/api/login`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}
