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
import { Loader2 } from "lucide-react";
import getLoggedInUser from "@/helpers/getLoggedInUser";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import WeakTopic from "@/models/weakTopicModel";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

type WeakTopic = {
  id: string;
  name: string;
  subject: string;
};

export default function QuesCount() {
  const [mathWeakTopics, setMathWeakTopics] = useState<WeakTopic[]>([]);
  const [physicsWeakTopics, setPhysicsWeakTopics] = useState<WeakTopic[]>([]);
  const [chemistryWeakTopics, setChemistryWeakTopics] = useState<WeakTopic[]>(
    []
  );

  const [loggedInUser, setLoggedInUser] = useState({});

  const [form, setForm] = useState({
    weakTopic: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);

  async function getWeakTopics() {
    try {
      setLoading(true);
      const user = await getLoggedInUser();
      setLoggedInUser(user);
      const { data } = await axios.post("/api/getWeakTopics", {
        user: user,
      });

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
      });

      setMathWeakTopics(subjectA.reverse());
      setPhysicsWeakTopics(subjectB.reverse());
      setChemistryWeakTopics(subjectC.reverse());

      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  }

  async function submitForm() {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/addWeakTopic", {
        form,
        loggedInUser,
      });
      getWeakTopics();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeakTopics();
  }, []);

  return (
    <div className="flex flex-col p-5 md:p-10 gap-20">
      <div className="flex gap-5  flex-col ">
        <div className="flex gap-3  flex-col justify-center">
          <h1 className="text-2xl">Weak Topics</h1>
        </div>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter the topic"
            className="w-[280px]"
            name="weakTopic"
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
        <div className="flex flex-col gap-2">
          <h1>Enter the topics you are not good at</h1>
          <div className="flex flex-col gap-2 md:flex-row">
            <DataTable columns={columns} data={mathWeakTopics} />
            <DataTable columns={columns} data={physicsWeakTopics} />
            <DataTable columns={columns} data={chemistryWeakTopics} />
          </div>
        </div>
      </div>
    </div>
  );
}
