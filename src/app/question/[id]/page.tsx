"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getqustionById from "@/helpers/getQuestionById";
import axios from "axios";
import { EditQuestionForm } from "@/lib/type";
import { Metadata } from "next";

export default function TaskId() {
  const [editQuestion, setEditQuestion] = useState<EditQuestionForm>(
    {} as EditQuestionForm
  );
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);

  let pathName = usePathname();
  pathName = pathName.split("/")[2];
  const router = useRouter();

  const [editQuestionForm, setEditQuestionForm] = useState<EditQuestionForm>({
    _id: pathName,
    questions: "",
    subject: "",
  });

  async function getQuestion() {
    setLoading(true);
    const question = await getqustionById(pathName);
    setEditQuestion(question.data);
    setLoading(false);
  }

  useEffect(() => {
    if (editQuestion) {
      setEditQuestionForm({
        _id: pathName,
        questions: editQuestion?.questions || "",
        subject: editQuestion?.subject || "",
      });
    }
  }, [editQuestion]);

  async function submitEditedQuestion() {
    setBtnLoading(true);
    const { data } = await axios.post("/api/editQuestion", editQuestionForm);
    if (data?.success) {
      router.push("/quescount");
    }
    setBtnLoading(false);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="flex items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Update the task</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 justify-end">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                required
                className="w-[16rem]"
                name="subject"
                onChange={(e) => {
                  setEditQuestionForm({
                    ...editQuestionForm,
                    subject: e.target.value,
                  });
                }}
                defaultValue={editQuestion.subject}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-2 justify-end">
              <Label htmlFor="questions">Questions</Label>
              <Input
                id="questions"
                type="number"
                required
                className="w-[16rem]"
                name="questions"
                onChange={(e) => {
                  setEditQuestionForm({
                    ...editQuestionForm,
                    questions: e.target.value,
                  });
                }}
                defaultValue={editQuestion.questions}
              />
            </div>
          </div>
          {btnloading ? (
            <Button type="submit" className="w-full" disabled>
              <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={submitEditedQuestion}
            >
              Submit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
