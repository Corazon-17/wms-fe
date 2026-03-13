import { axiosClient } from "@/lib/axios";
import type { Response } from "@/types/request";
import type {
  OrderDetail,
  OrderItem,
  OrderListResponse,
  OrderQueryParams,
  OrderSummaryResponse,
  WMSStatusResponse,
} from "../types/order.type";

export const getOrders = (
  params: OrderQueryParams,
): Promise<Response<OrderListResponse>> => {
  return axiosClient.get("/orders", { params });
};

export const getOrder = (orderSN: string): Promise<Response<OrderDetail>> => {
  return axiosClient.get(`/orders/${orderSN}`);
};

export const getWMSStatuses = (): Promise<Response<WMSStatusResponse[]>> => {
  return axiosClient.get(`/orders/wms-statuses`);
};

export const getMarketplaceStatuses = (): Promise<Response<string[]>> => {
  return axiosClient.get(`/orders/marketplace-statuses`);
};

export const getShippingStatuses = (): Promise<Response<string[]>> => {
  return axiosClient.get(`/orders/shipping-statuses`);
};

export const getOrderItems = (
  orderSN: string,
): Promise<Response<OrderItem>[]> => {
  return axiosClient.get(`/orders/${orderSN}/items`);
};

export const pickupOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/pick`);
};

export const packOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/pack`);
};

export const shipOrder = (orderSN: string) => {
  return axiosClient.post(`/orders/${orderSN}/ship`);
};

export const getOrderSummary = (): Promise<Response<OrderSummaryResponse>> => {
  return axiosClient.get("/api/orders/summary");
};
