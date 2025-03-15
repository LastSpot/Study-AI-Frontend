/**
 * Mobile Device Detection Hook
 * A custom React hook that detects if the current viewport width matches mobile device dimensions.
 * Uses a media query to track viewport changes and updates state accordingly.
 */
import * as React from "react"

// Breakpoint for mobile devices in pixels
const MOBILE_BREAKPOINT = 768

/**
 * useIsMobile Hook
 * @returns boolean - True if the viewport width is less than MOBILE_BREAKPOINT
 * 
 * Features:
 * - Automatically updates when window is resized
 * - Uses MediaQueryList for efficient change detection
 * - Cleans up event listener on unmount
 * - Returns undefined during initial render to prevent layout shifts
 */
export function useIsMobile() {
  // State starts as undefined to prevent hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create media query list for mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Update state when viewport changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add listener and set initial value
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Clean up listener on unmount
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Convert undefined to false for consistent boolean return
  return !!isMobile
}
