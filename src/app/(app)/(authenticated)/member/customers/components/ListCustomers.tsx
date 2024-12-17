import React, { FC, ReactElement, useEffect, useState } from 'react'
import { getMembershipsByMember } from '@/app/(app)/(authenticated)/member/memberships/actions/getMembershipsByMember'



export default function ListCustomers({}:{}): ReactElement {
const [list, setList] = useState([])
  const renderList = list?.length > 0 && list.map(item => <div>
    <div>{item?.planName}</div>
    <div>{item?.cost}</div>
    <div>{item?.numberOfSessions}</div>
    <div>{item?.description}</div>
  </div>)

  useEffect(() => {
    getMembershipsByMember().then(e => {
      setList(e)
    })
  }, [])

  return (
    <div className=' flex flex-col justify-center gap-1'>
      <div>Plans</div>
      <div className={'flex flex-row gap-4'}>{renderList}</div>
    </div>
  )
}