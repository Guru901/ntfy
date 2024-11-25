import { ArrowBigLeft, ArrowLeft, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function ReadMe({ setShowReadMe }: any) {
  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col px-12 py-6">
      <div className="w-full h-20">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowReadMe(false)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-max h-max flex justify-center items-center">
        <Image
          alt="Readme image"
          className="rounded-lg w-screen"
          src={"/images/readme.png"}
          width={1000}
          height={1000}
          priority={true}
        />
      </div>
    </div>
  );
}
