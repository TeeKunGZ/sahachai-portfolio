<script setup>
import { Mail, Linkedin, Github, MapPin, Download } from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'
</script>

<template>
  <section id="contact" class="section-anchor bg-slate-900 py-20">
    <div class="section-shell">
      <div v-reveal class="mb-10">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent-100">Contact</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-white">Let's Talk</h2>
      </div>

      <p v-reveal="{ delay: 100 }" class="max-w-2xl text-slate-300">
        Open to opportunities in Oracle development, enterprise systems, and technical leadership.
        The fastest way to reach me is by email or LinkedIn; full contact details are in the downloadable CV.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          :href="`mailto:${profile.email}`"
          class="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          <Mail class="h-4 w-4" />
          {{ profile.email }}
        </a>
        <a
          :href="profile.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
        >
          <Linkedin class="h-4 w-4" />
          LinkedIn
        </a>
        <a
          v-if="profile.github"
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
        >
          <Github class="h-4 w-4" />
          GitHub
        </a>
        <a
          :href="profile.resumeFile"
          download
          class="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
        >
          <Download class="h-4 w-4" />
          Download CV
        </a>
      </div>

      <p class="mt-8 inline-flex items-center gap-1.5 text-sm text-slate-400">
        <MapPin class="h-4 w-4" />
        {{ profile.location }}
      </p>
    </div>
  </section>
</template>
