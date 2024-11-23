import React from "react";
import { GetQuesCount } from "./getQuesCount";
import { AddQuesCount } from "./addQuesCount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions Count",
}

export default function QuesCount() {
  return (
    <div className="flex flex-col p-5 md:p-10 gap-20">
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
    </div>
  );
}
