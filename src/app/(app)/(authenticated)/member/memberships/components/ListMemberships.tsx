'use client'
import React, { FC, ReactElement } from 'react'
import { getMembershipsByMember } from '@/app/(app)/(authenticated)/member/memberships/actions/getMembershipsByMember'

export const ListMemberships = async (): Promise<ReactElement> => {
  const list = await getMembershipsByMember()
  console.log(list)
  const renderList = list?.length > 0 && list.map(item => <div>
    <div>{item.planName}</div>
    <div>{item.cost}</div>
    <div>{item.numberOfSessions}</div>
    <div>{item.description}</div>
  </div>)
  console.log('membership')
  return (
    <div className=' flex flex-col justify-center gap-1'>
      <div>Plans</div>
      <div className={'flex flex-row gap-4'}>{renderList}</div>
    </div>
  )
}