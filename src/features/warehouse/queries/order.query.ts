import { useQuery } from "@tanstack/react-query";
import {
  getMarketplaceStatuses,
  getOrder,
  getOrderItems,
  getOrders,
  getShippingStatuses,
  getWMSStatuses,
} from "../api/order.api";
import type { OrderQueryParams } from "../types/order.type";

export const useOrders = (params: OrderQueryParams) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params).then((res) => res.data),
  });
};

export const useOrder = (orderSN: string) => {
  return useQuery({
    queryKey: ["order", orderSN],
    queryFn: () => getOrder(orderSN).then((res) => res.data),
    enabled: !!orderSN,
  });
};

export const useOrderItems = (orderSN: string) => {
  return useQuery({
    queryKey: ["order-items", orderSN],
    queryFn: () => getOrderItems(orderSN),
    enabled: !!orderSN,
  });
};

export const useWMSStatuses = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["wms-statuses"],
    queryFn: () => getWMSStatuses().then((res) => res.data),
    enabled: enabled,
  });
};

export const useMarketplaceStatuses = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["marketplace-statuses"],
    queryFn: () => getMarketplaceStatuses().then((res) => res.data),
    enabled: enabled,
  });
};

export const useShippingStatuses = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["shipping-statuses"],
    queryFn: () => getShippingStatuses().then((res) => res.data),
    enabled: enabled,
  });
};
