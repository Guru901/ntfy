import React from "react";
import { getFiles } from "./getFiles";
import Image from "next/image";

export default async function Questions({ searchParams }: { searchParams: any }) {

  await searchParams

  const folderId = searchParams.id as string

  const { data: questions, error } = await getFiles(folderId)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!questions) {
    return <div>No questions found</div>
  }

  return (
    <>
      {Array.isArray(questions) && questions.map((x: string) => (
        <Image
          width={400}
          height={300}
          src={x}
          className="w-full object-cover rounded-md"
          key={x}
          alt="Question"
        />
      ))}

    </>
  )

}
