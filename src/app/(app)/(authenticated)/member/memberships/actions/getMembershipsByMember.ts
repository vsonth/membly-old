'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Membership } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'


export async function getMembershipsByMember(): Promise<Membership | null> {
  const payload = await getPayload({ config })
  const user = await getUser()
  const result = await payload.find({
    collection: 'memberships',
    where: {
      memberId: {
        equals: user.id,
      },
    },
  })
  return result.docs
}