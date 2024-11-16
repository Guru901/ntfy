"use client";

import useGetUser from "@/hooks/use-get-user";
import axios from "axios";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";

type WeakTopic = {
  id: string;
  name: string;
  subject: string;
};

export function GetWeakTopics() {
  const { user } = useGetUser();

  const [mathWeakTopics, setMathWeakTopics] = useState<WeakTopic[]>([]);
  const [physicsWeakTopics, setPhysicsWeakTopics] = useState<WeakTopic[]>([]);
  const [chemistryWeakTopics, setChemistryWeakTopics] = useState<WeakTopic[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "https://ntfy-blush.vercel.app/api/getWeakTopics",
          {
            user: user,
          }
        );

        const formattedData = data.weakTopics.map((doc: any) => {
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

        const subjectA: WeakTopic[] = [];
        const subjectB: WeakTopic[] = [];
        const subjectC: WeakTopic[] = [];

        formattedData.forEach((doc: any) => {
          if (doc.subject === "Maths") {
            subjectA.push(doc);
          } else if (doc.subject === "Physics") {
            subjectB.push(doc);
          } else if (doc.subject === "Chemistry") {
            subjectC.push(doc);
          }

          setMathWeakTopics(subjectA.reverse());
          setPhysicsWeakTopics(subjectB.reverse());
          setChemistryWeakTopics(subjectC.reverse());
        });
      } catch (error) {
        console.error("Error fetching weak topics:", error);
      }
    })();
  }, [user]);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <DataTable columns={columns} data={mathWeakTopics} />
      <DataTable columns={columns} data={physicsWeakTopics} />
      <DataTable columns={columns} data={chemistryWeakTopics} />
    </div>
  );
}
