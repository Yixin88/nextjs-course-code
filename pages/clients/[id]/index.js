import React from 'react'
import { useRouter } from 'next/router'

export default function ClientsProjectPage() {
  const router = useRouter();
  const clientName = router.query.id;

  function loadProjectHandler() {
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {id: clientName, clientprojectid: 'projecta'}
    })
  }

  return (
    <div>
      <h1>The Projects Page of {clientName}</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}
