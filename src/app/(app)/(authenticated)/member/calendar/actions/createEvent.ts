'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { Event } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'



export async function createEvent({info, ruleString}): Promise<Event | null> {
  const payload = await getPayload({ config })
  const user = await getUser()
  const { start, end, } = info

  // Prompt for a title (optional)
  // const title = prompt('Enter a title for this event') || 'Untitled Event'


  // Create a new event object
  const newEvent = {
    ...info,
    title: info.title,
    start: start,
    end: end,
    member: user.id,
    ruleString: ruleString
  }

  try {
    await payload.create({
      collection: 'events',
      data: newEvent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

