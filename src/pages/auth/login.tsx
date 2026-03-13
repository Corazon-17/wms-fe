import { Logo } from "@/components";
import { LoginErrorAlert } from "@/features/auth/components/LoginErrorAlert";
import LoginForm from "@/features/auth/components/LoginForm";
import { LoginSuccessAlert } from "@/features/auth/components/loginSuccessAlert";
import { useState } from "react";

export default function Login() {
  const [loginStatus, setLoginStatus] = useState<"success" | "error" | null>(
    null,
  );

  return (
    <div className="grid lg:grid-cols-2 w-full min-h-screen">
      <LeftSection />

      <div className="grid place-items-center w-full min-h-screen p-4">
        <div className="flex flex-col gap-10 w-full max-w-123">
          {loginStatus === "error" && (
            <LoginErrorAlert onCloseButtonClick={() => setLoginStatus(null)} />
          )}
          {loginStatus === "success" && <LoginSuccessAlert />}

          <div className="flex flex-col gap-2">
            <span className="text-3xl md:text-5xl font-bold">Welcome Back</span>
            <p>Sign in to your account to continue</p>
          </div>

          <LoginForm
            onSuccess={() => setLoginStatus("success")}
            onError={() => setLoginStatus("error")}
          />
        </div>
      </div>
    </div>
  );
}

const LeftSection = () => {
  return (
    <div className="hidden lg:grid place-content-center w-full bg-primary text-white">
      <div className="flex flex-col gap-4 max-w-107">
        <Logo className="mb-10" expand />
        <span className="mt-10">WMS DASHBOARD</span>
        <div className="flex flex-col gap-4 text-5xl font-bold">
          <span>Manage your</span>
          <span>order with</span>
          <span>clarity.</span>
        </div>
        <p className="font-semibold mt-4">
          Track orders, manage orders, and streamline operations — all in one
          place.
        </p>
      </div>
    </div>
  );
};
