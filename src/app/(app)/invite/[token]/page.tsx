"use client";


import React, { ReactElement, useEffect } from 'react'
import SignupForm from './components/SignupForm';
import { useParams , useRouter} from 'next/navigation';
import { validateInviteToken } from '@/app/(app)/invite/[token]/actions/validateInviteToken'


export default async function Page(): Promise<ReactElement> {
  console.log('token')
  const params = useParams();
  console.log(params.token)
  const router = useRouter()

  const result = await validateInviteToken({token: params.token})
  console.log(result)

  // useEffect(() => {
  //   if(params.token && result.error){
  //     router.push('/')
  //   }
  // }, [])
  return (
        <div className='h-[calc(100vh-3rem)]'>
            invite page
        </div>
    );
}