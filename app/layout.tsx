import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: "Riyansh Kanojia — Python | Prompt Engineering | AI Tools",
  description:
    "Computer Science graduate with experience in WordPress Content Writing and an interest in Python, Prompt Engineering, and Generative AI. Developing knowledge of AI tools, prompt design, and large language model frameworks, including LangChain and LangGraph.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}