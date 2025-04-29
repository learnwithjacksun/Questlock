import { Header } from "@/Components/Auth"
import React from "react"

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <Header/>
    <main className="layout">
        {children}
    </main>
    </>
  )
}

export default AuthLayout