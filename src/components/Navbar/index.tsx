import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from './navbar.module.css'
import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from '@chakra-ui/react'

import { UpOutlined } from '@ant-design/icons'

import routes, { NavItem } from './routes'

import Link from '../Link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import BgImageNavbar from '../../../public/images/binoculars-see-svgrepo-com 1.svg'
import { RiArrowDownSLine } from 'react-icons/ri'

interface NavbarItemProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  isSelected?: boolean
  isChild: boolean
}

export default function Navbar() {
  return (
    <>
      <section className="hidden lg:flex">
        {useMemo(() => {
          return <DesktopNav />
        }, [])}
      </section>

      {/* <section className="flex lg:hidden">
        <MobileNav />
      </section> */}
    </>
  )
}

// <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse>

const DesktopNav = () => {
  const router = useRouter()
  const [optionSelected, setOptionSelected] = useState('')

  useEffect(() => {
    const currentRoute = routes.find((route) => route.href === router.pathname)
    if (currentRoute) {
      setOptionSelected(currentRoute.label)
    }
  }, [router.pathname])

  return (
    <div className={`${styled.navbar} relative w-64 mt-2 mx-3 h-[98vh] bg-primary-blue-1100 rounded-xl flex items-center justify-center p-6`}>
      <div className="w-full h-full">
        <div className="flex flex-col w-full items-center">
          <h3 className="text-white text-xl font-bold">Observador</h3>
        </div>
        <div className="mt-6 flex flex-col gap-3 pl-1">
          {routes.map((item) => (
            <Box key={item.label}>
              <Popover trigger="click" placement="right-start">
                <PopoverTrigger>
                  <div>
                    <NavbarItem
                      isChild={!!item.children}
                      isSelected={item.label === optionSelected}
                      onClick={() => {
                        setOptionSelected(item.label)
                        if (!item.children) {
                          router.push(item.href!)
                        }
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </NavbarItem>
                  </div>
                </PopoverTrigger>

                {item.children && (
                  <PopoverContent className="bg-white p-4 rounded-lg shadow-lg">
                    <Stack>
                      {item.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ))}
        </div>
      </div>
      {/* <Image
        src={BgImageNavbar}
        alt="imagem de um binóculo"
        className="absolute bottom-56 right-0"
      /> */}
    </div>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5} as={UpOutlined} />
        </Flex>
      </Stack>
    </Link>
  )
}

const NavbarItem = ({
  isChild,
  children,
  isSelected,
  ...props
}: NavbarItemProps) => {
  return (
    <span
      {...props}
      className={`${
        isSelected ? 'bg-white text-primary-blue-1100' : 'text-white'
      } font-semibold py-2 pl-2 rounded-md cursor-pointer flex items-center gap-3 ${
        isSelected ? '' : 'hover:bg-white hover:text-primary-blue-1100'
      }`}
    >
      {children}

      {isChild && (
        <span className="ml-auto">
          <RiArrowDownSLine size={20} />
        </span>
      )}
    </span>
  )
}

export const NavbarMobileItem = ({
  isChild,
  children,
  ...props
}: NavbarItemProps) => {
  return (
    <span
      {...props}
      className="text-primary-blue-1100 text-xl font-semibold py-2 pl-2 rounded-md cursor-pointer flex items-center justify-center gap-3"
    >
      {children}

      {isChild && (
        <span className="ml-auto">
          <RiArrowDownSLine size={20} />
        </span>
      )}
    </span>
  )
}
