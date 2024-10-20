'use client'
import SideBar from '@/components/custom/sideBar'
import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export default function LoggedInLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex">
      <ToastContainer />
      <SideBar />
      {children}
    </div>
  )
}
