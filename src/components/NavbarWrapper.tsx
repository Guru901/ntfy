"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/page";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (typeof window === undefined) return;

  const showNavbar = pathname !== "/";

  return showNavbar ? <Navbar /> : null;
}
