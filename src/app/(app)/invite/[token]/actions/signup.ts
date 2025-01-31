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
// Update password by using the reset-password token to update the password
// Start Integrating Full Calendar
// Save calendar data to DB and retrive it
// Allow recursive dates
//TODO: Start Integrating Zoom
//TODO: How to do CRON job to send emails on time
//TODO: Hooks to get data from FB
//TODO: Start Integrating Google Meets
//TODO: Start Integrating Calendily ?
//TODO: https://github.com/jeanbmar/payload-s3-upload
//TODO: https://github.com/Aengz/payload-redis-cache
//TODO: https://github.com/ahmetskilinc/payload-appointments-plugin
//TODO: https://github.com/tomashco/payload-instagram-plugin
//TODO: https://github.com/joas8211/payload-tenancy
