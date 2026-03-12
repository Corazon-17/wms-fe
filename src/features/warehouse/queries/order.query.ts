import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrderItems, getOrders } from "../api/order.api";
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
    queryFn: () => getOrder(orderSN),
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
