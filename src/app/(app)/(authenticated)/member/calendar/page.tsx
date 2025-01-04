'use client'

import React, { ReactElement, useState } from 'react'
import Calendar from '@/app/(app)/components/Calendar'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'
import { getEvents } from '@/app/(app)/(authenticated)/member/calendar/actions/getEvent'

export default function page(): ReactElement {
  const [events, setEvents] = useState([])

  const handleDateSelect = (selectInfo) => {
    createEvent(selectInfo).then(r => {
      getEvents().then((e) =>{
        setEvents(e.events)
      })
    })
  }
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Calendar Page</div>
      <div className=''><Calendar handleDateSelect={handleDateSelect}  events={events}/></div>
    </div>
  )
}