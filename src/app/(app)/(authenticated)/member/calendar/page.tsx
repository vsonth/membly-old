'use client'

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Calendar from '@/app/(app)/components/Calendar'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'
import { getEvents } from '@/app/(app)/(authenticated)/member/calendar/actions/getEvent'
import Modal from '@/app/(app)/components/Modal'
import { useDialog } from '@/app/(app)/components/Dialog.hook'
import { DialogPanel, DialogTitle } from '@headlessui/react'
import SubmitButton from '@/app/(app)/components/SubmitButton'
import PrimaryButton from '@/app/(app)/components/PrimaryButton'
import RRuleField from '@/app/(app)/components/RRuleField'
import { datetime, RRule, rrulestr } from 'rrule'

export default function page(): ReactElement {
  const [dateSet, setDates] = useState(null)
  const [rule, setRule] = useState({})
  const [events, setEvents] = useState([])
  const [info, setInfo] = useState(null)
  const { isOpen, open, close } = useDialog()


  const handleDatesSet = (arg: {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
  }) => {
    setDates([arg.startStr, arg.endStr])
  }

  function handleEvents() {
    getEvents({dateSet}).then(({ events }) => {
      setEvents(events)
    })
  }


  const handleDateSelect = (e) => {
    e.preventDefault()
    const date = new Date(info.start)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dtstart = datetime(year, month, day)
    // Convert the rule to a string for storage
    const ruleString = new RRule({ ...rule, dtstart }).toString()
    createEvent({ info, ruleString }).then(r => {
      handleEvents()
      close()
    })
  }

  const handleOpen = useCallback((selectInfo) => {
    setInfo(selectInfo)
    open()
  }, [open])

  const handleRuleChange = (rule) => {
    setRule(rule)
  }

  const handleNameChange = (e) =>{
    e.preventDefault();
    setInfo(x => ({...x, title: e.target.value}))
  }

  useEffect(() => {
    if (dateSet != null) {
      handleEvents()
    }
  }, [dateSet])
  let handleClose = () => close()
  return (<div className="flex flex-col">
      <div className="h-[calc(10vh)]">Calendar Page</div>
      <div className="p-2"><Calendar handleDateSelect={handleOpen} events={events} handleDateSet={handleDatesSet} />
      </div>
      <Modal isOpen={isOpen} close={close} submit={() => {
      }}>
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
              <input className="w-full textInput" name="name" id="name" onChange={handleNameChange} value={info?.title}/>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Start Date</label>
              <input className="w-full textInput" name="start" id="start" value={info?.start} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Start Date</label>
              <input className="w-full textInput" name="start" id="start" value={info?.end} />
            </div>
            <div className="flex flex-col gap-2">
              <RRuleField value={rule} onChange={handleRuleChange} />
            </div>
            <SubmitButton text="Create event" />
            <PrimaryButton text="Cancel" onClick={handleClose} />
          </form>


        </DialogPanel>
      </Modal>
    </div>
  )
}
