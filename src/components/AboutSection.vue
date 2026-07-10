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
    </div>
  </section>
</template>
