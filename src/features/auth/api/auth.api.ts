import { axiosClient } from "@/lib/axios";
import type { Response } from "@/types/request";
import type { AuthResponse, LoginPayload } from "../types/auth.type";

export const loginWithEmailAndPassword = (
  data: LoginPayload,
): Promise<Response<AuthResponse>> => {
  return axiosClient.post("/auth/login", data);
};
