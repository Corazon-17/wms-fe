import { X } from "lucide-react";

type LoginErrorAlertProps = {
  onCloseButtonClick?: () => void;
};

export function LoginErrorAlert(props: LoginErrorAlertProps) {
  return (
    <div className="flex self-center w-full max-w-82 items-center gap-2 rounded-lg bg-[#353F3D] p-3 text-white shadow-2xl ring-1 ring-white/10 overflow-hidden">
      <div className="flex size-8 items-center justify-center rounded-full bg-[#E52A34]/30 shadow-[0_20px_80px_17px_rgba(255,0,0,0.8)] ">
        <X className="size-5 text-red-500" strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold leading-tight tracking-tight">
          Can't Sign In
        </h3>
        <p className="text-xs text-gray-300">
          The email or password you entered is incorrect
        </p>
      </div>

      <button
        type="button"
        className="shrink-0 text-white self-start"
        onClick={() => props.onCloseButtonClick?.()}
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
