import React, { ReactNode, useEffect, useState } from "react";
import { Button, HStack, StackProps, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "@observatorio-brasil/atores/src/store/slices/user";
import { LeftOutlined } from "@ant-design/icons";
import Navbar from "../Navbar/index";
import theme from "../../theme/index";
import Header from '../Header/Header'
import RouteHistory, { HistoryItem } from '../../modules/RouteHistory'

interface Props {
  restricted?: boolean;
  children: ReactNode | ReactNode[];
  presentGoBack?: boolean;
  overrideGoBack?: () => void;
  containerProps?: StackProps;
  roles?: string[]
  routeHistory?: HistoryItem[]
}

const PageWrapper = (props: Props) => {
  const { children, restricted, presentGoBack, overrideGoBack } = props;
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [isDashboardPage, setIsDashboardPage] = useState(false)
  const userState = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      console.log('router.pathname', router.pathname)

      setIsDashboardPage(true)
    } else {
      setIsDashboardPage(false)
    }

    if (
      router.pathname === '/login' ||
      router.pathname === '/external-customer-register' ||
      router.pathname === '/recover-password'
    ) {
      setIsLoginPage(true)
    } else {
      setIsLoginPage(false)
    }
  }, [router])

  useEffect(() => {
    console.log('isDashboardPage', isDashboardPage)
  }, [isDashboardPage])

  useEffect(() => {
    if (restricted && !userState.user) {
      router.push("/login");
    }
  }, [restricted, userState.user, router]);

  return (
     <section
      className={`${!isLoginPage ? 'wrapperSection bg-aditional-background-color pt-4 lg:pt-0 h-screen' : null}`}
    >
      <div className={`${!isLoginPage ? 'wrapperDivOne lg:flex' : null}`}>
        {userState.user && <Navbar />}
        <div
          className={`${!isLoginPage ? 'wrapperDivTwo mx-3 lg:ml-0 lg:w-full mt-0 lg:mt-3 lg:mr-3' : null} `}
        >
          {userState.user && <Header />}
          <VStack
            className={`${!isLoginPage ? `mt-3 pt-4 pb-4 w-full items-center rounded-xl ${!isDashboardPage ? 'bg-white px-4 lg:px-6 overflow-auto min-h-screen max-h-screen lg:min-h-[838px] lg:max-h-[838px]' : 'vstack px-0 lg:px-0 lg:mt-0'}` : null}`}
            {...props.containerProps}
          >
            {presentGoBack && (
              <HStack w={'full'} justify={'space-between'} align={'center'}>
                <Button
                  backgroundColor={'transparent'}
                  color={'primary'}
                  onClick={overrideGoBack || router.back}
                  pl={0}
                >
                  <LeftOutlined
                    style={{ color: theme.colors.primary, marginRight: 6 }}
                  />
                  voltar
                </Button>
                {props.routeHistory && <RouteHistory history={props.routeHistory} />}
              </HStack>
            )}
            {children}
          </VStack>
        </div>
      </div>
    </section>
  );
};

export default PageWrapper;
