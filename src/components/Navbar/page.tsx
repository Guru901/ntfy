"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import getLoggedInUser from "@/helpers/getLoggedInUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  interface User {
    _id: string;
  }

  const [loggedInUser, setLoggedInUser] = useState<User>({ _id: "" });
  async function setUser() {
    const user = await getLoggedInUser();
    setLoggedInUser(user);
  }

  async function handleLogout() {
    const { data } = await axios.post("/api/logout");
    if (data.success) {
      location.reload();
    }
  }

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="flex justify-between px-4 p-2 items-center">
      <div className="flex gap-12">
        <h1 className="text-2xl font-bold">NTFY</h1>
        <div className="flex gap-5 font-medium items-center">
          <Link href="/">Tasks</Link>
          <Link href="/questions">Questions</Link>
        </div>
      </div>
      <div className="flex">
        {loggedInUser?._id ? (
          <div className="flex gap-2">
            <Link href="/">
              <Button>Profile</Button>
            </Link>
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
