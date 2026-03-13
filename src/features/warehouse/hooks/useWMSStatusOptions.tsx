import type { Option } from "@/types";
import { useMemo } from "react";
import { useWMSStatuses } from "../queries/order.query";

export default function useWMSStatusOptions(enabled: boolean = false) {
  const { data: wmsStatuses } = useWMSStatuses(enabled);
  const wmsStatusOptions: Option[] = useMemo(() => {
    if (wmsStatuses) {
      return wmsStatuses.map((status) => ({
        label: status.name,
        value: status.id,
      }));
    }

    return [];
  }, [wmsStatuses]);

  return wmsStatusOptions;
}
