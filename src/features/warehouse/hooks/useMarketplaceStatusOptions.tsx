import type { Option } from "@/types";
import { useMemo } from "react";
import { useMarketplaceStatuses } from "../queries/order.query";
import { formatStatusLabel } from "../utils/utils";

export default function useMarketplaceStatusOptions(enabled: boolean = false) {
  const { data: marketplaceStatuses } = useMarketplaceStatuses(enabled);
  const marketplaceStatusOptions: Option[] = useMemo(() => {
    if (marketplaceStatuses) {
      return marketplaceStatuses.map((status) => ({
        label: formatStatusLabel(status),
        value: status,
      }));
    }

    return [];
  }, [marketplaceStatuses]);

  return marketplaceStatusOptions;
}
