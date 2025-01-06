import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function Modal({ isOpen, close, submit, children}) {


  return (
    <>


      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {children}
          </div>
        </div>
      </Dialog>
    </>
  )
}
