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

export async function signup({
                               email,
                               password,
                               invitationToken,
                               firstName,
                               lastName,
                             }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  console.log(email)
  const { docs, ...rest } = await payload.find({
    collection: 'invitations',
    where: {
      invitationToken: {
        equals: invitationToken,
      },
    },
  })
  const customer = await payload.find({
    collection: 'customers',
    where: {
      email: {
        equals: email,
      },
    },
  })

  console.log(customer, 'signup')
  try {
    const result = await payload.update({
      collection: 'customers',
      where: {
        id: {
          equals: customer.id,
        },
      },
      data: {
        email,
        password,
        firstName,
        lastName,
        invitation: docs[0].id,
        associatedMember: docs[0].member.id,
      },
    })

    if (result) {
      await payload.update({
        collection: 'invitations',
        where: {
          id: {
            equals: docs[0].id,
          },
        }, data: {
          status: 'accepted',
        },
      })
      return { success: true }
    } else {
      return { success: false, error: 'An error occurred' }
    }
  } catch (error) {
    return { success: false, error: 'An error occurred' }
  }
}
