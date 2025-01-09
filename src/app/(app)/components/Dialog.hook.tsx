import { useMemo, useState } from 'react'


export const useDialog = () => {

  let [isOpen, setIsOpen] = useState(false)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return useMemo(() => ({
    isOpen,
    open,
    close,
  }), [isOpen])
}