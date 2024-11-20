import { BackgroundBeams } from "@/components/AuroraBg/page";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import {
  FooterButtons,
  HeroButtons,
  NavButtons,
} from "@/components/Buttons/page";

export default function Home() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col h-screen py-5 justify-between">
        <div className="flex flex-col justify-between items-center w-screen z-10 gap-3 h-[10vh]">
          <div className="flex justify-between items-center w-screen px-7 h-[9vh]">
            <h1 className="font-bold text-gray-100 text-3xl">NTFY</h1>
            <NavButtons />
          </div>
          <Separator />
        </div>
        <div className="text-center flex flex-col gap-2 justify-center items-center h-[90vh]">
          <h1 className="md:text-[74px] sm:text-[60px] text-[50px] font-extrabold text-center bg-gradient-to-tr from-white to-[#999999] bg-clip-text text-transparent -translate-y-6 leading-[1.1] tracking-tight">
            Step Closer to Success, <br /> Every Day
          </h1>
          <p className="md:text-xl text-md">
            Stay motivated and organized as you work <br />
            <span className="bg-gradient-to-tr from-white to-[#999999d8] bg-clip-text text-transparent">
              towards your goals.
            </span>
          </p>
          <HeroButtons />
        </div>
      </div>
      <div className="flex items-center justify-center w-screen">
        <Image
          src="/demo.png"
          alt="ntfy logo"
          width={1200}
          height={1000}
          className="w-screen md:w-auto"
        />
      </div>
      <Card className="w-screen min-h-[40vh] flex justify-start items-center relative">
        <div className="flex flex-col gap-2 text-center justify-start px-20">
          <h1 className="text-2xl font-bold">NTFY</h1>
          <Link target={"_blank"} href={"https://gurvinder.vercel.app"}>
            <p className="text-md font-light">Created By Gurvinder Singh</p>
          </Link>
        </div>
        <FooterButtons />
      </Card>
      <BackgroundBeams />
    </div>
  );
}
