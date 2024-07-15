"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideCross } from "lucide-react";
import axios from "axios";
import getLoggedInUser from "@/helpers/getLoggedInUser";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface EnterDetailsProps {
  setEnterDetailsTrigger: any;
  setName: any;
  name: any;
  createFolder: any;
}

function EnterDetails({
  setEnterDetailsTrigger,
  setName,
  name,
  createFolder,
}: EnterDetailsProps) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Create Folder</div>
            <div className="flex rotate-45">
              <LucideCross
                className="w-5 h-5 cursor-pointer"
                onClick={() => setEnterDetailsTrigger(false)}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="h-8" variant={"outline"} onClick={createFolder}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Questions() {
  const [enterDetailsTrigger, setEnterDetailsTrigger] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [folders, setFolder] = useState<Folders[] | []>([]);
  const [deletePermit, setDeletePermit] = useState(false);
  const [doubleClickedFolder, setDoubleClickedFolder] = useState<
    string | undefined
  >();
  const router = useRouter();

  type Folders = {
    _id: string;
    name: string;
  };

  async function createFolder() {
    setLoading(true);
    const user = await getLoggedInUser();
    console.log(user);
    const { data } = await axios.post("/api/createFolder", {
      name,
      id: user._id,
      location: "/",
    });
    console.log(data);
    setEnterDetailsTrigger(false);
    getFolder();
    setLoading(false);
  }

  async function getFolder() {
    setLoading(true);
    const { data } = await axios.post("/api/getFolders", {
      location: "/",
    });
    console.log(data);
    setFolder(data.reverse());
    setLoading(false);
  }

  useEffect(() => {
    getFolder();
  }, []);

  useEffect(() => {
    if (doubleClickedFolder) {
      router.push(`/folder/${doubleClickedFolder}`);
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

  return (
    <>
      <h1 className="px-12 text-2xl font-medium py-6">Welcome</h1>
      {enterDetailsTrigger && (
        <EnterDetails
          createFolder={createFolder}
          name={name}
          setEnterDetailsTrigger={setEnterDetailsTrigger}
          setName={setName}
        />
      )}
      <ContextMenu>
        <ContextMenuTrigger className="h-screen w-screen">
          <div className="w-screen h-screen px-12 flex flex-col gap-2">
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
                  <ContextMenuItem inset>Open</ContextMenuItem>
                  <ContextMenuItem inset>Delete Folder</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={() => getFolder()}>
            Refresh
          </ContextMenuItem>
          <ContextMenuItem inset onClick={() => setEnterDetailsTrigger(true)}>
            Create New Folder
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
