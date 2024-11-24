"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "./ui/sidebar";

export default function SidebarWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Ensure `pathname` is defined and not at the root "/"
  const showNavbar = pathname && pathname !== "/" && pathname !== "/customize";

  return (
    <>
      {showNavbar ? (
        <>
          <AppSidebar />
          <main className="w-screen">
            <SidebarTrigger />
            {children}
          </main>
        </>
      ) : (
        <main className="w-screen">{children}</main>
      )}
    </>
  );
}
