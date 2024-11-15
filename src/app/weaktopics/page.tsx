import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Form from "./form";
import { getWeakTopics } from "@/lib/getWeakTopics";

export default async function QuesCount() {
  const {
    mathWeakTopics,
    physicsWeakTopics,
    chemistryWeakTopics,
  } = await getWeakTopics()


  return (
    <div className="flex flex-col p-5 md:p-10 gap-20">
      <div className="flex gap-5 flex-col ">
        <div className="flex gap-3 flex-col justify-center">
          <h1 className="text-2xl">Weak Topics</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Form />
          <h1>Enter the topics you are not good at</h1>
          <div className="flex flex-col gap-2 md:flex-row">
            <DataTable columns={columns} data={mathWeakTopics} />
            <DataTable columns={columns} data={physicsWeakTopics} />
            <DataTable columns={columns} data={chemistryWeakTopics} />
          </div>
        </div>
      </div>
    </div>
  );
}
