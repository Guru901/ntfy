import { EnterDetails } from "./details";
import Questions from "./questions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Folder",
};

export default function Folder({ searchParams }: { searchParams: any }) {
  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col px-4 md:px-12 py-6 gap-4">
      <EnterDetails />
      <div className="md:columns-2 gap-2 space-y-2">
        <Questions searchParams={searchParams} />
      </div>
    </div>
  );
}
