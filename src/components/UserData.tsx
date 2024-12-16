'use client'

import React from 'react'
import { UserProfile } from '@clerk/nextjs'

export function UserData() {
  return (
    <>
      <UserProfile routing="virtual" />
    </>
  )
}