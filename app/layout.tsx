import "./globals.css";
import { Manrope } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";

const font = Manrope({ subsets: ["latin"], variable: "--font" });
export const metadata: Metadata = { title: "YIZAM Tech", description: "Computer hardware, accessories and networking gear." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <header className="top"><div className="wrap bar">
          <Link href="/" className="logo">YIZAM <b>Tech</b></Link>
          <Link href="/cart">Cart</Link>
        </div></header>
        {children}
      </body>
    </html>
  );
}
