"use client"

import { useEffect, useState } from "react"

import { ReactNode } from "react"

interface NoSsrProps {
  children: ReactNode
  fallback?: ReactNode
}

export function NoSsr({ children, fallback = null }: NoSsrProps) {
  const [mountedState, setMountedState] = useState(false)

  useEffect(() => {
    setMountedState(true)
  }, [])

  return <>{mountedState ? children : fallback}</>
}
