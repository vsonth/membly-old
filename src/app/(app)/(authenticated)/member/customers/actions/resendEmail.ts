'use server'

import payload, { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'

export interface EmailParams {
  id: string,
}

export interface Response {
  success: boolean;
}


export async function resendEmail({ token }: EmailParams): Promise<Response> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'invitations',
    where: {
      invitationToken: {
        equals: token,
      },
    },
  })

  let customerEmail = docs[0].customerEmail
  let invitationToken = docs[0].invitationToken
  const invitationLink = `localhost:3001/invite/${invitationToken}`
  await payload.sendEmail({
    to: customerEmail,
    subject: 'You’ve been invited to join!',
    html: `<p> Click <a href="${invitationLink}">here</a> to accept.</p>`,
  });
}