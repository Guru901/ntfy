import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar/page";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NTFY",
  description: "HEHEHEHEH",
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
          <Navbar />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
