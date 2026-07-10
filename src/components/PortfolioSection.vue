<script setup>
import { ref, computed, reactive } from 'vue'
import { ExternalLink, Github, TrendingUp, Calendar, ChevronDown, Award } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import RepoStats from './RepoStats.vue'
import { projects } from '../data/projects.js'

const ALL_FILTER = 'All'
const selectedTech = ref(ALL_FILTER)
const CURRENT_YEAR = new Date().getFullYear()

const techFilters = computed(() => [ALL_FILTER, ...new Set(projects.flatMap((p) => p.tech))])

function latestYear(project) {
  if (!project.duration) return 0
  if (project.duration.includes('Present')) return CURRENT_YEAR

  const years = project.duration.match(/\d{4}/g)?.map(Number) ?? []
  return years.length ? Math.max(...years) : 0
}

const sortedProjects = computed(() =>
  projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => latestYear(b.project) - latestYear(a.project) || a.index - b.index)
    .map(({ project }) => project),
)

const filteredProjects = computed(() =>
  selectedTech.value === ALL_FILTER
    ? sortedProjects.value
    : sortedProjects.value.filter((p) => p.tech.includes(selectedTech.value)),
)

// Highlights collapse to a short preview by default; expand per-card on demand.
const expanded = reactive(new Set())
function toggleExpanded(id) {
  expanded.has(id) ? expanded.delete(id) : expanded.add(id)
}
const PREVIEW_COUNT = 2
</script>

<template>
  <section id="portfolio" class="section-anchor bg-slate-50 py-20 dark:bg-slate-900/50">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Portfolio" title="Selected Case Studies" />
      </div>
      <p v-reveal class="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Confidentiality-safe examples of Oracle ERP modernization, automation, and manufacturing workflow tools.
        Featured projects show the strongest match for Oracle / PL/SQL technical leadership roles.
      </p>

      <!-- Tech filter chips -->
      <div v-reveal class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="tech in techFilters"
          :key="tech"
          class="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
          :class="
            selectedTech === tech
              ? 'border-accent-700 bg-accent-700 text-white'
              : 'border-slate-300 bg-white text-slate-600 hover:border-accent-600 hover:text-accent-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-accent-600 dark:hover:text-accent-100'
          "
          @click="selectedTech = tech"
        >
          {{ tech }}
        </button>
      </div>

      <TransitionGroup v-reveal name="card" tag="div" class="grid gap-6 md:grid-cols-2">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-800 dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ project.title }}</h3>
            <span
              v-if="project.featured"
              class="inline-flex shrink-0 items-center gap-1 rounded-md border border-accent-100 bg-accent-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-800 dark:border-accent-900/60 dark:bg-accent-900/30 dark:text-accent-100"
            >
              <Award class="h-3 w-3" />
              Featured
            </span>
          </div>
          <p class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {{ project.context }}
          </p>

          <!-- Role / duration meta -->
          <div
            v-if="project.duration"
            class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            <span v-if="project.duration" class="inline-flex items-center gap-1.5">
              <Calendar class="h-3.5 w-3.5" />
              {{ project.duration }}
            </span>
          </div>

          <RepoStats v-if="project.repo" :repo="project.repo" />

          <dl class="mt-4 space-y-3 text-sm leading-relaxed">
            <div>
              <dt class="font-semibold text-slate-900 dark:text-white">Problem</dt>
              <dd class="mt-0.5 text-slate-600 dark:text-slate-400">{{ project.problem }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-900 dark:text-white">Solution</dt>
              <dd class="mt-0.5 text-slate-600 dark:text-slate-400">{{ project.solution }}</dd>
            </div>
            <div v-if="project.impact" class="flex items-start gap-2 rounded-lg bg-accent-50 p-3 dark:bg-accent-900/20">
              <TrendingUp class="mt-0.5 h-4 w-4 shrink-0 text-accent-700 dark:text-accent-600" />
              <dd class="font-medium text-accent-900 dark:text-accent-100">{{ project.impact }}</dd>
            </div>
          </dl>

          <!-- Key highlights -->
          <div v-if="project.highlights?.length" class="mt-4">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">Key Highlights</p>
            <ul class="mt-2 space-y-2">
              <li
                v-for="(item, i) in expanded.has(project.id) ? project.highlights : project.highlights.slice(0, PREVIEW_COUNT)"
                :key="i"
                class="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
              >
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
                {{ item }}
              </li>
            </ul>
            <button
              v-if="project.highlights.length > PREVIEW_COUNT"
              class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-600 dark:hover:text-accent-100"
              @click="toggleExpanded(project.id)"
            >
              <ChevronDown
                class="h-3.5 w-3.5 transition-transform"
                :class="{ 'rotate-180': expanded.has(project.id) }"
              />
              {{ expanded.has(project.id) ? 'Show less' : `Show ${project.highlights.length - PREVIEW_COUNT} more` }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="tech in project.tech"
              :key="tech"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-accent-50 hover:text-accent-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-900/40 dark:hover:text-accent-100"
              @click="selectedTech = tech"
            >
              {{ tech }}
            </button>
          </div>

          <div
            v-if="project.demoUrl || project.sourceUrl"
            class="mt-5 flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800"
          >
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-600 dark:hover:text-accent-100"
            >
              <ExternalLink class="h-4 w-4" />
              Live Demo
            </a>
            <a
              v-if="project.sourceUrl"
              :href="project.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Github class="h-4 w-4" />
              Source
            </a>
          </div>
        </article>
      </TransitionGroup>

      <p class="mt-8 text-sm text-slate-400 dark:text-slate-500">
        Case studies are described at a level that respects employer confidentiality — no internal data or live company systems are shown.
      </p>
    </div>
  </section>
</template>
