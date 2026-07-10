<script setup>
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-800 bg-slate-900 py-6">
    <div class="section-shell flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
      <p>(c) {{ year }} {{ profile.name }}</p>
      <p>Built with Vue 3 + Tailwind CSS - Deployed on Vercel</p>
    </div>
  </footer>
</template>
