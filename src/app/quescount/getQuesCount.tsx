"use client";

import useGetUser from "@/hooks/use-get-user";
import axios from "axios";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GetQuesCount() {
  const { user } = useGetUser();
  const [loading, setLoading] = useState(true);
  const [sortedData, setSortedData] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/getQuesCount");

        const formattedData = data.data.map((doc: any) => {
          const date = new Date(doc.createdAt);
          const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
          };
          const formattedDate = date
            .toLocaleDateString("en-GB", options)
            .replace(" ", " ");
          return {
            ...doc,
            createdAt: formattedDate,
          };
        });

        const categorizedData: { [key: string]: any[] } = {};

        user.whatToTrack.forEach((subject) => {
          categorizedData[subject.label] = [];
        });

        formattedData.forEach((item: { subject: string }) => {
          const subject = user.whatToTrack.find(
            (track) => track.label.toLowerCase() === item.subject.toLowerCase()
          );
          if (subject) {
            categorizedData[subject.label].push(item);
          }
        });

        setSortedData(categorizedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    })();
  }, [user.whatToTrack]);

  if (user.wantQuesCount === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-screen h-screen">
        <h1 className="text-2xl">You are not allowed to see this</h1>
        <p className="text-xl">
          Go in the settings and allow images to see this page
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row flex-wrap">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
        </div>
      ) : (
        <>
          {user.whatToTrack.map((subject) => (
            <Card key={subject.label} className="flex-1 md:w-[410px]">
              <CardHeader>
                <CardTitle>{subject.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-2">
                {sortedData[subject.label]?.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={sortedData[subject.label]}
                  />
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No questions found for {subject.label}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default GetQuesCount;
