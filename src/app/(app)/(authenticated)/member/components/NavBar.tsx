import React, { ReactElement } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { getUser } from '../../actions/getUser'
import Link from 'next/link'

export default async function NavBar({}: {}): Promise<ReactElement> {
  const user = await getUser()
  return <div className='flex flex-row justify-between p-2'>
    <Link href={'/member'} className={'basis-2/3'}>{user.email}</Link>
    <div className='flex flex-row justify-between flex-grow gap-2'>
      <Link href={'/member/memberships'}>Memberships</Link>
      <Link href={'/member/customers'}>Customers</Link>
      <Link href={'/member/calendar'}>Calendar</Link>
      <div>Logout</div>
    </div>
  </div>
}