<script setup>
import { ref, computed } from 'vue'
import { ExternalLink, Github, TrendingUp } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import RepoStats from './RepoStats.vue'
import { projects } from '../data/projects.js'

const ALL_FILTER = 'All'
const selectedTech = ref(ALL_FILTER)

const techFilters = computed(() => [ALL_FILTER, ...new Set(projects.flatMap((p) => p.tech))])

const filteredProjects = computed(() =>
  selectedTech.value === ALL_FILTER
    ? projects
    : projects.filter((p) => p.tech.includes(selectedTech.value)),
)
</script>

<template>
  <section id="portfolio" class="section-anchor bg-slate-50 py-20 dark:bg-slate-900/50">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Portfolio" title="Selected Case Studies" />
      </div>

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
          class="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-900"
        >
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ project.title }}</h3>
          <p class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {{ project.context }}
          </p>

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
