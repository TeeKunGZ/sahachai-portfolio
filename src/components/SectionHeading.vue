<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="mb-10">
    <p class="text-sm font-semibold uppercase tracking-widest text-accent-700 dark:text-accent-600">{{ eyebrow }}</p>
    <h2 class="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{{ title }}</h2>
  </div>
</template>
