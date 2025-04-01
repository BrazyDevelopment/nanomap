import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "NanoMap - Nano Ecosystem Visualization",
  description: "Explore the Nano cryptocurrency ecosystem with an interactive, futuristic visualization of its nodes and connections.",
  keywords: ["Nano", "cryptocurrency", "ecosystem", "visualization", "interactive", "blockchain"],
  authors: [{ name: "Brazy", url: "https://github.com/BrazyDevelopment" }],
  creator: "Brazy at Armour Solutions",
  publisher: "Armour Solutions",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><text x='50%' y='50%' font-size='20' text-anchor='middle' dominant-baseline='middle'>🗺️</text></svg>",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    title: "NanoMap - Nano Ecosystem Visualization",
    description: "A dynamic, interactive map of the Nano cryptocurrency ecosystem.",
    url: "https://nanomap.armour.dev",
    siteName: "NanoMap",
    images: [
      {
        url: "/nanomap.png", 
        width: 1200,
        height: 630,
        alt: "NanoMap Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NanoMap - Nano Ecosystem Visualization",
    description: "Explore the Nano ecosystem with this interactive visualization.",
    creator: "@Armour_Hosting", 
    images: ["/nanomap.png"], 
  },
}
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="dark">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}