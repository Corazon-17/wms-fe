import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { packOrder, pickupOrder, shipOrder } from "../api/order.api";

export const usePickupOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => pickupOrder(orderSN),
    onSuccess: (res, orderSN) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderSN] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response?.data.error);
    },
  });
};

export const usePackOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => packOrder(orderSN),
    onSuccess: (res, orderSN) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderSN] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response?.data.error);
    },
  });
};

export const useShipOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderSN: string) => shipOrder(orderSN),
    onSuccess: (res, orderSN) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderSN] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.response?.data.error);
    },
  });
};
