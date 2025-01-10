import { useUser as useClerkUser } from "@clerk/nextjs"

export const useClerkUserData = () => {
  const { user, isLoaded, isSignedIn } = useClerkUser()

  return {
    user: isLoaded && isSignedIn ? user : null,
    isLoaded,
    isSignedIn,
  }
}
