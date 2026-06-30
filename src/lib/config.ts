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
// PROBLEM: cache.json is updated by GitHub Actions every 5 min (committed to
// the repo), but the GitHub Pages *site* is only rebuilt when deploy.yml runs.
// Fetching from the Pages URL (BASE_URL/data/cache.json) returns whatever was
// baked into the build at deploy time — it goes stale the moment new data
// lands in the repo without a fresh deploy.
//
// SOLUTION: fetch directly from raw.githubusercontent.com, which always serves
// the latest committed file instantly — no rebuild or redeploy ever needed
// for data updates.
//
// Hardcoded (not env-var-based) so this works immediately regardless of
// whether build-time secrets/vars are configured correctly.

const GH_USER   = 'BxtGeek'
const GH_REPO   = 'railway-crossing-data'
const GH_BRANCH = 'master'

export const CACHE_JSON_URL =
  `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/public/data/cache.json`
