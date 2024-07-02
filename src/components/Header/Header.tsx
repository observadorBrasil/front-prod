import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useAppSelector } from '../../store/hooks'
import {
  NotificationActions,
  selectNotification,
} from '../../../src/store/slices/notification'
import { selectUser } from '../../../src/store/slices/user'
import Image from 'next/image'
import DefaultImageUserProfile from '../../../public/images/default-image-user-profile.svg'
import NotificationIcon from '../../../public/images/notification-icon.svg'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { menuOptions } from './menuOptions'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getActiveNotifications } from '../../api/services/notifications'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseSharp } from 'react-icons/io5'
import routes from '../Navbar/routes'
import { NavbarMobileItem } from '../Navbar'

function sliceUserEmail(email: string | undefined) {
  if (email && email.length > 4) {
    const scliceEmail = email.slice(0, 3) + '...'
    return scliceEmail
  }
}

function Header() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState('')
  const user = useAppSelector(selectUser)
  const { notifications } = useAppSelector(selectNotification)

  useEffect(() => {
    if (isOpen && document && document !== undefined) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [isOpen])

  const hasRole = user && user.user?.role !== undefined
  function capitalize(text?: string) {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  async function getNotifications() {
    try {
      const res = await getActiveNotifications(10, undefined)
      if (res.data) {
        return dispatch(NotificationActions.setNotifications(res.data))
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div className="flex w-full h-20 rounded-xl items-center p-4 bg-white">
      <h1 className="hidden lg:block text-2xl font-bold text-primary-blue-1100">
        Observador
      </h1>

      <div className="block lg:hidden overflow-hidden">
        <GiHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          size={30}
          className="cursor-pointer"
        />
        {isOpen && (
          <div className="absolute mt-[-11px] flex top-0 right-0 left-0 bottom-0 z-50 w-full h-screen bg-white p-1 overflow-auto">
            <div className="fixed top-3 right-4 z-50">
              <IoCloseSharp
                size={30}
                color="#131931"
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex flex-col w-full gap-11 items-center mt-40">
              {routes.map((item) => (
                <Menu key={item.label} isLazy>
                  <MenuButton
                    className="cursor-pointer"
                    as="div"
                    onClick={() => {
                      if (!item.children) {
                        router.push(item.href!)
                        setIsOpen(false)
                      } else {
                        if (isOpenDropdown === '') {
                          setIsOpenDropdown(item.label)
                        } else {
                          setIsOpenDropdown('')
                        }
                      }
                    }}
                  >
                    <NavbarMobileItem isChild={!!item.children}>
                      {/* {item.icon} */}
                      {item.label}
                    </NavbarMobileItem>
                  </MenuButton>

                  {item.children && isOpenDropdown === item.label && (
                    <div className="flex flex-col gap-6">
                      {item.children.map((navItem, index) => (
                        <span
                          className="font-semibold text-center cursor-pointer"
                          onClick={() => {
                            setIsOpen(false)
                            router.push(navItem.href!)
                          }}
                          key={index}
                        >
                          {navItem.label}
                        </span>
                      ))}
                    </div>
                  )}
                </Menu>
              ))}

              {menuOptions.map((subItem, index) => {
                return (
                  <Menu key={index} isLazy>
                    <MenuButton
                      className="cursor-pointer"
                      as="div"
                      onClick={() => {
                        router.push(subItem.route)
                        setIsOpen(false)
                      }}
                    >
                      <NavbarMobileItem isChild={false}>
                        {subItem.icon}
                        {subItem.label}
                      </NavbarMobileItem>
                    </MenuButton>
                  </Menu>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-8 ml-auto items-center">
        <div
          className="relative cursor-pointer"
          onClick={() => router.push('/notification')}
        >
          <Image
            src={NotificationIcon}
            alt="ícone de notificação"
            width={20}
            height={20}
          ></Image>
          {notifications?.length > 0 && (
            <div className="w-3 bg-aditional-red rounded-full absolute top-0 right-0 flex items-center justify-center">
              <span className="text-white text-[10px]">
                {notifications?.length}
              </span>
            </div>
          )}
        </div>

        <Menu>
          <MenuButton transition="all 0.2s">
            <div className="flex gap-3">
              <div>
                <Image
                  src={DefaultImageUserProfile}
                  alt={'Imagem de perfil do usuário'}
                ></Image>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center cursor-pointer">
                  <span className="hidden lg:block text-primary-blue-1100 font-semibold">
                    {user.user?.email}
                  </span>
                  <span className="block lg:hidden text-primary-blue-1100 font-semibold">
                    {sliceUserEmail(user.user?.email)}
                  </span>
                  <MdOutlineKeyboardArrowDown size={18} color="#131931" />
                </div>
                <div className="text-sm font-semibold text-aditional-gray-blue flex">
                  {hasRole && capitalize(user.user?.role)}
                </div>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            {menuOptions.map((item, index) => (
              <MenuItem
                key={index}
                gap={2}
                color={'#607392'}
                onClick={() => router.push(item.route)}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
    // <Flex
    //   bg={theme.colors.primary}
    //   color={useColorModeValue('gray.600', 'white')}
    //   minH={'60px'}
    //   py={{ base: 2 }}
    //   px={{ base: 4 }}
    //   borderBottom={1}
    //   borderStyle={'solid'}
    //   borderColor={useColorModeValue('gray.200', 'gray.900')}
    //   align={'center'}
    //   justify={'space-between'}
    //   backgroundColor={'white'}
    // >
    //   <div
    //     style={{
    //       width: '1350px',
    //     }}
    //   >
    //     <Image
    //       width={135}
    //       height={135 / 3.132}
    //       src={'/images/observatorio_brasil_logo.png'}
    //       alt="Logo"
    //     />
    //   </div>
    //   {user && (
    //     <Stack
    //       flex={{ base: 1, md: 0 }}
    //       display={{ base: 'none', md: 'flex' }}
    //       justify={'flex-end'}
    //       align={'center'}
    //       direction={'row'}
    //       spacing={6}
    //     >
    //       <Link href="/">
    //         <Button
    //           variant="ghost"
    //           colorScheme="primary"
    //           size="sm"
    //           fontWeight="semibold"
    //           fontSize="sm"
    //           px={2}
    //           py={1}
    //           mr={2}
    //         >
    //           <Avatar
    //             bg="none"
    //             size="sm"
    //             showBorder={false}
    //             icon={
    //               <BellOutlined
    //                 style={{
    //                   fontSize: 22,
    //                   color: bellOutlinedInColor,
    //                 }}
    //               />
    //             }
    //           >
    //             {hasNotifications && (
    //               <AvatarBadge boxSize="1.25em" bg="red.500" />
    //             )}
    //           </Avatar>
    //         </Button>
    //       </Link>

    //       <Link href="/logout">
    //         <Button
    //           variant="ghost"
    //           colorScheme="primary"
    //           size="sm"
    //           fontWeight="semibold"
    //           fontSize="sm"
    //           px={2}
    //           py={1}
    //           mr={2}
    //         >
    //           <LogoutOutlined
    //             style={{
    //               fontSize: 22,
    //               color: LogoutOutlinedInColor,
    //             }}
    //           />
    //         </Button>
    //       </Link>
    //     </Stack>
    //   )}
    // </Flex>
  )
}

export default Header
