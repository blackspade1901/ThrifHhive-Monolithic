import { apiClient } from "./client.js";

export const itemsApi = {
  list: (filters = {}) => {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    );
    const query = params.toString();
    return apiClient.get(`/items${query ? `?${query}` : ""}`);
  },

  getById: (id) => apiClient.get(`/items/${id}`),

  create: (itemData) => apiClient.post("/items", itemData)
};
