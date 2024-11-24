"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Customize() {
  const [fields, setFields] = useState([{ id: 0, value: "" }]);
  const [topic, setTopic] = useState("");
  const [saveImages, setSaveImages] = useState(false);
  const [trackQuestions, setTrackQuestions] = useState(false);

  const { setUser } = useUserStore();

  const { push } = useRouter();

  const addField = () => {
    setFields([...fields, { id: fields.length, value: "" }]);
  };
  const removeField = () => {
    setFields(fields.slice(0, -1));
  };

  const handleFieldChange = (id: number, value: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleSubmit = async () => {
    const { data } = await axios.post("/api/customize", {
      topic,
      fields: fields.map((f) => {
        return { value: f.value, label: f.value.trim() };
      }),
      saveImages,
      trackQuestions,
    });

    console.log(data);

    if (data.success) {
      setUser({
        _id: data.data._id,
        whatToTrack: data.data.whatToTrack,
        wantImages: data.data.wantImages,
        wantQuesCount: data.data.wantQuesCount,
        username: data.data.username,
        email: data.data.email,
        topic: data.data.topic,
      });
      push("/tasks");
    }
  };

  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl mb-12 font-bold">
        Lets <span className="underline decoration-2">Customize</span> Your
        Experience
      </h1>

      <div className="flex flex-col gap-8">
        {/* Topic Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. What are you using it for? (e.g., JEE)
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <Label htmlFor="topic" className="text-lg min-w-20">
              Topic
            </Label>
            <Input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="max-w-md"
              placeholder="Enter your topic"
            />
          </div>
        </section>

        {/* Fields Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. What fields do you want to track? (e.g., Maths, Physics)
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {fields.map((field) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Label
                    className="text-lg min-w-20"
                    htmlFor={`field-${field.id}`}
                  >
                    Field {field.id + 1}
                  </Label>
                  <Input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="max-w-md"
                    id={`field-${field.id}`}
                    placeholder={`Enter field ${field.id + 1}`}
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={addField}
              className="w-fit"
            >
              + Add Field
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={removeField}
              disabled={fields.length === 1}
              className="w-fit"
            >
              - Remove Field
            </Button>
          </div>
        </section>

        {/* Images Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Do you want to save images?
          </h2>
          <div className="flex gap-4 items-center">
            <Toggle
              pressed={saveImages === true}
              onPressedChange={() => {
                if (saveImages !== true) {
                  setSaveImages(true);
                }
              }}
              className={saveImages === true ? "bg-primary" : ""}
              aria-label="Yes toggle for images"
            >
              Yes
            </Toggle>
            <Toggle
              pressed={saveImages === false}
              onPressedChange={() => {
                if (saveImages !== false) {
                  setSaveImages(false);
                }
              }}
              className={saveImages === false ? "bg-primary" : ""}
              aria-label="No toggle for images"
            >
              No
            </Toggle>
            {saveImages === true && (
              <p className="text-yellow-600">
                Note: Personal images would be Leaked
              </p>
            )}
          </div>
        </section>

        {/* Questions Tracking Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Do you want to count questions solved per day?
          </h2>
          <div className="flex gap-4 items-center">
            <Toggle
              pressed={trackQuestions === true}
              onPressedChange={() => {
                if (trackQuestions !== true) {
                  setTrackQuestions(true);
                }
              }}
              className={trackQuestions === true ? "bg-primary" : ""}
              aria-label="Yes toggle for question tracking"
            >
              Yes
            </Toggle>
            <Toggle
              pressed={trackQuestions === false}
              onPressedChange={() => {
                if (trackQuestions !== false) {
                  setTrackQuestions(false);
                }
              }}
              className={trackQuestions === false ? "bg-primary" : ""}
              aria-label="No toggle for question tracking"
            >
              No
            </Toggle>
          </div>
        </section>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className="w-fit mt-4"
              disabled={
                !topic ||
                fields.some((f) => !f.value) ||
                saveImages === null ||
                trackQuestions === null
              }
            >
              Save Preferences
            </Button>
          </DialogTrigger>
          <DialogContent className="pt-8">
            <DialogTitle>Your Preferences</DialogTitle>
            <div className="flex flex-col gap-2 mt-4">
              <p>
                <span className="text-lg">Topic</span> : <span>{topic}</span>
              </p>
              <p>
                <span className="text-lg">Fields to track</span> :{" "}
                <span>{fields.map((f) => f.value).join(", ")}</span>
              </p>
              <p>
                <span className="text-lg">Want to save images</span> :{" "}
                <span>{saveImages ? "Yes" : "No"}</span>
              </p>
              <p>
                <span className="text-lg">Want to count questions</span> :{" "}
                <span>{trackQuestions ? "Yes" : "No"}</span>
              </p>
            </div>
            <DialogClose asChild className="absolute right-2 bottom-2">
              <Button onClick={handleSubmit} variant="secondary">
                Confirm!
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
