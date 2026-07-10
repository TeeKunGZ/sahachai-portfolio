<script setup>
import { Download, Linkedin, MapPin } from 'lucide-vue-next'
import StatCounter from './StatCounter.vue'
import { profile } from '../data/profile.js'
</script>

<template>
  <section
    id="top"
    class="relative overflow-hidden bg-gradient-to-b from-accent-50/70 to-white pb-20 pt-32 dark:from-slate-900 dark:to-slate-950"
  >
    <!-- Decorative background blobs -->
    <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl dark:bg-accent-900/20" />
    <div class="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/10" />

    <div class="section-shell relative flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
      <div class="max-w-xl text-center md:text-left">
        <p
          class="inline-flex items-center gap-1.5 rounded-full border border-accent-100 bg-white px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
        >
          <MapPin class="h-3.5 w-3.5 text-accent-700 dark:text-accent-600" />
          {{ profile.location }}
        </p>
        <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {{ profile.name }}
        </h1>
        <p class="mt-3 text-xl font-semibold text-accent-700 dark:text-accent-600">{{ profile.title }}</p>
        <p class="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">{{ profile.tagline }}</p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <a
            :href="profile.resumeFile"
            download
            class="inline-flex items-center gap-2 rounded-lg bg-accent-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-800"
          >
            <Download class="h-4 w-4" />
            Download CV (PDF)
          </a>
          <a
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent-700 hover:text-accent-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-accent-600 dark:hover:text-accent-100"
          >
            <Linkedin class="h-4 w-4" />
            LinkedIn
          </a>
        </div>

        <!-- Animated quick stats -->
        <div class="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-8 dark:border-slate-800">
          <StatCounter
            v-for="stat in profile.stats"
            :key="stat.label"
            :value="stat.value"
            :suffix="stat.suffix"
            :label="stat.label"
          />
        </div>
      </div>

      <!-- Photo / initials placeholder -->
      <div class="shrink-0">
        <img
          v-if="profile.photo"
          :src="profile.photo"
          :alt="profile.name"
          class="h-44 w-44 rounded-full border-4 border-white object-cover shadow-lg ring-8 ring-accent-100/60 dark:border-slate-800 dark:ring-accent-900/30 md:h-52 md:w-52"
        />
        <div
          v-else
          class="flex h-44 w-44 items-center justify-center rounded-full border-4 border-white bg-accent-800 shadow-lg ring-8 ring-accent-100/60 dark:border-slate-800 dark:ring-accent-900/30 md:h-52 md:w-52"
        >
          <span class="text-5xl font-bold text-white">{{ profile.initials }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
