'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from 'react'


import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { createEvent } from '@/app/(app)/(authenticated)/member/calendar/actions/createEvent'

dayjs.extend(utc)
dayjs.extend(timezone)
export default function Calendar() {
  const [selectedEvents, setSelectedEvents] = useState([])


  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)
    const { start, end } = selectInfo

    // Format start and end times
    const defaultStart = dayjs(start).format('YYYY-MM-DDTHH:mm')
    const defaultEnd = dayjs(end).format('YYYY-MM-DDTHH:mm')

    // Prompt for a title (optional)
    const title = prompt('Enter a title for this event') || 'Untitled Event'

    const userStart = prompt(
      `Adjust start time (format: YYYY-MM-DDTHH:mm)`,
      defaultStart,
    )
    const userEnd = prompt(
      `Adjust end time (format: YYYY-MM-DDTHH:mm)`,
      defaultEnd,
    )

    // Validate adjusted times
    const adjustedStart = dayjs(userStart)
    const adjustedEnd = dayjs(userEnd)

    if (!adjustedStart.isValid() || !adjustedEnd.isValid()) {
      alert('Invalid date format. Event not created.')
      return
    }

    // Prompt user for timezone
    const timezones = dayjs.tz.name
    const timezone = prompt(
      `Enter a timezone (e.g., "America/New_York", "UTC"). Leave blank for system default.`,
      dayjs.tz.guess(),
    )

    const tzStart = timezone
      ? adjustedStart.tz(timezone).format()
      : adjustedStart.format()
    const tzEnd = timezone
      ? adjustedEnd.tz(timezone).format()
      : adjustedEnd.format()


    if (title) {
      // Create a new event object
      const newEvent = {
        ...selectInfo,
        title,
        start: tzStart,
        end: tzEnd
      }
      console.log(newEvent)
      createEvent(newEvent).then(r => {
        console.log(newEvent)
      })
      // Update the state with the new event
      setSelectedEvents((prevEvents) => [...prevEvents, newEvent])
    }
  }

  return (

    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth',
      }}
      initialView='timeGridWeek'
      nowIndicator={true}
      editable={true}
      selectable={true}
      select={handleDateSelect}
      selectMirror={true}
      initialEvents={[
        { title: 'nice event', start: new Date(), resourceId: 'a' },
      ]}
    />

  )
}