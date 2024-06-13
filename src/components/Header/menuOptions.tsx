import React from 'react'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'

export const menuOptions = [
  {
    label: 'Configurações',
    route: '/profile',
    icon: <IoMdSettings />,
  },
  {
    label: 'Sair',
    route: '/logout',
    icon: <IoLogOut />,
  },
]
