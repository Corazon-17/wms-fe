import { cn } from "../lib/utils";

export default function Logo() {
  return (
    <div className="grid place-content-center size-12 rounded-lg bg-white">
      <div className="grid grid-cols-2 gap-1">
        {Array(4)
          .fill(null)
          .map((_, idx) => {
            return (
              <div
                key={idx}
                className={cn(
                  "bg-primary size-4 rounded-xs",
                  idx === 3 ? "bg-surface" : "bg-primary",
                )}
              />
            );
          })}
      </div>
    </div>
  );
}
