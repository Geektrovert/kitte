import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

// Inter Regular and Bold
const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-latin-ext-400-normal.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter-latin-ext-700-normal.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

// CalSans SemiBold
const calSans = localFont({
  src: [
    {
      path: "../../public/fonts/CalSans-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-calsans",
  display: "swap",
});

// iaw-mono-var (variable mono)
const iawMono = localFont({
  src: [
    {
      path: "../../public/fonts/iaw-mono-var.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-iaw-mono",
  display: "swap",
});

// Material Icons
const materialIcons = localFont({
  src: [
    {
      path: "../../public/fonts/material-icons-base-400-normal.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-material-icons",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kitte",
  description: "Kitte - a html(eh???) to image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${calSans.variable}
          ${iawMono.variable}
          ${materialIcons.variable}
          antialiased
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
