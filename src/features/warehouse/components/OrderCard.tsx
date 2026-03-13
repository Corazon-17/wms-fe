import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";

type OrderCardProps = {
  title: string;
  value?: number;
  description: string;
  status: "up" | "down";
};

export function OrderCard(props: OrderCardProps) {
  return (
    <div className="flex flex-col gap-1 justify-center w-full h-25 border rounded-md px-4 py-1">
      <span className="text-xs mb-1.5 text-neutral-500">{props.title}</span>
      <span className="text-xl font-bold">{props.value}</span>
      <div
        className={cn(
          "flex gap-1 items-center clear-start text-xs",
          props.status === "up" ? "text-green-500" : "text-red-500",
        )}
      >
        <ArrowUpIcon
          className={cn("size-4", props.status === "down" && "rotate-180")}
        />{" "}
        {props.description}
      </div>
    </div>
  );
}
