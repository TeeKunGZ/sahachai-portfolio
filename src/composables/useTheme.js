import { ref, watchEffect } from 'vue'

// Singleton theme state shared across all components.
// Initial value: saved preference first, then OS color scheme.
const savedTheme = localStorage.getItem('theme')
const isDark = ref(
  savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches,
)

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  return { isDark, toggleTheme }
}
