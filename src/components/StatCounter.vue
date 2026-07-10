<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  duration: { type: Number, default: 1200 },
})

const display = ref(0)
const root = ref(null)
let observer = null

function animate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.value
    return
  }
  const start = performance.now()
  function tick(now) {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    display.value = Math.round(eased * props.value)
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

let failsafe = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animate()
        observer.disconnect()
        clearTimeout(failsafe)
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(root.value)

  // Failsafe: never leave the stat stuck at 0 if the observer doesn't fire.
  failsafe = setTimeout(() => {
    if (display.value === 0) display.value = props.value
  }, 3000)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(failsafe)
})
</script>

<template>
  <div ref="root" class="text-center md:text-left">
    <p class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
      {{ display }}<span class="text-accent-700 dark:text-accent-600">{{ suffix }}</span>
    </p>
    <p class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ label }}</p>
  </div>
</template>
