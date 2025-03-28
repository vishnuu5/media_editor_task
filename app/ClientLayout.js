"use client"

import "./globals.css"
import { useEffect, useState } from "react"

export default function ClientLayout({ children }) {
  // Use this to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // This ensures we only render once the client-side JavaScript is loaded
  // which prevents hydration mismatches from browser extensions
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{mounted ? children : null}</body>
    </html>
  )
}

