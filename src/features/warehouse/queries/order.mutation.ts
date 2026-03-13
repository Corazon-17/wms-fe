import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  packOrder,
  pickupOrder,
  shipOrder,
  syncOrders,
} from "../api/order.api";

export const useSyncOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => syncOrders(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const usePickupOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => pickupOrder(orderSN),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const usePackOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => packOrder(orderSN),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useShipOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => shipOrder(orderSN),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
