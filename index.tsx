// Fallback pages router index in case Vercel fails to detect /app
import React from 'react'
import Link from 'next/link'

export default function LegacyIndex() {
  return (
    <div style={{fontFamily:'sans-serif', padding:'2rem'}}>
      <h1>Inventory Tracker</h1>
      <p>This is a fallback page. The app router version should load at <code>/</code>.</p>
      <ul style={{marginTop:'1rem'}}>
        <li><Link href="/">Go to Products (App Router)</Link></li>
        <li><Link href="/movements">Go to Movements</Link></li>
        <li><Link href="/reports">Go to Reports</Link></li>
      </ul>
    </div>
  )
}
