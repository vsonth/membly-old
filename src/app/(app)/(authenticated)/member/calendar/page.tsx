'use client'

import React, { ReactElement } from 'react'
import Calendar from '@/app/(app)/components/Calendar'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'

export default function page(): ReactElement {

  const handleDateSelect = (selectInfo) => {
    createEvent(selectInfo).then(r => {
      console.log(selectInfo)
    })
  }
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Calendar Page</div>
      <div className=''><Calendar handleDateSelect={handleDateSelect} /></div>
    </div>
  )
}