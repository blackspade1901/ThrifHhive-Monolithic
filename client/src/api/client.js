const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

/**
 * Every network call in the app goes through this function. Components and
 * hooks never call fetch() directly — they call functions in api/items.js
 * or api/orders.js, which call this. That keeps error handling, base URL,
 * and response-shape parsing in exactly one place.
 */
async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const message = payload?.error?.message ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body })
};
