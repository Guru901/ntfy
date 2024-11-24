import Questions from "./questions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions",
};

export default function QuestionsPage() {
  return <Questions />;
}
