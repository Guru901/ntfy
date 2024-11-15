import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideCross } from "lucide-react";

interface EnterDetailsProps {
  setEnterDetailsTrigger: any;
  setName: any;
  name: any;
  createFolder: any;
}

export function EnterDetails({
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
