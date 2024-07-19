"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideCross } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import Loader from "@/components/loader";
function EnterDetails({ setUplading, pathName }: any) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);

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
            <div>Create Folder</div>
            <div className="flex rotate-45">
              <LucideCross
                className="w-5 h-5 cursor-pointer"
                onClick={() => setUplading(false)}
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
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      setProgress(progress);
                    },
                  });
                  setUplading(false);
                  saveFileInDb(res.url);
                }
              }}
            >
              Upload
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
    return <EnterDetails pathName={pathName} setUplading={setUploading} />;

  if (loading) return <Loader />;

  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col px-12 py-6 gap-4">
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
      <div
        className={`grid w-full h-full ${
          questions.length > 4 ? `grid-cols-4` : `gird-cols-2`
        } gap-2 auto-rows-masonry`}
      >
        {questions.map((x: string) => (
          <img src={x} className="w-full object-cover rounded-md" key={x} />
        ))}
      </div>
    </div>
  );
}
