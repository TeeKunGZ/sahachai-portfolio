<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const SHOW_AFTER_PX = 600

const isVisible = ref(false)

function onScroll() {
  isVisible.value = window.scrollY > SHOW_AFTER_PX
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition duration-200"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="isVisible"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent-700 text-white shadow-lg transition-colors hover:bg-accent-800"
      @click="scrollToTop"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  </Transition>
</template>
