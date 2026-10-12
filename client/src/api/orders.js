import { apiClient } from "./client.js";

export const ordersApi = {
  checkout: (orderData) => apiClient.post("/orders/checkout", orderData)
};
