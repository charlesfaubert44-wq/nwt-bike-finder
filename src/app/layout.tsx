import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { SoftLaunchBanner } from "@/components/SoftLaunchBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YK Bike Finder - Reuniting Bikes in Yellowknife",
  description: "Help find stolen bikes and report found bikes in Yellowknife. Connect with your community to keep cycling safe in the capital city.",
  keywords: "bike, stolen, found, Northwest Territories, Yellowknife, cycling, community",
  authors: [{ name: "NWT Bike Finder" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2D5F5D",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <SoftLaunchBanner />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}