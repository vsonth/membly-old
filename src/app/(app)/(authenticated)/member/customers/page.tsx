'use client'

import React, { ReactElement } from 'react'
import NavBar from '@/app/(app)/(authenticated)/member/components/NavBar'
import { AddCustomer } from '@/app/(app)/(authenticated)/member/customers/components/AddCustomer'

export default function page(): ReactElement {
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Customers Page</div>
      <div className='h-[calc(90vh)]'><AddCustomer /></div>
    </div>
  )
}