import { ref } from 'vue'

// Fetches live public-repo metadata from the GitHub API, once per repo per page load,
// with a sessionStorage cache to stay well inside the 60 req/hr unauthenticated limit.
// Fails silently by design: cards render their static content whether or not this resolves.
const CACHE_PREFIX = 'gh-repo:'
const inFlight = new Map()

function readCache(repo) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + repo)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(repo, value) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + repo, JSON.stringify(value))
  } catch {
    // sessionStorage unavailable (private mode quota, etc.); just skip caching
  }
}

export function useGithubRepo(repo) {
  const data = ref(null)
  const isLoading = ref(false)

  if (!repo) return { data, isLoading }

  if (inFlight.has(repo)) return inFlight.get(repo)

  const result = { data, isLoading }
  inFlight.set(repo, result)

  const cached = readCache(repo)
  if (cached) {
    // 'unavailable' marks a repo the API previously 404'd (private / not pushed yet)
    data.value = cached === 'unavailable' ? null : cached
    return result
  }

  isLoading.value = true
  fetch(`https://api.github.com/repos/${repo}`)
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`)
      return res.json()
    })
    .then((json) => {
      const summary = {
        language: json.language,
        stars: json.stargazers_count,
        pushedAt: json.pushed_at,
        url: json.html_url,
      }
      data.value = summary
      writeCache(repo, summary)
    })
    .catch(() => {
      writeCache(repo, 'unavailable')
    })
    .finally(() => {
      isLoading.value = false
    })

  return result
}
