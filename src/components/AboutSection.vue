<script setup>
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'
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
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p class="text-sm font-bold text-slate-900 dark:text-white">{{ strength.title }}</p>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ strength.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
