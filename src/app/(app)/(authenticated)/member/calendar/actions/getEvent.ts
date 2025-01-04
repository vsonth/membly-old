'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { Event } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'

export async function getEvents(): any {
  const payload = await getPayload({ config })
  const user = await getUser()


  try {
    const events = await payload.find({
      collection: 'events',
      where: {
        member: {
          equals: user.id,
        },
      },
    })

    return { success: true, events: events.docs }
  } catch (error) {
    console.error('Error gettings event:', error)
  }
}

