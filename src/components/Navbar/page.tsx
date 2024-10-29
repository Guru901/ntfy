"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

export default function Navbar() {
  const { setUser, user } = useUserStore();

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

  const links = [
    { name: "Tasks", href: "/" },
    { name: "Questions", href: "/questions" },
    { name: "QuesCount", href: "/quescount" },
    { name: "Weak Topics", href: "/weaktopics" },
  ];

  return (
    <div className="flex justify-between px-4 p-2 items-center">
      <div className="flex gap-12">
        <h1 className="text-2xl pl-4 font-bold">NTFY</h1>
        <div className="flex gap-7 font-medium items-center">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex">
        {user?._id ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
