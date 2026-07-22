"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center opacity-0">
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
      title="Ubah Tema (Gelap/Terang)"
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5 text-orange-400" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
