"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideCross } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import Loader from "@/components/loader";
import Image from "next/image";

function EnterDetails({ pathName }: any) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function saveFileInDb(url: string) {
    const { data } = await axios.post("/api/saveFileInDb", {
      url,
      pathName,
    });
    if (data.success) {
      location.reload();
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Upload the question</div>
            <div className="flex rotate-45">
              <LucideCross
                className="w-5 h-5 cursor-pointer"
                onClick={() => setUploading(false)}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="question">Upload</Label>
            <Input
              type="file"
              name="question"
              id="question"
              required
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
            <Progress value={progress} className={`h-2 w-[${progress}%]`} />
            <Button
              disabled={uploading}
              onClick={async () => {
                if (file) {
                  setUploading(true);
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      setProgress(progress);
                    },
                  });
                  setUploading(false);
                  saveFileInDb(res.url);
                }
              }}
            >
              {uploading ? (
                <div className="flex items-center gap-2">
                  Please Wait
                  <Loader2 className="animate-spin w-3 h-3" />
                </div>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Folder() {
  let pathName = usePathname();
  pathName = pathName.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function getFiles() {
    setLoading(true);
    const { data } = await axios.post(`/api/getFiles`, { pathName });
    setQuestions(data);
    setLoading(false);
  }

  useEffect(() => {
    getFiles();
  }, []);

  if (uploading)
    return (
      <EnterDetails
        pathName={pathName}
        setUploading={setUploading}
        uploading={uploading}
      />
    );

  if (loading) return <Loader />;

  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col px-4 md:px-12 py-6 gap-4">
      <div className="w-full h-12 flex justify-between items-center">
        <Link href="/questions">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <Button onClick={() => setUploading(true)}>Upload</Button>
        </div>
      </div>
      <div className="md:columns-2 gap-2 space-y-2">
        {questions.map((x: string) => (
          <img src={x} className="w-full object-cover rounded-md" key={x} />
        ))}
      </div>
    </div>
  );
}
