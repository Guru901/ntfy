import EditQuestion from "./questions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Question",
};

export default function EditQuestionPage() {
  return <EditQuestion />;
}
