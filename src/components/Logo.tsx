import { cn } from "../lib/utils";

type LogoProps = {
  expand?: boolean;
};

export default function Logo(props: LogoProps) {
  return (
    <div className="flex gap-2 items-center mb-10">
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
      {props.expand && <span className="text-4xl">WMSpaceIO</span>}
    </div>
  );
}
