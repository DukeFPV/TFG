'use client'

import { UserProfile } from '@clerk/nextjs'

export function UserData() {
  return (
    <>
      <UserProfile routing="virtual" />
    </>
  )
}