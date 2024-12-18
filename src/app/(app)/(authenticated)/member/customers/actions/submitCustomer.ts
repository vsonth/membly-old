'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'

export interface CustomerParams {
  email: string,
}
export interface Response {
  success: boolean;
}



export async function submitCustomer({email }: CustomerParams): Promise<Response> {
  const payload = await getPayload({ config })
  const user = await getUser()
  console.log(email, user.id)
  const invitation = await payload.create({
    collection: 'invitations',
    data: { customerEmail: email, member: user.id  },
  })
  await payload.create({
    collection: 'customers',
    data: { email: email, associatedMember: user.id, invitedBy: user.id, invitation: invitation.id  },
  })
}