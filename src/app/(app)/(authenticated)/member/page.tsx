import React, { ReactElement } from 'react'
import NavBar from './components/NavBar'

export default function page(): ReactElement {
  return <div className='flex flex-col '>
    <div className='h-[calc(10vh-3rem)]'><NavBar></NavBar></div>
    <div className='h-[calc(100vh)]'>Hello</div>
  </div>
}