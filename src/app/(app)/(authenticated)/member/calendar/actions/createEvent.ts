'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { Event } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'



export async function createEvent({...selectInfo}): Promise<Event | null> {
  const payload = await getPayload({ config })
  const user = await getUser()
  const { start, end } = selectInfo

  // Prompt for a title (optional)
  // const title = prompt('Enter a title for this event') || 'Untitled Event'


  // Create a new event object
  const newEvent = {
    ...selectInfo,
    title: 'title 1',
    start: start,
    end: end,
    member: user.id
  }

  try {
    const createdEvent = await payload.create({
      collection: 'events',
      data: newEvent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

