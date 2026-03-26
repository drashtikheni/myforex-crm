import "./globals.css";
import { cn } from "@/lib/utils";
import { DM_Sans, Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={dmSans.className}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}