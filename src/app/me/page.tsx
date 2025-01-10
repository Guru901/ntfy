"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useGetUser from "@/hooks/use-get-user";
import axios from "axios";
import { PencilIcon, SaveIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../loading";
import { useUserStore } from "@/store/userStore";

export default function Me() {
  const [loading, setLoading] = useState(false);
  const { user } = useGetUser();
  const { setUser } = useUserStore();

  const [isEditingFields, setIsEditingFields] = useState(false);
  const [editTableFields, setEditableFields] = useState([
    { label: "", value: "" },
  ]);

  const handleSave = async () => {
    try {
      setIsEditingFields(false);
      const { data } = await axios.post("/api/updateUserFields", {
        fields: editTableFields,
      });

      if (data.success) {
        setUser({
          _id: user._id,
          username: user.username,
          wantImages: user.wantImages,
          wantQuesCount: user.wantQuesCount,
          whatToTrack: data.data.fields,
          email: user.email,
          topic: user.topic,
        });
      }
      setEditableFields(data.data.fields);
    } catch (error) {}
  };

  const handleUpdateField = (index: number, field: string, value: string) => {
    const updatedFields = [...editTableFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [field]: value,
      label: value,
    };
    setEditableFields(updatedFields);
  };

  const handleAddSlot = () => {
    setEditableFields([...editTableFields, { label: "", value: "" }]);
  };

  // Function to remove a slot
  const handleRemoveSlot = (indexToRemove: number) => {
    setEditableFields(
      editTableFields.filter((_, index) => index !== indexToRemove)
    );
  };

  if (loading) return <Loader />;

  return (
    <main>
      <Card className="flex flex-col w-[80vw] mx-auto gap-2">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Edit Your Info</CardTitle>
            <CardDescription>
              Here you can edit your onboarding info
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex">
          <div className="my-2 flex flex-col items-center w-[25%] border-r justify-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold pl-2">{user.username}</h1>
              <p className="text-md text-gray-300">{user.email}</p>
            </div>
          </div>
          <div className="p-4 w-[75%] space-y-4">
            <h1>Edit your info</h1>

            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="text-md text-zinc-300">Want Images</p>
                <p className="text-md text-zinc-300">
                  {user.wantImages ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="text-md text-zinc-300">
                  Want to count no of ques
                </p>
                <p className="text-md text-zinc-300">
                  {user.wantQuesCount ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="text-md text-zinc-300">What your are tracking</p>
                <p className="text-md text-zinc-300">{user.topic}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">
                  Fields you are tracking
                </h2>
                {!isEditingFields ? (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setIsEditingFields(true);
                      setEditableFields(user.whatToTrack);
                    }}
                  >
                    <PencilIcon size={15} />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAddSlot}>
                      Add Slot
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleSave}>
                      <SaveIcon size={15} />
                    </Button>
                  </div>
                )}
              </div>

              {isEditingFields ? (
                <div className="space-y-2">
                  {editTableFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Field Name"
                        value={field.value}
                        onChange={(e) =>
                          handleUpdateField(index, "value", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemoveSlot(index)}
                      >
                        <TrashIcon size={15} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {user.whatToTrack.map((field, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{field.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
