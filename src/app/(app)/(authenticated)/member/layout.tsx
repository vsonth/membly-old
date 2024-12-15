import { redirect } from 'next/navigation';
import React, { FC, ReactNode } from 'react';
import { getUser } from './actions/getUser';
import NavBar from '@/app/(app)/(authenticated)/member/components/NavBar'

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {

  return <div className='flex flex-col '>
    <div className='h-[calc(10vh-3rem)]'><NavBar></NavBar></div>
    <div className='h-[calc(100vh)] p-2'>{children}</div>
  </div>
}

export default Layout;