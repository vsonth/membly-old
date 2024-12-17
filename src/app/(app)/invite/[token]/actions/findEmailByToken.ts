'use server'

import config from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Customer } from '@/payload-types'
import { getPayload } from 'payload'

// we cannot import the type from payload/dist.../login so we define it here
export type Result = {
  exp?: number;
  token?: string;
  user?: Customer;
};

export interface SignupResponse {
  success: boolean;
  error?: string;
}

interface SignupParams {
  email: string;
  password: string;
}

export async function findEmailByToken({ invitationToken }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  console.log(invitationToken)
  const { docs } = await payload.find({
    collection: 'invitations',
    where: {
      invitationToken: {
        equals: invitationToken,
      },
    },
  })

  console.log(docs)

  return docs[0].customerEmail

}
