'use client'

import React, { ReactElement, useEffect, useState } from 'react'
import Calendar from '@/app/(app)/components/Calendar'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'
import { getEvents } from '@/app/(app)/(authenticated)/member/calendar/actions/getEvent'
import Dialog from '@/app/(app)/components/Modal'
import { useDialog } from '@/app/(app)/components/Dialog.hook'
import Modal from '@/app/(app)/components/Modal'
import { Button, DialogPanel, DialogTitle } from '@headlessui/react'

export default function page(): ReactElement {
  const [events, setEvents] = useState([])
  const {isOpen, open} = useDialog()

  function handleEvents() {
    getEvents().then((e) => {
      setEvents(e.events)
    })
  }


  const handleDateSelect = (selectInfo) => {
    createEvent(selectInfo).then(r => {
      handleEvents()
    })
  }

  useEffect(() => {
    handleEvents()
  }, [])
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Calendar Page</div>
      <div className='p-2'><Calendar handleDateSelect={open}  events={events}/></div>
      <Modal isOpen={isOpen} close={() => {}} submit={()=> {}}>
        <DialogPanel
          transition
          className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-base/7 font-medium text-white">
            Create Event
          </DialogTitle>
          <p className="mt-2 text-sm/6 text-white/50">
    Please create the event
          </p>

        </DialogPanel>
      </Modal>
    </div>
  )
}