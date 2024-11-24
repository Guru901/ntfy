"use client";

import React from "react";
import { AddQuesCount } from "./addQuesCount";
import { GetQuesCount } from "./getQuesCount";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function QuesCount() {
  const { user } = useUserStore();

  if (user.wantQuesCount === false) {
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">You are not allowed to see this</h1>
        <p className="text-xl">
          Go in the settings and allow ques count to see this page
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/tasks">
            <Button className="w-full">Go to Home</Button>
          </Link>
          <Button variant={"outline"} className="w-full">
            Go to Settings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-10  flex-col ">
        <div className="flex gap-3  flex-col justify-center">
          <h1 className="text-2xl">Daily Question Target : 90</h1>
          <p className="text-sm">
            Enter the no of questions you have solved today
          </p>
        </div>
        <AddQuesCount />
      </div>
      <div className="flex flex-col gap-2">
        <h1>No of Questions solved in this week</h1>
        <GetQuesCount />
      </div>
    </>
  );
}
