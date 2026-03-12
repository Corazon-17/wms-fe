import { cn } from "../lib/utils";

type LogoProps = {
  expand?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Logo({ size = "lg", ...props }: LogoProps) {
  const sizes = {
    sm: {
      parent: "size-8",
      child: "size-2",
      text: "text-xl",
    },
    md: {
      parent: "size-10",
      child: "size-2.75",
      text: "text-2xl",
    },
    lg: {
      parent: "size-12",
      child: "size-4",
      text: "text-4xl",
    },
  };

  return (
    <div className={cn("flex gap-2 items-center", props.className)}>
      <div
        className={cn(
          "grid place-content-center bg-white",
          sizes[size].parent,
          size === "lg" ? "rounded-lg" : "rounded-md",
        )}
      >
        <div className="grid grid-cols-2 gap-1">
          {Array(4)
            .fill(null)
            .map((_, idx) => {
              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-primary rounded-xs",
                    sizes[size].child,
                    idx === 3 ? "bg-surface" : "bg-primary",
                  )}
                />
              );
            })}
        </div>
      </div>
      {props.expand && <span className={cn(sizes[size].text)}>WMSpaceIO</span>}
    </div>
  );
}
