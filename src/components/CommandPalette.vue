<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {
  Search,
  Home,
  User,
  Wrench,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Mail,
  Download,
  Linkedin,
  SunMoon,
} from 'lucide-vue-next'
import { useCommandPalette } from '../composables/useCommandPalette.js'
import { useTheme } from '../composables/useTheme.js'
import { profile } from '../data/profile.js'

const { isOpen, openPalette, closePalette } = useCommandPalette()
const { toggleTheme } = useTheme()

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref(null)

function goToSection(id) {
  closePalette()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const commands = [
  { label: 'Go to Top', hint: 'Navigate', icon: Home, run: () => goToSection('top') },
  { label: 'About — Professional Summary', hint: 'Navigate', icon: User, run: () => goToSection('about') },
  { label: 'Skills — Technical Proficiency', hint: 'Navigate', icon: Wrench, run: () => goToSection('skills') },
  { label: 'Experience — Work History', hint: 'Navigate', icon: Briefcase, run: () => goToSection('experience') },
  { label: 'Portfolio — Case Studies', hint: 'Navigate', icon: FolderOpen, run: () => goToSection('portfolio') },
  { label: 'Education', hint: 'Navigate', icon: GraduationCap, run: () => goToSection('education') },
  { label: 'Contact', hint: 'Navigate', icon: Mail, run: () => goToSection('contact') },
  {
    label: 'Download CV (PDF)',
    hint: 'Action',
    icon: Download,
    run: () => {
      closePalette()
      const link = document.createElement('a')
      link.href = profile.resumeFile
      link.download = ''
      link.click()
    },
  },
  {
    label: 'Send Email',
    hint: 'Action',
    icon: Mail,
    run: () => {
      closePalette()
      window.location.href = `mailto:${profile.email}`
    },
  },
  {
    label: 'Open LinkedIn',
    hint: 'Action',
    icon: Linkedin,
    run: () => {
      closePalette()
      window.open(profile.linkedin, '_blank', 'noopener')
    },
  },
  {
    label: 'Toggle Dark / Light Mode',
    hint: 'Action',
    icon: SunMoon,
    run: () => {
      closePalette()
      toggleTheme()
    },
  },
]

const filteredCommands = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands
  return commands.filter(
    (cmd) => cmd.label.toLowerCase().includes(q) || cmd.hint.toLowerCase().includes(q),
  )
})

watch(isOpen, async (open) => {
  if (open) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

watch(query, () => {
  activeIndex.value = 0
})

function onKeydown(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    isOpen.value ? closePalette() : openPalette()
    return
  }
  if (!isOpen.value) return

  const total = filteredCommands.value.length
  if (event.key === 'Escape') {
    closePalette()
  } else if (event.key === 'ArrowDown' && total > 0) {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % total
  } else if (event.key === 'ArrowUp' && total > 0) {
    event.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + total) % total
  } else if (event.key === 'Enter') {
    filteredCommands.value[activeIndex.value]?.run()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/40 px-4 pt-[12vh] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        @click.self="closePalette()"
      >
        <div
          class="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div class="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-700">
            <Search class="h-4 w-4 shrink-0 text-slate-400" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Search sections or actions…"
              class="w-full bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
            />
            <kbd
              class="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700"
            >
              esc
            </kbd>
          </div>

          <ul class="max-h-72 overflow-y-auto p-2">
            <li v-for="(cmd, i) in filteredCommands" :key="cmd.label">
              <button
                class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm"
                :class="
                  i === activeIndex
                    ? 'bg-accent-50 text-accent-900 dark:bg-accent-900/40 dark:text-accent-100'
                    : 'text-slate-600 dark:text-slate-300'
                "
                @click="cmd.run()"
                @mousemove="activeIndex = i"
              >
                <component :is="cmd.icon" class="h-4 w-4 shrink-0 opacity-70" />
                <span class="truncate font-medium">{{ cmd.label }}</span>
                <span class="ml-auto shrink-0 text-xs text-slate-400">{{ cmd.hint }}</span>
              </button>
            </li>
            <li v-if="!filteredCommands.length" class="px-3 py-8 text-center text-sm text-slate-400">
              No matching commands
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
