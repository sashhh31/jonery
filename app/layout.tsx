import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ToasterClient from "@/components/ToasterClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shay Joinery Ltd - Master Craftsmen in London",
  description: "Professional carpentry and joinery services in London",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>Shay Joinery Ltd - Master Craftsmen in London</title>
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToasterClient />
      </body>
    </html>
  )
}
