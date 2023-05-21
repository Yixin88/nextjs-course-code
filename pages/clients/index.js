import React from 'react'
import Link from 'next/link'

export default function ClientsPage() {

  const clients = [
    {id: 'max', name: 'Max'},
    {id: 'ash', name: 'Ash'}
  ]

  return (
    <div>
      <h1>ClientsPage</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link href={{
              pathname: '/clients/[id]',
              query: {id: client.id}
            }}>{client.name}</Link>
          </li>
        ))}
        
      </ul>
    </div>
  )
}
