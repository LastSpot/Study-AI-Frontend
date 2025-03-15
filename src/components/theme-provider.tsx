/**
 * Theme Management System
 * Provides theme context and utilities for managing application-wide theme settings.
 * Supports light, dark, and system themes with persistent storage.
 */
import { createContext, useContext, useEffect, useState } from "react"

// Available theme options
type Theme = "dark" | "light" | "system"

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

// Context state interface
interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// Initial context state
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

// Create theme context
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * ThemeProvider Component
 * Manages theme state and provides theme context to the application.
 * 
 * Features:
 * - Persists theme preference in localStorage
 * - Supports system theme detection
 * - Automatically applies theme classes to document root
 * 
 * @param props.children - Child components to be wrapped
 * @param props.defaultTheme - Initial theme to use if none is stored
 * @param props.storageKey - Key to use for localStorage
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize theme state from localStorage or default
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  // Apply theme classes to document root
  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    // Handle system theme preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    // Apply selected theme
    root.classList.add(theme)
  }, [theme])

  // Create context value with theme state and setter
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

/**
 * useTheme Hook
 * Custom hook to access theme context and controls.
 * 
 * @returns ThemeProviderState object containing:
 * - theme: Current theme value
 * - setTheme: Function to update theme
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 