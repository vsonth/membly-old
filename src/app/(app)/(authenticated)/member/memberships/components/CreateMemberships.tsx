import { Field, Form, Formik } from 'formik'
import React from 'react'
import {
  MembershipParams,
  submitMembership,
} from '@/app/(app)/(authenticated)/member/memberships/actions/submitMemberships'

export const CreateMemberships = () => <div className=' flex flex justify-center gap-1'><Formik
  initialValues={{
    planName: '',
    cost: '',
    numberOfSessions: '',
  }}
  onSubmit={async (values) => {
    console.log(values)
    submitMembership(values as MembershipParams).then(r => console.log(r))

  }}
>
  <Form className={'flex flex-col gap-2'}>
    <label htmlFor='planName'>Plan Name</label>
    <Field id='planName' name='firstName' placeholder='Plan Name' />

    <label htmlFor='cost'>Cost</label>
    <Field id='cost' name='lastName' placeholder='Cost' />

    <label htmlFor='numberOfSessions'>Number of Sessions</label>
    <Field
      id='numberOfSessions'
      name='numberOfSessions'
      placeholder='Sessions'
      type='email'
    />
    <button type='submit' className={'px-4 py-2 bg-red-500 text-white rounded'}>Submit</button>
  </Form>
</Formik></div>