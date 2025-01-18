import React, { ReactElement } from "react";
import {  Button  } from '@headlessui/react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function PrimaryButton({  text, onClick }: {  text: string; onClick: () => void  }): ReactElement {
  console.log(onClick)
  return <button
    className="bg-white relative text-black rounded-md p-2 w-full"
  >
    {text}
    <div className="h-full  absolute top-0 left-2 flex items-center justify-center ">
      <Button  className={`animate-spin hidden`} onClick={onClick} disabled={false}/>
    </div>
  </button>
}
