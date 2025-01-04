'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { Event } from '@/payload-types'

export async function createEvent({...selectInfo}): Promise<Event | null> {
  const payload = await getPayload({ config })

  const { start, end } = selectInfo

  // Prompt for a title (optional)
  // const title = prompt('Enter a title for this event') || 'Untitled Event'


  // Create a new event object
  const newEvent = {
    ...selectInfo,
    title: 'title 1',
    startStr: start,
    endStr: end,
  }
  console.log(newEvent)
  // const eventData = {
  //   title: 'loel',
  //   start: '2024-12-31T14:30:00-06:00',
  //   end: '2024-12-31T16:00:00-06:00',
  //   startStr: '2025-01-01T02:00:00+05:30',
  //   endStr: '2025-01-01T03:30:00+05:30',
  //   allDay: false,
  // }

  try {
    const createdEvent = await payload.create({
      collection: 'events',
      data: { ...newEvent },
    })

    console.log('Event Created:', createdEvent)
    return { success: true }
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

