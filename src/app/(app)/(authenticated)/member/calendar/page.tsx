'use client'

import React, { ReactElement } from 'react'
import NavBar from '@/app/(app)/(authenticated)/member/components/NavBar'
import { AddCustomer } from '@/app/(app)/(authenticated)/member/customers/components/AddCustomer'
import ListCustomers from '@/app/(app)/(authenticated)/member/customers/components/ListCustomers'
import Calendar from '@/app/(app)/components/Calendar'

export default function page(): ReactElement {
  return (<div className='flex flex-col'>
      <div className='h-[calc(10vh)]'>Calendar Page</div>
      <div className=''><Calendar /></div>
    </div>
  )
}