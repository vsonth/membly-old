import { getPayload } from 'payload'
import config from '@payload-config'

export const createEvent = async ({ ...values }) => {
  const payload = await getPayload({ config })
  const eventData = {
    title: 'loel',
    start: '2024-12-31T14:30:00-06:00',
    end: '2024-12-31T16:00:00-06:00',
    startStr: '2025-01-01T02:00:00+05:30',
    endStr: '2025-01-01T03:30:00+05:30',
    allDay: false,
  }

  try {
    const createdEvent = await payload.create({
      collection: 'events',
      data: eventData,
    })

    console.log('Event Created:', createdEvent)
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

