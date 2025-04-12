"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { signInWithGoogle } from "@/lib/firebase/auth"
import { useAuth } from "@/components/auth-provider"
import { AlertTriangle } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { user, error, isFirebaseAvailable } = useAuth()

  // If user is already logged in, redirect to dashboard
  if (user) {
    router.push("/dashboard")
    return null
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
      toast({
        title: "Login successful",
        description: "Welcome to ForeverFitness!",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "There was a problem with your login.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome to ForeverFitness</CardTitle>
          <CardDescription>Sign in to start tracking your fitness journey</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!isFirebaseAvailable && (
            <div className="bg-yellow-100 p-3 rounded-md text-yellow-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Firebase Not Configured</p>
                <p className="text-sm">Firebase environment variables are missing or invalid.</p>
                <p className="text-xs mt-1">Please set up your environment variables to enable authentication.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/15 p-3 rounded-md text-destructive flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <div>
                <p className="font-medium">Firebase Error</p>
                <p className="text-sm">{error.message}</p>
                <p className="text-xs mt-1">Please check your environment variables and Firebase configuration.</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🏋️</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading || !!error || !isFirebaseAvailable}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </div>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
