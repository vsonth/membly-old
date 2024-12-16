import { Field, Form, Formik } from 'formik'
import React from 'react'
import {
  MembershipParams,
  submitMembership,
} from '@/app/(app)/(authenticated)/member/memberships/actions/submitMemberships'

export const CreateMemberships = () => {

  console.log('membership')
  return (<div className=' flex flex justify-center gap-1'><Formik
    initialValues={{
      planName: '',
      cost: '',
      numberOfSessions: '',
      description: '',
    }}
    onSubmit={async (values) => {
      console.log(values)
      submitMembership(values as MembershipParams).then(r => console.log(r))

    }}
  >
    <Form className={'flex flex-col gap-2 text-black'}>
      <label htmlFor='planName'>Plan Name</label>
      <Field id='planName' name='planName' placeholder='Plan Name' />

      <label htmlFor='cost'>Cost</label>
      <Field id='cost' name='cost' placeholder='Cost' />

      <label htmlFor='numberOfSessions'>Number of Sessions</label>
      <Field
        id='numberOfSessions'
        name='numberOfSessions'
        placeholder='Sessions'
      />
      <label htmlFor='description'>Plan Name</label>
      <Field id='description' name='description' placeholder='description' />

      <button type='submit' className={'px-4 py-2 bg-red-500 text-white rounded'}>Submit</button>
    </Form>
  </Formik></div>)
}