import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarWrapper from "@/components/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NTFY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <EdgeStoreProvider>
              <SidebarWrapper>{children}</SidebarWrapper>
            </EdgeStoreProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
