"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { QuestionsCount } from "@/lib/type";
import { Loader2 } from "lucide-react";
import getLoggedInUser from "@/helpers/getLoggedInUser";
import { User } from "@/lib/type";

export default function QuesCount() {
  const [mathQuesitions, setMathQuestions] = useState<QuestionsCount[]>([]);
  const [physicsQuestions, setPhysicsQuestions] = useState<QuestionsCount[]>(
    [],
  );
  const [chemistryQuestions, setChemistryQuestions] = useState<
    QuestionsCount[]
  >([]);

  const [loggedInUser, setLoggedInUser] = useState({});

  const [form, setForm] = useState({
    questions: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);

  async function getQuestionsSolved() {
    try {
      setLoading(true);
      const user = await getLoggedInUser();
      setLoggedInUser(user);
      const { data } = await axios.post("/api/getQuesCount", {
        user: user,
      });

      // Define arrays to hold questions for each subject
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

      // Sort the formatted data into the respective arrays
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
  }

  async function submitForm() {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/quescount", {
        form,
        loggedInUser,
      });
      getQuestionsSolved();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestionsSolved();
  }, []);

  return (
    <div className="flex flex-col p-10 gap-20">
      <div className="flex gap-10  flex-col ">
        <div className="flex gap-3  flex-col justify-center">
          <h1 className="text-2xl">Daily Question Target : 90</h1>
          <p className="text-sm">
            Enter the no of questions you have solved today
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Enter your answer"
            className="w-[280px]"
            name="questions"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
          <Select onValueChange={(e) => setForm({ ...form, subject: e })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Maths">Maths</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
            </SelectContent>
          </Select>
          {loading ? (
            <Button disabled className="h-[38px]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button className="h-[38px]" onClick={submitForm}>
              Submit
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1>No of Questions solved in this week</h1>
        <div className="flex gap-2">
          <DataTable columns={columns} data={mathQuesitions} />
          <DataTable columns={columns} data={physicsQuestions} />
          <DataTable columns={columns} data={chemistryQuestions} />
        </div>
      </div>
    </div>
  );
}
