// v-reveal — fades and slides an element in the first time it scrolls into view.
// Usage: v-reveal or v-reveal="{ delay: 150 }" (delay in ms, for staggering cards).
// Skipped entirely when the user prefers reduced motion.
export const reveal = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('reveal')
    const delay = binding.value?.delay
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          observer.disconnect()
          clearTimeout(el._revealFailsafe)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    el._revealObserver = observer

    // Failsafe: if the observer never fires (rare rendering edge cases),
    // never leave in-viewport content hidden.
    el._revealFailsafe = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('reveal-visible')
      }
    }, 3000)
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
    clearTimeout(el._revealFailsafe)
  },
}
