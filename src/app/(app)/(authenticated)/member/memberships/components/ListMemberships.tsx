import React, { FC, ReactElement, useEffect, useState } from 'react'
import { getMembershipsByMember } from '@/app/(app)/(authenticated)/member/memberships/actions/getMembershipsByMember'



export default async function ListMemberships({}:{}): Promise<ReactElement | null> {

  // const list = await getMembershipsByMember()
  const list = []
  const renderList = list?.length > 0 && list.map(item => <div>
    <div>{item?.planName}</div>
    <div>{item?.cost}</div>
    <div>{item?.numberOfSessions}</div>
    <div>{item?.description}</div>
  </div>)

  return (
    <div className=' flex flex-col justify-center gap-1'>
      <div>Plans</div>
      <div className={'flex flex-row gap-4'}>{renderList}</div>
    </div>
  )
}