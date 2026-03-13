import { Check } from "lucide-react";

export function LoginSuccessAlert() {
  return (
    <div className="flex self-center w-full max-w-82 items-center gap-2 rounded-lg bg-[#353F3D] p-3 text-white shadow-2xl ring-1 ring-white/10 overflow-hidden">
      <div className="flex size-8 items-center justify-center rounded-full bg-[#4CAF50]/30 shadow-[0_20px_80px_17px_rgba(0,255,0,0.3)] ">
        <Check className="size-5 text-green-500" strokeWidth={2.5} />
      </div>

      <h3 className="text-sm font-semibold leading-tight tracking-tight">
        Sign in success
      </h3>
    </div>
  );
}
