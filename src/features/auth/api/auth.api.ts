import { axiosClient } from "@/lib/axios";
import type { AuthResponse, LoginPayload, UserData } from "../types/auth.type";

export const loginWithEmailAndPassword = (
  data: LoginPayload,
): Promise<AuthResponse> => {
  return axiosClient.post("/auth/login", data);
};

export const logout = (): Promise<null> => {
  return axiosClient.post("/auth/logout");
};

export const loggedUserData = (): Promise<UserData> => {
  return axiosClient.get("/auth/me");
};
