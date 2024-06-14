import React, { useEffect } from 'react'
import styles from './login.module.css'

import Image from 'next/image'
// import IncompleteLogo from '../src/assets/incompleteLogo.svg'
import NewLogo from '../public/images/newlogo-removebg-preview.png'

import { useAppSelector } from '../src/store/hooks'
import { selectUser } from '../src/store/slices/user'
import PageWrapper from '../src/components/PageWrapper'
import { useRouter } from 'next/router'

// import { useAuth } from '../src/context/auth'
import LoginForm from '../src/modules/LoginForm/LoginForm'

// cleid:A= Exemplo-New-Way-01

export default function LoginPage() {
  const userState = useAppSelector(selectUser)
  const router = useRouter()
//   const { getAuthUserByEmail } = useAuth()

  // useEffect(() => {
  //   if (userState.user) {
  //     getAuthUserById(userState.user.id)

  //     router.push('/')
  //   }
  // }, [userState, router])

//   useEffect(() => {
//     if (userState.user) {
//       getAuthUserByEmail(userState.user.email)

//       router.push('/')
//     }
//   }, [userState, router])

  return (
    <PageWrapper>
      <div className="w-full h-screen flex">
        <div
          className={`${styles.styleLoginBgImageArea} hidden md:w-1/2 md:flex items-center justify-center w-full`}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Image
              src={NewLogo}
              alt="logo observatório brasil"
              className="min-w-[380px] w-[36%] mb-40 hidden md:block lg:block"
            />

            <span className="text-white text-lg absolute hidden md:bottom-2 md:block ">
              © Todos os direitos reservados
            </span>
          </div>
        </div>
        <LoginForm />
      </div>
    </PageWrapper>
  )
}
