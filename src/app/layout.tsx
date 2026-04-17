import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Markel Ramiro - Product Software Engineer at Multiverse Computing",
  description: "Product Software Engineer building core product at Multiverse Computing. AI, Quantum Computing, and full-stack development.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Portfolio of Markel Ramiro - AI Engineer & Data Scientist" />
        <meta name="keywords" content="AI, Machine Learning, Data Science, Data Engineering, Deep Learning" />
      </head>
      <body className="font-sans antialiased bg-[#050505] text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}