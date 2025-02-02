'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'

export interface MembershipParams {
  planName: string,
  cost: number,
  numberOfSessions: number,
  memberId: string
}
export interface Response {
  success: boolean;
}



export async function submitMembership({ ...values }: MembershipParams): Promise<Response> {
  const payload = await getPayload({ config })
  const user = await getUser()
  console.log(user)
  const result = await payload.create({
    collection: 'memberships',
    data: { ...values, memberId: user.id  },
  })
  console.log(result)
}