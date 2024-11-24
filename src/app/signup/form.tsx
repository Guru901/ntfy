"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignupSchema, TSignUpSchema } from "@/lib/type";
import RegisterUser from "@/data-access/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const { setUser } = useUserStore();

  const [error, setError] = useState("");

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const { success, error, user } = await RegisterUser(data);

    if (error) {
      setError(error);
      return;
    }

    if (success && user) {
      setUser({
        _id: user._id,
        username: user?.username,
        email: user.email,
        whatToTrack: user.whatToTrack,
        wantImages: user.wantImages,
        wantQuesCount: user.wantQuesCount,
        topic: user.topic,
      });

      push("/customize");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", {
                required: true,
              })}
              name="username"
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", { required: true })}
            id="password"
            type="password"
            name="password"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
        {!isSubmitting ? (
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        ) : (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </form>
  );
}
