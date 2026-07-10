<script setup>
import { GraduationCap } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import { education } from '../data/education.js'
</script>

<template>
  <section id="education" class="section-anchor py-20">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Education" title="Education" />
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="(item, i) in education"
          :key="item.id"
          v-reveal="{ delay: i * 120 }"
          class="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-900"
        >
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-100">
            <GraduationCap class="h-5 w-5" />
          </span>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white">{{ item.degree }}</h3>
            <p class="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{{ item.institution }}</p>
            <p class="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
              Graduated {{ item.year }} - GPA {{ item.gpa }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
