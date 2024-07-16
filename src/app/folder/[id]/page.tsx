import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Folder() {
  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col px-12 py-6">
      <div className="w-full h-12">
        <Link href="/questions">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">Coming Soon!</h1>
      </div>
    </div>
  );
}
