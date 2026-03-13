import { cn } from "@/lib/utils";
import { formatStatusLabel, getStatusStyle } from "../utils/utils";

type StatusProps = {
  id: string;
  label?: string;
};

export default function OrderStatus(props: StatusProps) {
  return (
    <div className="flex w-full justify-center">
      <div
        className={cn("px-2.5 py-1.5 w-max rounded", getStatusStyle(props.id))}
      >
        {props.label || formatStatusLabel(props.id)}
      </div>
    </div>
  );
}
