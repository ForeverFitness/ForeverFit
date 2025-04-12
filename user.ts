import type { Timestamp } from "firebase/firestore"

export interface UserData {
  displayName: string
  email: string
  photoURL: string
  coins: number
  workouts?: Workout[]
  measurements?: Measurement[]
  nutrition?: NutritionEntry[]
  goals?: Goal[]
  items?: ShopItem[]
  achievements?: Achievement[]
  avatar?: Record<string, ShopItem | null>
  createdAt?: Timestamp
}

export interface Workout {
  id: string
  date: string
  type: string
  duration: number
  calories?: number
  exercises?: Exercise[]
  notes?: string
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
}

export interface Measurement {
  id: string
  date: string
  weight?: number
  bodyFat?: number
  chest?: number
  waist?: number
  hips?: number
  arms?: number
  thighs?: number
  notes?: string
}

export interface NutritionEntry {
  id: string
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  water: number
  notes?: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  targetDate?: string
  completed: boolean
  progress: number
  category: "workout" | "nutrition" | "measurement" | "other"
}

export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  category: "head" | "body" | "legs" | "accessory" | "background"
  image: string
  owned: boolean
  equipped?: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}
