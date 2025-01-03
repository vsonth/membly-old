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
  invitationToken: string;
  firstName: string;
  lastName: string;
}

export async function signup({
                               email,
                               password,
                               invitationToken,
                               firstName,
                               lastName,
                             }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  const { docs, ...rest } = await payload.find({
    collection: 'invitations',
    where: {
      invitationToken: {
        equals: invitationToken,
      },
    },
  })
  const { docs: customer } = await payload.find({
    collection: 'customers',
    where: {
      email: {
        equals: email,
      },
    },
  })

  const token = await payload.forgotPassword({
    collection: 'customers',
    data: {
      email: email,
    },
    disableEmail: false, // you can disable the auto-generation of email via local API
  })

  console.log(token, 'token')

  await payload.resetPassword({
    collection: 'customers',
    data: {
      password: password,
      token: token,
    }
  })
  try {
    const result = await payload.update({
      collection: 'customers',
      where: {
        id: {
          equals: customer[0].id,
        },
      },
      data: {
        email,
        firstName,
        lastName,
        invitation: docs[0].id,
        associatedMember: docs[0].member.id,
      },
    })
// TODO: Update password by using the reset-password token to update the password

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


// Check Brevo
// Customer sign up does not update firstname and lastname
//TODO: Start Integrating Calendily ?
//TODO: Start Integrating Full Calendar
//TODO: Start Integrating Zoom
//TODO: Start Integrating Google Meets
//TODO: How to do CRON job to send emails on time
//TODO: Hooks to get data from FB