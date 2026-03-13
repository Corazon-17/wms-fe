import google from "@/assets/google.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../queries/auth.mutation";
import { loginSchema, type LoginType } from "../schemas/auth.schema";

type LoginProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export default function LoginForm(props: LoginProps) {
  const { mutate, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "password",
    },
  });

  const onSubmit = (data: LoginType) => {
    mutate(data, {
      onSuccess: () => props.onSuccess?.(),
      onError: () => props.onError?.(),
    });
  };

  const handleGoogleLogin = () => {
    mutate({
      email: "admin@gmail.com",
      password: "password",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <FieldGroup className="gap-2">
        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <FieldError className="text-red-500">
              {errors.email.message}
            </FieldError>
          )}
        </Field>
        <div className="flex flex-col gap-1 mt-5">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <InputGroupAddon
                onClick={() => setShowPassword(!showPassword)}
                align="inline-end"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <FieldError className="text-red-500">
                {errors.password.message}
              </FieldError>
            )}
          </Field>
          <div className="flex w-full justify-between gap-2">
            <Field orientation="horizontal">
              <Checkbox id="remember-me" />
              <FieldLabel htmlFor="remember-me" className="font-normal">
                Remember me
              </FieldLabel>
            </Field>
            <Button variant="ghost" className="font-medium px-0">
              Forgot password?
            </Button>
          </div>
        </div>
        <Field className="mt-4">
          <Button type="submit" className="h-10" disabled={isPending}>
            {isPending ? <Spinner /> : "Sign in to Dashboard"}
          </Button>
        </Field>
        <div className="relative border-b w-full h-1 my-6">
          <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 bg-white text-neutral-500">
            or
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          className="h-10"
          onClick={handleGoogleLogin}
          disabled={isPending}
        >
          <img src={google} alt="google-logo" /> Continue with Google
        </Button>
        <div className="flex w-full justify-center items-center gap-1">
          <p className="text-neutral-500">Don't have an account? </p>
          <Button type="button" variant="link" className="px-0">
            Sign up for free
          </Button>
        </div>
        {isPending && <span>Pending</span>}
      </FieldGroup>
    </form>
  );
}
