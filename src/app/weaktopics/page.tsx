import React from "react";
import Form from "./form";
import { GetWeakTopics } from "./getWeakTopics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weak Topics",
};
export default async function QuesCount() {
  return (
    <div className="flex flex-col p-5 md:p-10 gap-20">
      <div className="flex gap-5 flex-col ">
        <div className="flex gap-3 flex-col justify-center">
          <h1 className="text-2xl">Weak Topics</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Form />
          <h1>Enter the topics you are not good at</h1>
          <GetWeakTopics />
        </div>
      </div>
    </div>
  );
}
