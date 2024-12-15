import React, { ReactElement } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { getUser } from '../../actions/getUser'

export default async function NavBar({}: {}): Promise<ReactElement> {
  const user = await getUser()

  console.log(user)
  return <div className='flex flex-row justify-between p-2'>
    <div className={'basis-2/3'}>{user.email}</div>
    <div className='flex flex-row justify-between flex-grow'>
      <div>Memberships</div>
      <div>Customers</div>
      <div>Logout</div>
    </div>
  </div>
}