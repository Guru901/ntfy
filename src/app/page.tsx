import { BackgroundBeams } from "@/components/AuroraBg/page";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { HeroButtons, NavButtons } from "@/components/Buttons/page";

export default function Home() {
  const links = [
    {
      label: "Tasks",
      href: "/tasks",
    },
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "Ques Count",
      href: "/quescount",
    },
    {
      label: "Weak Topics",
      href: "/weaktopics",
    },
  ];

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col justify-between h-screen py-5">
        <div className="flex flex-col justify-between items-center w-screen z-10 h-min gap-3">
          <div className="flex justify-between items-center w-screen px-7">
            <h1 className="font-bold text-gray-100 text-3xl">NTFY</h1>
            <NavButtons />
          </div>
          <Separator />
        </div>
        <div className="text-center flex flex-col gap-2 justify-center items-center">
          <h1 className="text-[74px] font-extrabold text-center bg-gradient-to-tr from-white to-[#999999] bg-clip-text text-transparent -translate-y-6 leading-[1.1] tracking-tight">
            Step Closer to Success, <br /> Every Day
          </h1>
          <p className="text-xl">
            Stay motivated and organized as you work <br />
            <span className="bg-gradient-to-tr from-white to-[#999999d8] bg-clip-text text-transparent">
              towards your goals.
            </span>
          </p>
          <HeroButtons />
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-center w-screen">
        <Image
          src="/demo.png"
          alt="ntfy logo"
          width={1200}
          height={1000}
          className="w-[calc(100vw-10rem)]"
        />
      </div>
      <Card className="w-screen min-h-[40vh] flex justify-start items-center relative">
        <div className="flex flex-col gap-2 text-center justify-start px-20">
          <h1 className="text-2xl font-bold">NTFY</h1>
          <Link href={"https://gurvinder.vercel.app"}>
            <p className="text-md font-light">Created By Gurvinder Singh</p>
          </Link>
        </div>
        <div className="flex gap-3 underline opacity-45 absolute right-10 bottom-8">
          {links.map((x) => (
            <Link key={x.label} href={x.href}>
              {x.label}
            </Link>
          ))}
        </div>
      </Card>

      <BackgroundBeams />
    </div>
  );
}
