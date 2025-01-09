'use client'

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Calendar from '@/app/(app)/components/Calendar'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'
import { getEvents } from '@/app/(app)/(authenticated)/member/calendar/actions/getEvent'
import Dialog from '@/app/(app)/components/Modal'
import { useDialog } from '@/app/(app)/components/Dialog.hook'
import Modal from '@/app/(app)/components/Modal'
import {  DialogPanel, DialogTitle } from '@headlessui/react'
import SubmitButton from '@/app/(app)/components/SubmitButton'
import Button from '@/app/(app)/components/PrimaryButton'
import PrimaryButton from '@/app/(app)/components/PrimaryButton'

export default function page(): ReactElement {
  const [events, setEvents] = useState([])
  const [info, setInfo] = useState(null)
  const {isOpen, open, close} = useDialog()

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

  const handleOpen = useCallback((selectInfo) => {
    setInfo(selectInfo)
    console.log(selectInfo)
    open();
  },[])

  useEffect(() => {
    handleEvents()
  }, [])
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Calendar Page</div>
      <div className='p-2'><Calendar handleDateSelect={handleOpen}  events={events}/></div>
      <Modal isOpen={isOpen} close={close} submit={()=> {}}>
        <DialogPanel
          transition
          className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <DialogTitle as="h3" className="text-base/7 font-medium text-white">
            Create Event
          </DialogTitle>
          <div className="mt-2 text-sm/6 text-white/50">
    Please create the event
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleDateSelect}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Event Name</label>
              <input className="w-full textInput" name="name" id="name"  />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Start Date</label>
              <input className="w-full textInput" name="start" id="start" value={info?.start}  />
            </div>       <div className="flex flex-col gap-2">
              <label htmlFor="email">Start Date</label>
              <input className="w-full textInput" name="start" id="start" value={info?.end}  />
            </div>
            <SubmitButton  text="Create event" />
          </form>
          <PrimaryButton  text="Cancel" onClick={close} />

        </DialogPanel>
      </Modal>
    </div>
  )
}