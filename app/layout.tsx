import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./components/Providers";
import { BackgroundShapes } from "./components/BackgroundShapes";

export const metadata: Metadata = {
  title: "MAIVS - Medical AI Visibility Score",
  description:
    "AI visibility reports for clinics and healthcare professionals."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BackgroundShapes />
          {children}
        </Providers>
      </body>
    </html>
  );
}
