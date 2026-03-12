import { axiosClient } from "@/lib/axios";
import type { Response } from "@/types/request";
import type {
  Order,
  OrderItem,
  OrderListResponse,
  OrderQueryParams,
} from "../types/order.type";

export const getOrders = (
  params: OrderQueryParams,
): Promise<Response<OrderListResponse>> => {
  return axiosClient.get("/orders", { params });
};

export const getOrder = (orderSN: string): Promise<Response<Order>> => {
  return axiosClient.get(`/orders/${orderSN}`);
};

export const getOrderItems = (
  orderSN: string,
): Promise<Response<OrderItem>[]> => {
  return axiosClient.get(`/orders/${orderSN}/items`);
};

export const syncOrders = () => {
  return axiosClient.post("/orders/sync");
};

export const pickOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/pick`);
};

export const packOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/pack`);
};

export const shipOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/ship`);
};
