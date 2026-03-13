import "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    // This makes 'err' default to AxiosError in all hooks
    defaultError: AxiosError<{
      error: string;
      message?: string;
    }>;
  }
}
