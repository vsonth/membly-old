'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { Event } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'
import { RRule } from 'rrule';

// Example: Generate occurrences for a weekly recurring event
const generateOccurrences = (event) => {
  const { start, recurrence } = event;

  const rule = new RRule({
    freq: RRule.WEEKLY, // Recurrence frequency
    interval: recurrence.interval, // Interval between events
    dtstart: new Date(start), // Start date of the recurrence
    until: recurrence.endDate ? new Date(recurrence.endDate) : null, // End date
  });

  return rule.all(); // Generate all occurrences
};

// Example event
const event = {
  title: 'Weekly Meeting',
  start: '2025-01-01T10:00:00',
  recurrence: {
    frequency: 'weekly',
    interval: 1,
    endDate: '2025-06-01T11:00:00',
  },
};


export async function getEvents({dateSet}): any {
  const payload = await getPayload({ config })
  const user = await getUser()

  try {
    const events = await payload.find({
      collection: 'events',
      where: {
        member: {
          equals: user.id,
        },
        start: {
          greater_than_equal: dateSet[0],
        },
        end: {
          less_than_equal: dateSet[1],
        },
      },
      pagination: false,
    })
    return { success: true, events: events.docs }
  } catch (error) {
    console.error('Error gettings event:', error)
  }
}

