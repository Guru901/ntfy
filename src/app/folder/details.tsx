"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, LucideCross } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { saveFileInDb } from "@/data-access/saveFileInDb";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function EnterDetails() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const { edgestore } = useEdgeStore(); // Assuming this is a custom hook
  const searchParams = useSearchParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setFileUploading(true);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });
      setFileUploading(false);
      setUploading(false);
      saveFileInDb(res.url, searchParams.get("id") as string);
    }
  };

  if (uploading) {
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
              {preview && (
                <Image
                  src={preview}
                  alt="Question Preview"
                  width={400}
                  height={300}
                  priority={true}
                />
              )}
              <Input
                type="file"
                name="question"
                id="question"
                required
                onChange={handleFileChange}
                accept="image/*"
              />
              {fileUploading && (
                <Progress value={progress} className={`h-2 w-[${progress}%]`} />
              )}
              <Button disabled={fileUploading} onClick={handleUpload}>
                {fileUploading ? (
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

  return (
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
  );
}
