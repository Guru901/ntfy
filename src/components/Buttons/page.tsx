"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { Button } from "../ui/button";

export function HeroButtons() {
  const { user } = useUserStore();

  return (
    <>
      {user._id.length === 0 && (
        <div className="flex gap-2 items-center z-20 mt-6">
          <Link href={"/login"}>
            <Button className="min-w-44 text-md">Login</Button>
          </Link>
          <Link href={"/signup"}>
            <Button variant={"outline"} className="text-white min-w-44 text-md">
              Register
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export function NavButtons() {
  const { user } = useUserStore();

  return user._id.length > 0 ? (
    <div>
      <Link href={"/tasks"}>
        <Button>Go To Dashboard</Button>
      </Link>
    </div>
  ) : (
    <div className="flex gap-4">
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant={"outline"} className="text-white">
          Signup
        </Button>
      </Link>
    </div>
  );
}
