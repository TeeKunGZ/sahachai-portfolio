<script setup>
import { computed } from 'vue'
import { Star, History, Github } from 'lucide-vue-next'
import { useGithubRepo } from '../composables/useGithubRepo.js'

const props = defineProps({
  repo: { type: String, required: true },
})

const { data, isLoading } = useGithubRepo(props.repo)

const LANGUAGE_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

const languageColor = computed(() => LANGUAGE_COLORS[data.value?.language] ?? '#94a3b8')

const updatedAgo = computed(() => {
  if (!data.value?.pushedAt) return null
  const days = Math.floor((Date.now() - new Date(data.value.pushedAt)) / 86_400_000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
})
</script>

<template>
  <!-- Skeleton while fetching -->
  <div v-if="isLoading" class="mt-3 h-5 w-48 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />

  <!-- Live repo stats; renders nothing when the repo is private/unreachable -->
  <div
    v-else-if="data"
    class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400"
  >
    <span class="inline-flex items-center gap-1.5">
      <Github class="h-3.5 w-3.5" />
      Live from GitHub
    </span>
    <span v-if="data.language" class="inline-flex items-center gap-1.5">
      <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: languageColor }" />
      {{ data.language }}
    </span>
    <span class="inline-flex items-center gap-1">
      <Star class="h-3.5 w-3.5" />
      {{ data.stars }}
    </span>
    <span v-if="updatedAgo" class="inline-flex items-center gap-1">
      <History class="h-3.5 w-3.5" />
      Updated {{ updatedAgo }}
    </span>
  </div>
</template>
