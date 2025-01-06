import { useState } from 'react'


export const useDialog = () => {

  let [isOpen, setIsOpen] = useState(false)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close,
  }
}