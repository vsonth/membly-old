'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'

interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  isMember: boolean;
  error?: string;
}

export type Result = {
  exp?: number;
  token?: string;
  user?: Customer;
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config })
  const { totalDocs } = await payload.find({
    collection: 'members',
    where: {
      email: {
        equals: email,
      },
    },
  })
  const isMember = totalDocs > 0 && totalDocs === 1
  try {
    const result: Result = await payload.login({
      collection: isMember ? 'members' : 'customers',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true, isMember }
    } else {
      return { isMember: false, success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.error('Login error', error)
    return { isMember: false, success: false, error: 'An error occurred' }
  }
}