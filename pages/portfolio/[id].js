import React from 'react'
import { useRouter } from 'next/router'

export default function PortfolioProjectId() {

  const router = useRouter();

  console.log(router.pathname)
  console.log(router.query)

  return (
    <div>
      <h1>Portfolio ID</h1>
    </div>
  )
}
