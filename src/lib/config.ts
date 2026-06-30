import type { CrossingConfig } from '../types'

export const KADUBEESANAHALLI: CrossingConfig = {
  crossingId: 'kadubeesanahalli',
  name: 'Kadubeesanahalli Railway Crossing',
  latitude: 12.948297,
  longitude: 77.705787,
  stationA: { code: 'KJM', name: 'Krishnarajapuram' },
  stationB: { code: 'BLRR', name: 'Belandur Road' },
  distanceFromStationA: 6.7,
  distanceFromStationB: 1.5,
  tracks: 2,
  gateCloseBeforeSeconds: 300,
  gateOpenAfterSeconds: 120,
  bufferSeconds: 60,
}

export const PREDICTION_CONFIG = {
  approachingWindowMinutes: 20,
  cacheMinutes: 7,
  refreshIntervalMinutes: 5,
  confidenceDecayStartMinutes: 6,
  confidenceDecayPerMinute: 2,
  minConfidence: 50,
}

// ── Where to fetch cache.json from ───────────────────────────────────────────
//
// PROBLEM: cache.json is updated by GitHub Actions every 10 min (committed to
// the repo), but the GitHub Pages *site* is only rebuilt on push to master.
// So fetching from the Pages URL (BASE_URL/data/cache.json) always returns the
// stale version baked into the last build.
//
// SOLUTION: fetch directly from raw.githubusercontent.com, which always serves
// the latest committed file — no rebuild needed.
//
// Set VITE_GH_USER and VITE_GH_REPO at build time (see deploy.yml).
// Falls back to the Pages-bundled copy if env vars are missing.

const GH_USER = import.meta.env.VITE_GH_USER  // e.g. "BxtGeek"
const GH_REPO = import.meta.env.VITE_GH_REPO  // e.g. "railway-crossing-data"
const GH_BRANCH = import.meta.env.VITE_GH_BRANCH ?? 'master'

export const CACHE_JSON_URL =
  GH_USER && GH_REPO
    ? `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/data/cache.json`
    : import.meta.env.BASE_URL + 'data/cache.json'
