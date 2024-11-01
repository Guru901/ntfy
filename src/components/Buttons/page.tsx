"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { Button } from "../ui/button";
import axios from "axios";
import useGetUser from "@/helpers/getLoggedInUser";

export function HeroButtons() {
  const { error, user } = useGetUser();

  console.log(user);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {user._id.length === 0 ? (
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
      ) : (
        <div className="flex gap-2 items-center z-20 mt-6">
          <Link href={"/tasks"}>
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export function NavButtons() {
  const { error, user } = useGetUser();

  if (error) return <div>Error: {error}</div>;

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

export function FooterButtons() {
  const links = [
    {
      label: "Tasks",
      href: "/tasks",
    },
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "Ques Count",
      href: "/quescount",
    },
    {
      label: "Weak Topics",
      href: "/weaktopics",
    },
  ];

  const { error, user } = useGetUser();

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex gap-3 underline absolute right-10 bottom-8">
      {user._id.length > 0 ? (
        links.map((x) => (
          <Link key={x.label} href={x.href} className="opacity-50">
            {x.label}
          </Link>
        ))
      ) : (
        <>
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/signup"}>
            <Button variant={"outline"} className="text-white">
              Signup
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default function LogoutButton() {
  const { setUser } = useUserStore();

  async function handleLogout() {
    const { data } = await axios.post("/api/logout");

    setUser({
      _id: "",
      email: "",
      name: "",
    });

    if (data.success) {
      location.reload();
    }
  }
  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
