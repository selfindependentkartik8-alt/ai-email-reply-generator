import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aiemailreplygenerator.krishworks.com"
  ),

  title: "AI Email Reply Generator | Write Professional Email Replies",

  description:
    "Generate professional, clear, and personalized email replies with AI. Create effective email responses in seconds with the free AI Email Reply Generator by KrishAIWorks.",

  keywords: [
    "AI Email Reply Generator",
    "Email Reply Generator",
    "AI Email Writer",
    "Email Response Generator",
    "AI Email Response Generator",
    "Professional Email Reply Generator",
    "Email Reply AI",
    "Automatic Email Reply Generator",
    "AI Email Assistant",
    "Write Email Replies with AI",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical:
      "https://aiemailreplygenerator.krishworks.com/",
  },

  openGraph: {
    title:
      "AI Email Reply Generator | KrishAIWorks",
    description:
      "Generate professional and personalized email replies with AI in seconds.",
    url: "https://aiemailreplygenerator.krishworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "AI Email Reply Generator | KrishAIWorks",
    description:
      "Create professional email replies quickly with AI.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}