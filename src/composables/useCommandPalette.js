import { ref } from 'vue'

// Singleton open/closed state for the Ctrl+K command palette,
// shared between NavBar (trigger button) and CommandPalette (the dialog).
const isOpen = ref(false)

export function useCommandPalette() {
  function openPalette() {
    isOpen.value = true
  }
  function closePalette() {
    isOpen.value = false
  }
  return { isOpen, openPalette, closePalette }
}
