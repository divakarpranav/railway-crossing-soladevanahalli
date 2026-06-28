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
  gateCloseBeforeSeconds: 300,   // 5 min before train arrives
  gateOpenAfterSeconds: 120,     // 2 min after train passes
  bufferSeconds: 60,             // overlap buffer between consecutive trains
}

export const PREDICTION_CONFIG = {
  approachingWindowMinutes: 20,
  cacheMinutes: 5,
  refreshIntervalMinutes: 10,
  confidenceDecayPerMinute: 4,   // confidence drops 4% per minute of stale data
  minConfidence: 30,
}

// Base URL where static JSON is served (GitHub Pages)
export const STATIC_DATA_BASE = import.meta.env.BASE_URL + 'data'
