<script setup>
import { ref, watch } from 'vue'
import { Download, Linkedin, MapPin } from 'lucide-vue-next'
import StatCounter from './StatCounter.vue'
import { profile } from '../data/profile.js'

const imageFailed = ref(false)

watch(
  () => profile.photo,
  () => {
    imageFailed.value = false
  },
)
</script>

<template>
  <section
    id="top"
    class="relative overflow-hidden border-b border-slate-200 bg-white pb-20 pt-32 dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="control-grid pointer-events-none absolute inset-0 opacity-45" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent-50 to-transparent dark:from-slate-900" />
    <div class="scan-line pointer-events-none absolute left-0 top-24 h-px w-full" />
    <div class="led-trace led-trace-x left-0 top-[9.5rem]" />
    <div class="led-trace led-trace-x led-trace-delay-1 left-0 top-[22rem]" />
    <div class="led-trace led-trace-y led-trace-delay-2 right-[18%] top-0" />

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
        <div class="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
          <span
            v-for="item in profile.oracleProof"
            :key="item"
            class="inline-flex items-center rounded-md border border-accent-100 bg-white/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-800 shadow-sm backdrop-blur dark:border-accent-900/60 dark:bg-slate-900/80 dark:text-accent-100"
          >
            {{ item }}
          </span>
        </div>

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
      <div class="profile-orbit relative shrink-0">
        <div class="orbit-dot orbit-dot-a" />
        <div class="orbit-dot orbit-dot-b" />
        <div class="orbit-label orbit-label-top" data-accent="indigo">PL/SQL</div>
        <div class="orbit-label orbit-label-right" data-accent="cyan">Forms</div>
        <div class="orbit-label orbit-label-bottom" data-accent="emerald">Reports</div>
        <div class="orbit-label orbit-label-left" data-accent="amber">SQL Tuning</div>
        <img
          v-if="profile.photo && !imageFailed"
          :src="profile.photo"
          :alt="profile.name"
          class="profile-core h-52 w-52 rounded-full border-4 border-white object-cover shadow-xl ring-8 ring-accent-100/60 dark:border-slate-800 dark:ring-accent-900/30 md:h-64 md:w-64"
          @error="imageFailed = true"
        />
        <div
          v-else
          class="profile-core flex h-52 w-52 items-center justify-center rounded-full border-4 border-white bg-accent-800 shadow-xl ring-8 ring-accent-100/60 dark:border-slate-800 dark:ring-accent-900/30 md:h-64 md:w-64"
        >
          <span class="text-6xl font-bold text-white">{{ profile.initials }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
