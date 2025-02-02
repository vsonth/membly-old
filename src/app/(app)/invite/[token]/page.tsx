'use client'


import React, { ReactElement, useEffect, useState } from 'react'
import SignupForm from './components/SignupForm'
import { useParams, useRouter } from 'next/navigation'
import { validateInviteToken } from '@/app/(app)/invite/[token]/actions/validateInviteToken'


export default function Page(): ReactElement {
  const params = useParams()
  const router = useRouter()



  useEffect(() => {
    if (params.token) {
      console.log(params.token)
      validateInviteToken({ token: params.token }).then(r => {
        console.log(r)
        if (r.status === 'accepted') {
          router.push('/invalidtoken')
        }
        if (r.error) {
          router.push('/')
        }
      })
    }

  }, [router])


  return (
    <div className='h-[calc(100vh-3rem)]'>
      invite page
      <SignupForm />
    </div>
  )
}