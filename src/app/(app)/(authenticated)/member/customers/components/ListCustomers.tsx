import React, { FC, ReactElement, useEffect, useState } from 'react'
import { getMembershipsByMember } from '@/app/(app)/(authenticated)/member/memberships/actions/getMembershipsByMember'
import { getCustomers } from '@/app/(app)/(authenticated)/member/customers/actions/getCustomers'
import { resendEmail } from '@/app/(app)/(authenticated)/member/customers/actions/resendEmail'


function isExpired(expiresAt) {
  const now = new Date(); // Get the current date and time
  const expiryDate = new Date(expiresAt); // Convert the expiresAt value to a Date object

  return now > expiryDate ?  "Expired": 'Valid'; // Return true if current time is past the expiry time
}

function createLink(invitationToken: any) {

  return `localhost:3001/invite/${invitationToken}`

}

export default function ListCustomers({}:{}): ReactElement {
const [list, setList] = useState([])
  const [copied, setCopied] = useState(false);

  const handleCopy =  (value) => {
    try {
      console.log(value)
       navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };



  const renderList = list?.length > 0 && list.map(item => {
    let link = createLink(item?.invitation.invitationToken)

    return <div className='flex flex-row gap-4'>
      <div>{item?.email}</div>
      <div>{item?.invitation.status}</div>
      <div>{isExpired(item?.invitation.expiresAt)}</div>
      <div><button onClick={() => handleCopy(link)}> Copy Link </button></div>
      <div><button onClick={() => resendEmail({token: item?.invitation.invitationToken})}> Resend Email </button></div>
    </div>
  })

  useEffect(() => {
    getCustomers().then(e => {
      setList(e)
    })
  }, [])

  return (
    <div className=' flex flex-col justify-center gap-1'>
      <div>Customers</div>
      <div className={'flex flex-col gap-4'}>{renderList}</div>
    </div>
  )
}