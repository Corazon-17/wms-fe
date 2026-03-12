import { useNavigate } from "react-router";

import type { Response } from "@/types/request";
import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../api/auth.api";
import type { AuthResponse, LoginPayload } from "../types/auth.type";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginWithEmailAndPassword(data),
    onSuccess: (res: Response<AuthResponse>) => {
      const accessToken = res.data.token;
      localStorage.setItem("token", accessToken);

      navigate("/dashboard/outbound");
    },
  });
};
