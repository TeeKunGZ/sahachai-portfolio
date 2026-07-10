<script setup>
import { Database, Code2, ClipboardList, UsersRound } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import { skillGroups } from '../data/skills.js'

const icons = {
  database: Database,
  code: Code2,
  clipboard: ClipboardList,
  users: UsersRound,
}
</script>

<template>
  <section id="skills" class="section-anchor bg-slate-50 py-20 dark:bg-slate-900/50">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Skills" title="Technical Proficiency" />
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.id"
          v-reveal="{ delay: i * 120 }"
          class="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(14,116,144,0.12)] dark:bg-slate-900 dark:hover:shadow-[0_18px_45px_rgba(6,182,212,0.10)]"
          :class="
            group.id === 'oracle'
              ? 'md:col-span-2 lg:col-span-3 border-accent-200 shadow-[0_18px_45px_rgba(14,116,144,0.10)] hover:border-accent-300 dark:border-accent-900/70 dark:shadow-[0_18px_45px_rgba(0,0,0,0.24)] dark:hover:border-accent-700'
              : 'border-slate-200 hover:border-accent-100 dark:border-slate-800 dark:hover:border-accent-900'
          "
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-100"
              :class="{ 'h-12 w-12': group.id === 'oracle' }"
            >
              <component :is="icons[group.icon]" class="h-5 w-5" />
            </span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white">{{ group.title }}</h3>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ group.subtitle }}</p>
            </div>
          </div>
          <p
            v-if="group.summary"
            class="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {{ group.summary }}
          </p>
          <ul class="mt-5 grid gap-2.5" :class="group.id === 'oracle' ? 'sm:grid-cols-2' : ''">
            <li v-for="skill in group.skills" :key="skill" class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600" />
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
