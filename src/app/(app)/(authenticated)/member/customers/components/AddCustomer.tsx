import { Field, Form, Formik } from 'formik'
import React from 'react'

import { CustomerParams, submitCustomer } from '@/app/(app)/(authenticated)/member/customers/actions/submitCustomer'

export const AddCustomer = () => {

  return (<div className=' flex flex justify-center gap-1'><Formik
    initialValues={{
      email: '',
    }}
    onSubmit={async (values) => {
      console.log(values.email)
      submitCustomer({ email: values.email } as CustomerParams).then(r => console.log(r))

    }}
  >
    <Form className={'flex flex-col gap-2 text-black'}>
      <label htmlFor='email'>Plan Name</label>
      <Field id='email' name='email' placeholder='email' type='email' />
      <button type='submit' className={'px-4 py-2 bg-red-500 text-white rounded'}>Submit</button>
    </Form>
  </Formik></div>)
}