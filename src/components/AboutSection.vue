<script setup>
import { Database, Gauge, Workflow } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'

const strengthIcons = [Database, Gauge, Workflow]
</script>

<template>
  <section id="about" class="section-anchor py-20">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="About" title="Professional Summary" />
      </div>
      <p v-reveal="{ delay: 100 }" class="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        {{ profile.summary }}
      </p>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <article
          v-for="(strength, i) in profile.strengths"
          :key="strength.title"
          v-reveal="{ delay: 160 + i * 100 }"
          class="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-[0_14px_34px_rgba(14,116,144,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-900/70 dark:hover:shadow-[0_14px_34px_rgba(6,182,212,0.08)]"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 transition-colors duration-150 ease-out group-hover:bg-accent-700 group-hover:text-white dark:bg-accent-900/40 dark:text-accent-100 dark:group-hover:bg-accent-700"
            >
              <component :is="strengthIcons[i]" class="h-4 w-4" />
            </span>
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ strength.title }}</p>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ strength.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
