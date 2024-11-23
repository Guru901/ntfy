import Questions from "./questions";
import { Metadata } from "next";

export default function QuestionsPage() {

  export const metadata: Metadata = {
    title: "Questions",
  }

  return (
      <Questions />
  )
}
