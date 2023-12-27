import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayU Test Secure Form",
  description: "Aplikacja do tokenizacji karty poprzez PayU Secure Form",
};

const bodyStyle = `
  bg-gradient-to-r from-[#e3f5ff] to-[rgba(192,229,246,1)]
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bodyStyle}`}>{children}</body>
    </html>
  );
}
