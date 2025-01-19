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
    const startDate = new Date(dateSet[0])
    const endDate = new Date(dateSet[1])
    getEvents({ dateSet }).then(({ events }) => {
      const eventsWithFrequency = events.map(x => {
        const startHour = new Date(x.start).getHours()
        const startMinutes = new Date(x.start).getMinutes()
        const endHour = new Date(x.end).getHours()
        const endMinutes = new Date(x.end).getMinutes()
        if (x?.ruleString) {
          const rruleObj = rrulestr(x?.ruleString)
          const prepareRule = new RRule(rruleObj.options)
          const frequency = prepareRule.between(datetime(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, startDate.getUTCDate()),
            datetime(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, endDate.getUTCDate() +1)).map(fs => {
            const startFs = new Date(fs)
            startFs.setHours(startHour)
            startFs.setMinutes(startMinutes)
            const endFs = new Date(fs)
            endFs.setHours(endHour)
            endFs.setMinutes(endMinutes)

            return [startFs, endFs]
          })
          return { ...x, frequency }
        }
      })

      setEvents(eventsWithFrequency.map(e => e.frequency.map(f => ({
        start: f[0],
        end: f[1],
        title: e.title,
      }))).flat(1))
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
