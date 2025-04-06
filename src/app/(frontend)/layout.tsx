import React from 'react'
import './globals.css'

export const metadata = {
  description: 'Storhub is a platform for storing and managing your belongings.',
  title: 'Storhub | Storage Solutions',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
