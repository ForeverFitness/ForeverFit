"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth, isFirebaseInitialized } from "@/lib/firebase/config"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: Error | null
  isFirebaseAvailable: boolean
  isDemoMode: boolean
  setDemoMode: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isFirebaseAvailable: false,
  isDemoMode: false,
  setDemoMode: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  const setDemoMode = (value: boolean) => {
    setIsDemoMode(value)
  }

  useEffect(() => {
    // If Firebase is not initialized, set loading to false and return
    if (!isFirebaseInitialized) {
      console.log("Firebase is not initialized, skipping auth state listener")
      setLoading(false)
      return () => {}
    }

    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          setUser(user)
          setLoading(false)
        },
        (error) => {
          console.error("Auth state change error:", error)
          setError(error as Error)
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (err) {
      console.error("Error setting up auth state listener:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
      setLoading(false)
      return () => {}
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isFirebaseAvailable: isFirebaseInitialized,
        isDemoMode,
        setDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
