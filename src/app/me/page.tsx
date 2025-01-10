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
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Me() {
  const { user } = useGetUser();
  const { setUser } = useUserStore();

  const [isEditingFields, setIsEditingFields] = useState(false);
  const [editTableFields, setEditableFields] = useState([
    { label: "", value: "" },
  ]);

  const [isEditingImages, setIsEditingImages] = useState(false);
  const [isEditingQuesCount, setIsEditingQuesCount] = useState(false);
  const [wantImages, setWantImages] = useState(user.wantImages);
  const [wantQuesCount, setWantQuesCount] = useState(user.wantQuesCount);

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

  const handleUpdateImages = async (value: string) => {
    try {
      setIsEditingImages(false);
      const { data } = await axios.post("/api/updateUserImages", {
        wantImages: value === "Yes",
      });

      if (data.success) {
        setUser({
          ...user,
          wantImages: value === "Yes",
        });
        setWantImages(value === "Yes");
      }
      setIsEditingImages(false);
    } catch (error) {}
  };

  const handleUpdateQuesCount = async (value: string) => {
    try {
      const { data } = await axios.post("/api/updateUserQuesCount", {
        wantQuesCount: value === "Yes",
      });

      if (data.success) {
        setUser({
          ...user,
          wantQuesCount: value === "Yes",
        });
        setWantQuesCount(value === "Yes");
      }
      setIsEditingQuesCount(false);
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

  const handleRemoveSlot = (indexToRemove: number) => {
    setEditableFields(
      editTableFields.filter((_, index) => index !== indexToRemove)
    );
  };

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
                <div className="flex flex-col gap-2">
                  <p className="text-md text-zinc-300">Want Images</p>
                  {isEditingImages ? (
                    <div>
                      <Select
                        onValueChange={handleUpdateImages}
                        defaultValue={wantImages ? "Yes" : "No"}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <p className="text-md text-zinc-300">
                      {wantImages ? "Yes" : "No"}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setIsEditingImages(true);
                  }}
                >
                  <PencilIcon size={15} />
                </Button>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-md text-zinc-300">
                    Want to count no of ques
                  </p>
                  {isEditingQuesCount ? (
                    <div>
                      <Select
                        onValueChange={handleUpdateQuesCount}
                        defaultValue={wantQuesCount ? "Yes" : "No"}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <p className="text-md text-zinc-300">
                      {wantQuesCount ? "Yes" : "No"}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setIsEditingQuesCount(true);
                  }}
                >
                  <PencilIcon size={15} />
                </Button>
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
