'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'
import { datetime, RRule, rrulestr } from 'rrule'


export async function getEvents({ dateSet }): any {
  const payload = await getPayload({ config })
  const user = await getUser()

  try {
    const response = await payload.find({
      collection: 'events',
      where: {
        member: {
          equals: user?.id,
        },
      },
      pagination: false,
    })
    const startDate = new Date(dateSet[0])
    const endDate = new Date(dateSet[1])
    const events = response.docs
    const eventsWithFrequency = events.map(x => {
      const startHour = new Date(x.start).getHours()
      const startMinutes = new Date(x.start).getMinutes()
      const endHour = new Date(x.end).getHours()
      const endMinutes = new Date(x.end).getMinutes()
      if (x?.ruleString) {
        const rruleObj = rrulestr(x?.ruleString)
        const prepareRule = new RRule(rruleObj.options)
        const frequency = prepareRule.between(datetime(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, startDate.getUTCDate()),
          datetime(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, endDate.getUTCDate() + 1)).map(fs => {
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


    let eventsFlattened = eventsWithFrequency.map(e => e.frequency.map(f => ({
      start: f[0],
      end: f[1],
      title: e.title,
    }))).flat(1)

    return Promise.resolve({ success: true, events: eventsFlattened })
  } catch (error) {
    console.error('Error gettings event:', error)
  }
}

