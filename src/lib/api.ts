/**
 * API Service Layer
 *
 * Two modes:
 *  1. Static  – reads /data/cache.json written by GitHub Actions (default)
 *  2. Live    – calls RailRadar directly (only when a train is <20 min away)
 *
 * RailRadar base URL is injected via VITE_RAILRADAR_BASE env var.
 * API key (if needed) via VITE_RAILRADAR_KEY.
 */

import type {
  LiveBoardResponse,
  TrainLiveResponse,
  RouteGeometry,
  StaticCache,
} from '../types'
import { STATIC_DATA_BASE } from './config'

const BASE  = import.meta.env.VITE_RAILRADAR_BASE ?? 'https://api.railradar.in'
const KEY   = import.meta.env.VITE_RAILRADAR_KEY  ?? ''

const headers: Record<string, string> = KEY
  ? { 'x-api-key': KEY, 'Content-Type': 'application/json' }
  : { 'Content-Type': 'application/json' }

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers })
  if (!res.ok) throw new Error(`RailRadar ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

// ─── Static cache (primary data source) ──────────────────────────────────────

export async function fetchStaticCache(): Promise<StaticCache> {
  const res = await fetch(`${STATIC_DATA_BASE}/cache.json?t=${Date.now()}`)
  if (!res.ok) throw new Error(`Failed to fetch static cache: ${res.status}`)
  return res.json() as Promise<StaticCache>
}

// ─── RailRadar live endpoints (called sparingly) ──────────────────────────────

export async function fetchLiveBoard(stationCode: string): Promise<LiveBoardResponse> {
  return get<LiveBoardResponse>(`/v1/stations/${stationCode}/live`)
}

export async function fetchTrainLive(trainNo: string): Promise<TrainLiveResponse> {
  return get<TrainLiveResponse>(`/v1/trains/${trainNo}/live`)
}

export async function fetchTrainRoute(trainNo: string): Promise<RouteGeometry> {
  return get<RouteGeometry>(`/v1/trains/${trainNo}/route`)
}

// ─── Local storage cache helpers ─────────────────────────────────────────────

const CACHE_KEY = 'rc_static_cache'
const CACHE_TTL = 5 * 60 * 1000   // 5 minutes

interface LocalCacheEntry {
  data: StaticCache
  savedAt: number
}

export function saveToLocalCache(data: StaticCache): void {
  try {
    const entry: LocalCacheEntry = { data, savedAt: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // storage full or unavailable — silently skip
  }
}

export function loadFromLocalCache(): StaticCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry = JSON.parse(raw) as LocalCacheEntry
    if (Date.now() - entry.savedAt > CACHE_TTL) return null
    return entry.data
  } catch {
    return null
  }
}
