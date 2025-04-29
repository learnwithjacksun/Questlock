import { Header } from "@/Components/Auth"
import React from "react"

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <Header/>
    <main>
        {children}
    </main>
    </>
  )
}

export default AuthLayout