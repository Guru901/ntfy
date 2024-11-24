"use client";

import useGetUser from "@/hooks/use-get-user";
import { QuestionsCount } from "@/lib/type";
import axios from "axios";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";

export function GetQuesCount() {
  const { user } = useGetUser();

  const [mathQuestions, setMathQuestions] = useState<QuestionsCount[]>([]);
  const [physicsQuestions, setPhysicsQuestions] = useState<QuestionsCount[]>(
    []
  );
  const [chemistryQuestions, setChemistryQuestions] = useState<
    QuestionsCount[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/getQuesCount");

        const subjectA: QuestionsCount[] = [];
        const subjectB: QuestionsCount[] = [];
        const subjectC: QuestionsCount[] = [];

        const formattedData = data.data.map((doc: any) => {
          const date = new Date(doc.createdAt);
          const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
          };
          const formattedDate = date
            .toLocaleDateString("en-GB", options)
            .replace(" ", " "); // Ensure there's a space
          return {
            ...doc,
            createdAt: formattedDate,
          };
        });

        formattedData.forEach((doc: any) => {
          if (doc.subject === "Maths") {
            subjectA.push(doc);
          } else if (doc.subject === "Physics") {
            subjectB.push(doc);
          } else if (doc.subject === "Chemistry") {
            subjectC.push(doc);
          }
        });

        setMathQuestions(subjectA.reverse());
        setPhysicsQuestions(subjectB.reverse());
        setChemistryQuestions(subjectC.reverse());

        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    })();
  }, []);

  if (user.wantImages === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-screen h-screen">
        <h1 className="text-2xl">You are not allowed to see this</h1>
        <p className="text-xl">
          Go in the settings and allow imaegs to see this page
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={mathQuestions} />
          <DataTable columns={columns} data={physicsQuestions} />
          <DataTable columns={columns} data={chemistryQuestions} />
        </>
      )}
    </div>
  );
}
