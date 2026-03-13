import type { Option } from "@/types";
import { useMemo } from "react";
import { useShippingStatuses } from "../queries/order.query";
import { formatStatusLabel } from "../utils/utils";

export default function useShippingStatusOptions(enabled: boolean = false) {
  const { data: shippingStatuses } = useShippingStatuses(enabled);
  const shippingStatusOptions: Option[] = useMemo(() => {
    if (shippingStatuses) {
      return shippingStatuses.map((status) => ({
        label: formatStatusLabel(status),
        value: status,
      }));
    }

    return [];
  }, [shippingStatuses]);

  return shippingStatusOptions;
}
