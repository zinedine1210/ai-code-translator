import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='px-5 xl:px-0 xl:flex items-center justify-between container py-5 mx-auto bg-trans'>
        <h1 className='font-semibold mb-5 xl:mb-0 text-xl'><span className='text-sm text-zinc-400'>by</span> Dine</h1>

        <div className='space-x-8 xl:flex items-center'>
          <Link href="/">
            <h1>Dukung Developer</h1>
          </Link>
          <Link href="/">
            <h1>Project</h1>
          </Link>
          <Link href="/">
            <h1>Pricing</h1>
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2024. </p>
      </div>
  )
}
