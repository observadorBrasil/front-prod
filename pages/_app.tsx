import React from 'react';
import { Center, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { Router } from "next/router";
import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Loading } from "../src/components/Loading";
import LoadingWebApp from "../src/components/LoadingWebApp";
import { NotificationsProvider } from "../src/modules/NotificationsPage/Provider";
import { store, persistor } from "../src/store";
import theme from "../src/theme";

dayjs.locale("pt-br");

function CustomApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<LoadingWebApp />} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <Head>
              <title>Observatório Brasil</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
            </Head>
            <main className="app">
              <NotificationsProvider />
              {loading && (
                <Center
                  bg="white"
                  opacity={0.2}
                  position="absolute"
                  h="full"
                  w="full"
                >
                  <Loading size="xl" color="blue.500" thickness="12px" />
                </Center>
              )}
              <Component {...pageProps} />
            </main>
          </ChakraProvider>
        </PersistGate>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default CustomApp;
