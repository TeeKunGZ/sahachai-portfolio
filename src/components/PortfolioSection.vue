<script setup>
import { ref, computed, reactive, nextTick, watch } from 'vue'
import {
  ExternalLink,
  Github,
  TrendingUp,
  Calendar,
  ChevronDown,
  Award,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Database,
  FileSpreadsheet,
  GitCompare,
  Image,
  LayoutDashboard,
} from 'lucide-vue-next'
import SectionHeading from './SectionHeading.vue'
import RepoStats from './RepoStats.vue'
import { projects } from '../data/projects.js'

const ALL_FILTER = 'All'
const selectedTech = ref(ALL_FILTER)
const CURRENT_YEAR = new Date().getFullYear()

const visualIcons = {
  bell: Bell,
  bot: Bot,
  database: Database,
  fileSpreadsheet: FileSpreadsheet,
  gitCompare: GitCompare,
  image: Image,
  layoutDashboard: LayoutDashboard,
}

const techFilters = computed(() => [ALL_FILTER, ...new Set(projects.flatMap((p) => p.tech))])

function latestYear(project) {
  if (!project.duration) return 0
  if (project.duration.includes('Present')) return CURRENT_YEAR

  const years = project.duration.match(/\d{4}/g)?.map(Number) ?? []
  return years.length ? Math.max(...years) : 0
}

const sortedProjects = computed(() =>
  projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => latestYear(b.project) - latestYear(a.project) || a.index - b.index)
    .map(({ project }) => project),
)

const filteredProjects = computed(() =>
  selectedTech.value === ALL_FILTER
    ? sortedProjects.value
    : sortedProjects.value.filter((p) => p.tech.includes(selectedTech.value)),
)

const galleryRef = ref(null)
const activeIndex = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartScrollLeft = ref(0)
const dragStartIndex = ref(0)
const DRAG_SNAP_THRESHOLD = 10

const progressWidth = computed(() => {
  const total = filteredProjects.value.length
  if (total <= 1) return total === 1 ? '100%' : '0%'

  return `${(activeIndex.value / (total - 1)) * 100}%`
})

function updateActiveProject() {
  const gallery = galleryRef.value
  if (!gallery) return

  const cards = [...gallery.querySelectorAll('[data-project-card]')]
  if (!cards.length) {
    activeIndex.value = 0
    return
  }

  const center = gallery.scrollLeft + gallery.clientWidth / 2
  let closestIndex = 0
  let closestDistance = Infinity

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(center - cardCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}

function scrollGallery(direction) {
  const gallery = galleryRef.value
  if (!gallery) return

  const card = gallery.querySelector('[data-project-card]')
  const cardWidth = card?.getBoundingClientRect().width ?? gallery.clientWidth * 0.86
  gallery.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' })
  window.setTimeout(updateActiveProject, 420)
}

function scrollToProject(index) {
  const gallery = galleryRef.value
  if (!gallery) return

  const cards = [...gallery.querySelectorAll('[data-project-card]')]
  const target = cards[Math.max(0, Math.min(index, cards.length - 1))]
  if (!target) return

  const left = target.offsetLeft - (gallery.clientWidth - target.offsetWidth) / 2
  gallery.scrollTo({ left, behavior: 'smooth' })
  activeIndex.value = Math.max(0, Math.min(index, cards.length - 1))
}

function isInteractiveTarget(target) {
  return target instanceof Element && Boolean(target.closest('button, a'))
}

function startGalleryDrag(event) {
  const gallery = galleryRef.value
  if (!gallery || event.button !== 0 || isInteractiveTarget(event.target)) return

  isDragging.value = true
  dragStartX.value = event.pageX
  dragStartScrollLeft.value = gallery.scrollLeft
  dragStartIndex.value = activeIndex.value
  gallery.setPointerCapture?.(event.pointerId)
}

function dragGallery(event) {
  const gallery = galleryRef.value
  if (!gallery || !isDragging.value) return

  event.preventDefault()
  const distance = event.pageX - dragStartX.value
  gallery.scrollLeft = dragStartScrollLeft.value - distance
  updateActiveProject()
}

function stopGalleryDrag(event) {
  if (!isDragging.value) return

  const dragDistance = event.pageX - dragStartX.value
  isDragging.value = false
  galleryRef.value?.releasePointerCapture?.(event.pointerId)

  if (Math.abs(dragDistance) >= DRAG_SNAP_THRESHOLD) {
    scrollToProject(dragStartIndex.value + (dragDistance < 0 ? 1 : -1))
    return
  }

  scrollToProject(activeIndex.value)
}

function setTechFilter(tech) {
  selectedTech.value = tech
}

function visualIcon(project) {
  return visualIcons[project.visual?.icon] ?? Database
}

const zigzagPathCache = new Map()
const GRID_SIZE = 24

function seededRandom(seed) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

function hashPathSeed(value) {
  return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 2166136261)
}

function zigzagPath(project, index) {
  const cacheKey = `${project.id}-${index}`
  if (zigzagPathCache.has(cacheKey)) return zigzagPathCache.get(cacheKey)

  const random = seededRandom(hashPathSeed(cacheKey))
  const hasMetric = Boolean(project.metric)
  const minY = GRID_SIZE
  const maxY = GRID_SIZE * 3
  let x = 0
  let y = GRID_SIZE * 2
  const targetX = GRID_SIZE * (hasMetric ? 12 : 15)
  const points = [{ x, y }]

  const moveHorizontal = (steps) => {
    x += steps * GRID_SIZE
    points.push({ x, y })
  }

  const moveVertical = (nextY) => {
    y = Math.max(minY, Math.min(maxY, nextY))
    points.push({ x, y })
  }

  const turn = () => {
    const direction = y === minY ? 1 : y === maxY ? -1 : random() > 0.5 ? 1 : -1
    moveVertical(y + direction * GRID_SIZE)
  }

  moveHorizontal(2)
  turn()
  moveHorizontal(1 + Math.round(random()))
  turn()
  moveHorizontal(2)

  if (random() > 0.45) {
    turn()
    moveHorizontal(1 + Math.round(random()))
    turn()
  }

  while (x < targetX) {
    const remainingSteps = Math.round((targetX - x) / GRID_SIZE)
    moveHorizontal(Math.min(2, remainingSteps))
    if (x < targetX) turn()
  }

  const segments = points.slice(1).map((point, i) => {
    const previous = points[i]
    const horizontal = previous.y === point.y
    return {
      id: `${cacheKey}-segment-${i}`,
      horizontal,
      style: horizontal
        ? {
            left: `${previous.x}px`,
            top: `${previous.y}px`,
            width: `${point.x - previous.x}px`,
            '--segment-delay': `${i * 0.1}s`,
          }
        : {
            left: `${previous.x}px`,
            top: `${Math.min(previous.y, point.y)}px`,
            height: `${Math.abs(point.y - previous.y)}px`,
            '--segment-delay': `${i * 0.1}s`,
            '--segment-origin': point.y > previous.y ? 'top' : 'bottom',
          },
    }
  })

  const nodes = points.slice(1).map((point, i) => ({
    id: `${cacheKey}-node-${i}`,
    style: {
      left: `${point.x}px`,
      top: `${point.y}px`,
      '--segment-delay': `${i * 0.1 + 0.08}s`,
    },
  }))

  const path = { segments, nodes }
  zigzagPathCache.set(cacheKey, path)
  return path
}

watch(selectedTech, async () => {
  activeIndex.value = 0
  await nextTick()
  galleryRef.value?.scrollTo({ left: 0, behavior: 'smooth' })
  updateActiveProject()
})

// Highlights collapse to a short preview by default; expand per-card on demand.
const expanded = reactive(new Set())
function toggleExpanded(id) {
  expanded.has(id) ? expanded.delete(id) : expanded.add(id)
}
const PREVIEW_COUNT = 2
</script>

<template>
  <section id="portfolio" class="section-anchor bg-slate-50 py-20 dark:bg-slate-900/50">
    <div class="section-shell">
      <div v-reveal>
        <SectionHeading eyebrow="Portfolio" title="Selected Case Studies" />
      </div>
      <p v-reveal class="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Confidentiality-safe examples of Oracle ERP modernization, automation, and manufacturing workflow tools.
        Featured projects show the strongest match for Oracle / PL/SQL technical leadership roles.
      </p>

      <!-- Tech filter chips -->
      <div v-reveal class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="tech in techFilters"
          :key="tech"
          class="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
          :class="
            selectedTech === tech
              ? 'border-accent-700 bg-accent-700 text-white'
              : 'border-slate-300 bg-white text-slate-600 hover:border-accent-600 hover:text-accent-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-accent-600 dark:hover:text-accent-100'
          "
          @click="setTechFilter(tech)"
        >
          {{ tech }}
        </button>
      </div>

      <div v-reveal class="mb-5 flex items-center justify-between gap-4">
        <div class="gallery-progress relative h-2.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            class="gallery-progress-fill h-full rounded-full transition-[width] duration-500 ease-out"
            :style="{ width: progressWidth }"
          />
          <div class="absolute inset-0 flex items-center justify-between">
            <button
              v-for="(project, index) in filteredProjects"
              :key="index"
              class="gallery-progress-node"
              :class="{ 'gallery-progress-node-active': index <= activeIndex }"
              type="button"
              :aria-label="`Go to ${project.visual?.label ?? project.title}`"
              :data-label="project.visual?.label ?? project.title"
              @click="scrollToProject(index)"
            />
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <span class="gallery-progress-count min-w-12 text-center text-[11px] font-bold tabular-nums text-slate-500 dark:text-slate-300">
            {{ activeIndex + 1 }} / {{ filteredProjects.length }}
          </span>
        </div>
      </div>

      <div v-reveal class="relative">
        <button
          class="gallery-paddle gallery-paddle-left"
          aria-label="Previous projects"
          @click="scrollGallery(-1)"
        >
          <ArrowLeft class="h-5 w-5" />
        </button>
        <button
          class="gallery-paddle gallery-paddle-right"
          aria-label="Next projects"
          @click="scrollGallery(1)"
        >
          <ArrowRight class="h-5 w-5" />
        </button>

        <div
          ref="galleryRef"
          class="portfolio-gallery -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth sm:-mx-8"
          :class="{ 'is-dragging': isDragging }"
          @pointerdown="startGalleryDrag"
          @pointermove="dragGallery"
          @pointerup="stopGalleryDrag"
          @pointercancel="stopGalleryDrag"
          @pointerleave="stopGalleryDrag"
          @scroll.passive="updateActiveProject"
        >
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            data-project-card
          class="project-card min-h-[34rem] w-[var(--gallery-card-width)] shrink-0 snap-center snap-always flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-800 dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
          :class="{ 'project-card-active': index === activeIndex, 'project-card-muted': index !== activeIndex }"
        >
            <div class="project-visual" :data-accent="project.visual?.accent ?? 'cyan'">
              <div class="project-visual-grid" />
              <div
                class="project-visual-pulse"
                :class="{ 'project-visual-pulse-metric': project.metric }"
                aria-hidden="true"
              >
                <span
                  v-for="segment in zigzagPath(project, index).segments"
                  :key="segment.id"
                  class="project-visual-segment"
                  :class="{ 'project-visual-segment-vertical': !segment.horizontal }"
                  :style="segment.style"
                />
                <span
                  v-for="node in zigzagPath(project, index).nodes"
                  :key="node.id"
                  class="project-visual-node"
                  :style="node.style"
                />
              </div>
              <div class="relative flex h-full items-center justify-between gap-4">
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {{ project.visual?.label ?? 'Case Study' }}
                  </p>
                  <div v-if="project.metric" class="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/75 px-3 py-2 text-sm font-bold text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/55 dark:text-white">
                    <span>{{ project.metric.from }}</span>
                    <ArrowRight class="h-3.5 w-3.5 text-accent-700 dark:text-accent-300" />
                    <span>{{ project.metric.to }}</span>
                    <span class="rounded bg-accent-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent-800 dark:bg-accent-900/70 dark:text-accent-100">
                      {{ project.metric.label }}
                    </span>
                  </div>
                </div>
                <div class="project-visual-icon">
                  <component :is="visualIcon(project)" class="h-7 w-7" />
                </div>
              </div>
            </div>

            <div class="flex items-start justify-between gap-3">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ project.title }}</h3>
              <span
                v-if="project.featured"
                class="inline-flex shrink-0 items-center gap-1 rounded-md border border-accent-100 bg-accent-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-800 dark:border-accent-900/60 dark:bg-accent-900/30 dark:text-accent-100"
              >
                <Award class="h-3 w-3" />
                Featured
              </span>
            </div>
            <p class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {{ project.context }}
            </p>

          <!-- Role / duration meta -->
          <div
            v-if="project.duration"
            class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            <span v-if="project.duration" class="inline-flex items-center gap-1.5">
              <Calendar class="h-3.5 w-3.5" />
              {{ project.duration }}
            </span>
          </div>

          <RepoStats v-if="project.repo" :repo="project.repo" />

          <dl class="mt-4 space-y-3 text-sm leading-relaxed">
            <div>
              <dt class="font-semibold text-slate-900 dark:text-white">Problem</dt>
              <dd class="mt-0.5 text-slate-600 dark:text-slate-400">{{ project.problem }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-slate-900 dark:text-white">Solution</dt>
              <dd class="mt-0.5 text-slate-600 dark:text-slate-400">{{ project.solution }}</dd>
            </div>
            <div v-if="project.impact" class="flex items-start gap-2 rounded-lg bg-accent-50 p-3 dark:bg-accent-900/20">
              <TrendingUp class="mt-0.5 h-4 w-4 shrink-0 text-accent-700 dark:text-accent-600" />
              <dd class="font-medium text-accent-900 dark:text-accent-100">{{ project.impact }}</dd>
            </div>
          </dl>

          <!-- Key highlights -->
          <div v-if="project.highlights?.length" class="mt-4">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">Key Highlights</p>
            <ul class="mt-2 space-y-2">
              <li
                v-for="(item, i) in expanded.has(project.id) ? project.highlights : project.highlights.slice(0, PREVIEW_COUNT)"
                :key="i"
                class="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
              >
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" />
                {{ item }}
              </li>
            </ul>
            <button
              v-if="project.highlights.length > PREVIEW_COUNT"
              class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-600 dark:hover:text-accent-100"
              @click="toggleExpanded(project.id)"
            >
              <ChevronDown
                class="h-3.5 w-3.5 transition-transform"
                :class="{ 'rotate-180': expanded.has(project.id) }"
              />
              {{ expanded.has(project.id) ? 'Show less' : `Show ${project.highlights.length - PREVIEW_COUNT} more` }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="tech in project.tech"
              :key="tech"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-accent-50 hover:text-accent-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-accent-900/40 dark:hover:text-accent-100"
              @click="setTechFilter(tech)"
            >
              {{ tech }}
            </button>
          </div>

          <div
            v-if="project.demoUrl || project.sourceUrl"
            class="mt-5 flex gap-4 border-t border-slate-100 pt-4 dark:border-slate-800"
          >
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-900 dark:text-accent-600 dark:hover:text-accent-100"
            >
              <ExternalLink class="h-4 w-4" />
              Live Demo
            </a>
            <a
              v-if="project.sourceUrl"
              :href="project.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Github class="h-4 w-4" />
              Source
            </a>
          </div>
          </article>
        </div>
      </div>

      <p class="mt-8 text-sm text-slate-400 dark:text-slate-500">
        Case studies are described at a level that respects employer confidentiality — no internal data or live company systems are shown.
      </p>
    </div>
  </section>
</template>
