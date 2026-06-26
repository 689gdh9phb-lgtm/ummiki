'use client'

import { useEffect } from 'react'

/**
 * Basic content-protection deterrent.
 * NOTE: Client-side code can never be fully protected, but this blocks
 * casual copying: right-click, text selection, drag, and DevTools shortcuts.
 */
export function ContentProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault()
    const blockDragStart = (e: DragEvent) => e.preventDefault()

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return
      }
      // Ctrl/Cmd+Shift+I/J/C (devtools), Ctrl/Cmd+U (view source), Ctrl/Cmd+S (save)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault()
        return
      }
      if ((e.ctrlKey || e.metaKey) && ['u', 's'].includes(key)) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockContextMenu)
    document.addEventListener('dragstart', blockDragStart)
    document.addEventListener('keydown', blockKeys)

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu)
      document.removeEventListener('dragstart', blockDragStart)
      document.removeEventListener('keydown', blockKeys)
    }
  }, [])

  return null
}
