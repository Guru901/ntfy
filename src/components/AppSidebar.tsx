"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "./Buttons/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";

export function AppSidebar() {
  const pathName = usePathname();
  const [active, setActive] = useState("Home");

  const { user } = useUserStore();

  const items = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Tasks",
      url: "/tasks",
    },
    {
      title: "Weak Topics",
      url: "/weaktopics",
    },
  ];

  user.wantImages && items.push({ title: "Questions", url: "/questions" });
  user.wantQuesCount && items.push({ title: "Ques Count", url: "/quescount" });
  items.push({ title: "Profile", url: "/me" });

  useEffect(() => {
    items.map((item) => {
      if (pathName.includes(item.url)) {
        setActive(item.title);
      }
    });
  }, [pathName]);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup className="flex flex-col gap-2">
          <SidebarHeader className="font-bold text-xl">NTFY</SidebarHeader>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2 text-lg">
              {items.map((item) =>
                active === item.title ? (
                  <SidebarMenuItem
                    key={item.title}
                    className="bg-zinc-800 rounded-lg"
                  >
                    <SidebarMenuButton asChild>
                      <Link prefetch={true} href={item.url}>
                        <span className="font-medium text-md">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} prefetch={true}>
                        <span className="font-medium text-md">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="pb-4">
          <LogoutButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
