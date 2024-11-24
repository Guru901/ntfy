"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ReadMe from "@/components/readMe";
import useGetUser from "@/hooks/use-get-user";
import { Metadata } from "next";
import { EnterDetails } from "./details";

export default function Questions() {
  const [enterDetailsTrigger, setEnterDetailsTrigger] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [folders, setFolder] = useState<Folders[] | []>([]);
  const [deletePermit, setDeletePermit] = useState(false);
  const [doubleClickedFolder, setDoubleClickedFolder] = useState<
    string | undefined
  >();
  const [showReadMe, setShowReadMe] = useState(false);
  const router = useRouter();

  const { error, user } = useGetUser();

  type Folders = {
    _id: string;
    name: string;
  };

  async function createFolder() {
    setLoading(true);
    const { data } = await axios.post("/api/createFolder", {
      name,
      location: "/",
    });
    setEnterDetailsTrigger(false);
    getFolder();
    setLoading(false);
  }

  async function getFolder() {
    setLoading(true);
    const { data } = await axios.post("/api/getFolders", {
      location: "/",
    });
    setFolder(data.reverse());
    setLoading(false);
  }

  useEffect(() => {
    getFolder();
  }, []);

  useEffect(() => {
    if (doubleClickedFolder) {
      router.push(`/folder?id=${doubleClickedFolder}`);
    }
  }, [doubleClickedFolder, router]);

  if (loading) {
    return (
      <div className="px-12 py-6 flex gap-6 flex-col">
        <h1 className="text-2xl font-medium">Welcome</h1>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
          <Skeleton className="w-[20rem] h-12 rounded-lg" />
        </div>
      </div>
    );
  }

  if (showReadMe) return <ReadMe setShowReadMe={setShowReadMe} />;

  if (error.length !== 0) {
    if (error !== "User not logged in") return <div>Error: {error}</div>;
  }

  if (enterDetailsTrigger)
    return (
      <EnterDetails
        createFolder={createFolder}
        name={name}
        setEnterDetailsTrigger={setEnterDetailsTrigger}
        setName={setName}
      />
    );

  return (
    <>
      <div className="flex px-12 py-6 justify-between">
        <h1 className="text-2xl font-medium">Welcome</h1>
        <Button
          className="flex gap-2 w-25"
          variant={"secondary"}
          onClick={() => setEnterDetailsTrigger(true)}
        >
          <Plus className="w-4" />
          Create New
        </Button>
      </div>
      <ContextMenu>
        <ContextMenuTrigger className="h-screen w-screen">
          <div className="w-screen h-screen px-12 flex flex-col gap-2">
            <div
              className="w-[20rem] bg-zinc-900 p-3 rounded-lg hover:bg-secondary cursor-pointer"
              onClick={() => setShowReadMe(true)}
            >
              <h1 className="select-none font-bold">Read Me</h1>
            </div>
            {folders?.map((x) => (
              <ContextMenu key={x._id}>
                <ContextMenuTrigger className="w-min">
                  <div
                    className="w-[20rem] bg-zinc-900 p-3 rounded-lg hover:bg-secondary cursor-pointer"
                    onDoubleClick={() => setDoubleClickedFolder(x._id)}
                  >
                    <h1 className="select-none">{x.name}</h1>
                  </div>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-64">
                  <ContextMenuItem
                    inset
                    onClick={() => setDoubleClickedFolder(x._id)}
                  >
                    Open
                  </ContextMenuItem>
                  <ContextMenuItem inset>Delete Folder</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => getFolder()}>Refresh</ContextMenuItem>
          <ContextMenuItem onClick={() => setEnterDetailsTrigger(true)}>
            Create New Folder
          </ContextMenuItem>
          <ContextMenuItem onClick={() => router.back()}>Back</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
