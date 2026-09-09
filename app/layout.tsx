import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aiemailreplyngenerator.krishaiworks.com"
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
      "https://aiemailreplyngenerator.krishaiworks.com/",
  },

  openGraph: {
    title: "AI Email Reply Generator | KrishAIWorks",
    description:
      "Generate professional and personalized email replies with AI in seconds.",
    url: "https://aiemailreplyngenerator.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Email Reply Generator | KrishAIWorks",
    description:
      "Create professional email replies quickly and easily with AI.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },

    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },

    {
      "@type": "WebApplication",
      "@id":
        "https://aiemailreplyngenerator.krishaiworks.com/#webapplication",
      name: "AI Email Reply Generator",
      url: "https://aiemailreplyngenerator.krishaiworks.com/",
      description:
        "Generate professional, clear, and personalized email replies with AI. Create effective email responses in seconds with the free AI Email Reply Generator by KrishAIWorks.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },

    {
      "@type": "WebPage",
      "@id":
        "https://aiemailreplyngenerator.krishaiworks.com/#webpage",
      url: "https://aiemailreplyngenerator.krishaiworks.com/",
      name: "AI Email Reply Generator | Write Professional Email Replies",
      description:
        "Generate professional, clear, and personalized email replies with AI. Create effective email responses in seconds with the free AI Email Reply Generator by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://aiemailreplyngenerator.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}