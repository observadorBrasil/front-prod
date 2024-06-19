import React from 'react'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { TbWorldShare } from "react-icons/tb";

export const menuOptions = [
  {
    label: 'Configurações',
    route: '/profile',
    icon: <IoMdSettings />,
  },
  {
    label: 'Atores',
    route: 'https://atores.azurewebsites.net/login',
    icon: <TbWorldShare />,
  },
  {
    label: 'Sair',
    route: '/logout',
    icon: <IoLogOut />,
  },
]
