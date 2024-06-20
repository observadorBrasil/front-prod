import React, { ReactNode } from 'react'
import { IoPeople, IoSearch } from 'react-icons/io5'
import { MdDashboard, MdPerson } from 'react-icons/md'
import { TbHeartRateMonitor } from 'react-icons/tb'
import { TbWorldShare } from "react-icons/tb";


export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  icon?: ReactNode
}

const routes: Array<NavItem> = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <MdDashboard />,
  },
  {
    label: 'Clientes',
    href: '/clientes',
    icon: <IoPeople />,
    // children: [
    //   {
    //     label: 'Cadastrar',
    //     subLabel: 'Cadastrar novo cliente',
    //     href: '/clientes/cadastrar',
    //   },
    // ],
  },
  {
    label: 'Busca',
    href: '/busca/simples',
    icon: <IoSearch />,
    children: [
      {
        label: 'Avançada',
        subLabel: 'Realiza busca com filtros avançados',
        href: '/busca/avancada',
      },
      {
        label: 'Simples',
        subLabel: 'Realiza busca com filtros simples',
        href: '/busca/simples',
      },
    ],
  },
  {
    label: 'Monitoramento',
    href: '/monitoramento',
    icon: <TbHeartRateMonitor />,
  },
  {
    label: 'Usuários',
    href: '/usuarios',
    icon: <MdPerson />,
  },
   {
    label: 'Atores',
    href: 'https://atores.azurewebsites.net/login',
    icon: <TbWorldShare />,
  },
]

export default routes
