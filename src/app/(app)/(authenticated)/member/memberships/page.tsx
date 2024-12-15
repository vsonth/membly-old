'use client'

import React, { ReactElement, useCallback, useState } from 'react'
import { Gutter } from '@payloadcms/ui'

export default function page(): ReactElement {
  const [open, toggle] = useState(false)
  const toggleModal = useCallback(() => {
    toggle(!open)
  }, [open])
  return <div className='flex flex-col '>
    <div className='h-[calc(100vh)]'>
      <div>Membership Page</div>
      <div>
        <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={toggleModal}>
          Create Membership Plan
        </button>
      </div>
    </div>
  </div>
}