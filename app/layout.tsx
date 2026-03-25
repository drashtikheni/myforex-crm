import "./globals.css";
import { DM_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}