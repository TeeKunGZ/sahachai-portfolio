<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Download, Menu, X, Search, Sun, Moon } from 'lucide-vue-next'
import { profile } from '../data/profile.js'
import { useTheme } from '../composables/useTheme.js'
import { useCommandPalette } from '../composables/useCommandPalette.js'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const { isDark, toggleTheme } = useTheme()
const { openPalette } = useCommandPalette()

const activeId = ref('')
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const scrollProgress = ref(0)

let observer = null

function onScroll() {
  isScrolled.value = window.scrollY > 8
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Scroll-spy: highlight the nav link of the section currently in view.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  for (const link of links) {
    const el = document.getElementById(link.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-200"
    :class="
      isScrolled
        ? 'border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90'
        : 'border-transparent bg-white/60 backdrop-blur dark:bg-slate-950/60'
    "
  >
    <nav class="section-shell flex h-16 items-center justify-between">
      <a href="#top" class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        Sahachai.S<span class="text-accent-700 dark:text-accent-600"></span>
      </a>

      <!-- Desktop links -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="
            activeId === link.id
              ? 'text-accent-700 dark:text-accent-100'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          "
        >
          {{ link.label }}
        </a>

        <!-- Command palette trigger -->
        <button
          class="ml-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
          aria-label="Open command palette"
          @click="openPalette()"
        >
          <Search class="h-3.5 w-3.5" />
          <kbd class="font-sans">Ctrl K</kbd>
        </button>

        <!-- Theme toggle -->
        <button
          class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Toggle dark mode"
          @click="toggleTheme()"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>

        <a
          :href="profile.resumeFile"
          download
          class="ml-2 inline-flex items-center gap-2 rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-800"
        >
          <Download class="h-4 w-4" />
          Download CV
        </a>
      </div>

      <!-- Mobile: theme toggle + menu button -->
      <div class="flex items-center gap-1 md:hidden">
        <button
          class="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
          @click="toggleTheme()"
        >
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
        <button
          class="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <X v-if="isMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <!-- Reading progress bar -->
    <div
      class="absolute bottom-0 left-0 h-0.5 bg-accent-600 transition-[width] duration-150 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    />

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
      <div class="section-shell flex flex-col gap-1 py-3">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-md px-3 py-2 text-sm font-medium"
          :class="
            activeId === link.id
              ? 'bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-100'
              : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
          "
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </a>
        <a
          :href="profile.resumeFile"
          download
          class="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-700 px-4 py-2.5 text-sm font-semibold text-white"
          @click="isMenuOpen = false"
        >
          <Download class="h-4 w-4" />
          Download CV
        </a>
      </div>
    </div>
  </header>
</template>
