import React from "react";
import { Metadata } from "next";
import { QuesCount } from "./quesCount";

export const metadata: Metadata = {
  title: "Questions Count",
};

export default function QuesCountPage() {
  return (
    <div className="flex flex-col p-5 md:p-10 gap-20">
      <QuesCount />
    </div>
  );
}
