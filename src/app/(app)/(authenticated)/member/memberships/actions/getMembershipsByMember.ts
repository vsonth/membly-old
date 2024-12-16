'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'





export async function getMembershipsByMember(): Promise<Response> {
  const payload = await getPayload({ config })
  const user = await getUser()
  console.log(user)
  const result = await payload.find({
    collection: 'memberships',
    where: {
      memberId: {
        equals: user.id,
      },
    },
  })

  console.log(result)
  return Promise.resolve(result.docs)
}