import { API_BASE_URL } from "../config/api";

export async function getCrypto() {
  const res = await fetch(`${API_BASE_URL}/crypto`);
  return await res.json();
}
export async function getGainers() {
  const res = await fetch(`${API_BASE_URL}/crypto/gainers`);
  return await res.json();
}
export async function getNewListings() {
  const res = await fetch(`${API_BASE_URL}/crypto/new`);
  return await res.json();
}
export async function addCrypto(data) {
  const res = await fetch(`${API_BASE_URL}/crypto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
}