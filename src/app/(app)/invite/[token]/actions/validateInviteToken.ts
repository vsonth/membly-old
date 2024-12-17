'use server'

import config from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Customer } from '@/payload-types'
import { getPayload } from 'payload'
import { ca } from 'date-fns/locale'

// we cannot import the type from payload/dist.../login so we define it here
export type Result = {
  exp?: number;
  token?: string;
  user?: Customer;
};

export interface TokenResponse {
  success: boolean;
  error?: string;
}

interface InviteToken {
  token: string;
}

export async function validateInviteToken({ token }: InviteToken): Promise<TokenResponse> {
  const payload = await getPayload({ config })

  const result: Result = await payload.find({
    collection: 'invitations',
    where: {
      invitationToken: {
        equals: token,
      },
    },
  })
  console.log(result)

  let totalDocs = result.totalDocs
  if (totalDocs === 1) return { success: true, error: false }
  return { success: false, error: true }

}
