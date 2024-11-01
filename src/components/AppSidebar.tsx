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

// Menu items.
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
    title: "Questions",
    url: "/questions",
  },
  {
    title: "Ques Count",
    url: "/quescount",
  },
  {
    title: "Weak Topics",
    url: "/weaktopics",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup className="flex flex-col gap-2">
          <SidebarHeader className="font-bold text-xl">NTFY</SidebarHeader>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2 text-lg">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span className="font-medium text-md">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <LogoutButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
