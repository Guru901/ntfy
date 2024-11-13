"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginUser from "@/data-access/login";
import { useUserStore } from "@/store/userStore";
import { LoginSchema, TLoginSchema } from "@/lib/type";

export default function LoginForm() {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    const { success, error, user } = await LoginUser(data);

    if (error) {
      setError("root", { message: error });
    }

    if (success) {
      if (!user) return;

      setUser({
        _id: user._id,
        name: user?.name,
        email: user.email,
      });
      location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", {
              required: true,
            })}
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            {...register("password", {
              required: true,
            })}
            id="password"
            type="password"
            name="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
          )}
        </div>
        {errors.root && (
          <p className="text-red-500 text-sm">{`${errors.root.message}`}</p>
        )}
        {isSubmitting ? (
          <Button type="submit" className="w-full" disabled>
            <Loader2 className="mx-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </form>
  );
}
