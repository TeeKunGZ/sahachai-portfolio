<script setup>
import SectionHeading from './SectionHeading.vue'
import { experiences } from '../data/experience.js'
</script>

<template>
  <section id="experience" class="section-anchor py-20">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Experience" title="Work Experience" />
      </div>
      <ol class="relative space-y-12 border-l-2 border-slate-200 pl-8 dark:border-slate-800">
        <li v-for="exp in experiences" :key="exp.id" v-reveal class="relative">
          <!-- Timeline dot -->
          <span
            class="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white shadow dark:border-slate-950"
            :class="exp.current ? 'bg-accent-600' : 'bg-slate-300 dark:bg-slate-700'"
          />
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ exp.role }}</h3>
            <p
              class="text-sm font-semibold"
              :class="exp.current ? 'text-accent-700 dark:text-accent-600' : 'text-slate-400 dark:text-slate-500'"
            >
              {{ exp.period }}
            </p>
          </div>
          <p v-if="exp.subtitle" class="mt-0.5 text-sm font-medium text-accent-700 dark:text-accent-600">{{ exp.subtitle }}</p>
          <p class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{{ exp.company }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="(item, i) in exp.highlights" :key="i" class="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
              {{ item }}
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
