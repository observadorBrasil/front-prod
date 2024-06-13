import React, { ReactNode } from 'react'

interface DashboardRootProps {
  children: ReactNode
}

export default function DashboardRoot({ children }: DashboardRootProps) {
  return (
    <section className="dashSection w-full overflow-auto max-h-[830px]">
      {children}
    </section>
  )
}
