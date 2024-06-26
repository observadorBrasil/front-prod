import React from "react";
import { Center, HStack, Text } from "@chakra-ui/react";
import PageWrapper from "../../../src/components/PageWrapper";
import { AlertOutlined, LinkOutlined } from "@ant-design/icons";
import ContentBox from "../../../src/components/ContentBox";
import useGetNotifications from "./Provider";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../src/store/hooks";
import { Loading } from "../../../src/components/Loading";
import Button from "../../../src/components/Button";
import Link from "../../../src/components/Link";
import {
  NotificationActions,
  selectNotification,
} from "../../../src/store/slices/notification";

export default function NotificationsPage() {
  useGetNotifications();
  const dispatch = useAppDispatch();
  const { loading, notifications } = useAppSelector(selectNotification);

  const markAsRead = (id: number) => {
    dispatch(NotificationActions.setReadById(id));
  };

  return (
    <PageWrapper restricted>
      <HStack w={"full"} justify={"flex-start"} align={"center"} pb={5}>
        <Text fontWeight={"semibold"} fontSize={"2xl"}>
          Avisos
          {/* coment */}
        </Text>
      </HStack>
      {loading && (
        <Center w={"100%"}>
          <Loading />
        </Center>
      )}
      {!loading && notifications?.length === 0 && (
        <>
          <ContentBox
            title={
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                {`Sem novos avisos.`}
              </Text>
            }
          />
        </>
      )}
      {!loading && notifications.length > 0 && (
        <>
          {notifications.map((n) => (
            <ContentBox
              key={n.id}
              title={
                <Link href={`/monitoramento/resultados/${n.searchId}`}>
                  <HStack>
                    <AlertOutlined
                      style={{ fontSize: 18, color: n.read ? "green" : "red" }}
                    />
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      {`"${n.search.name}" retornou resultados relevantes!`}
                    </Text>
                    <LinkOutlined />
                  </HStack>
                </Link>
              }
              subtitle={"Verifique os novos resultados no link."}
              actions={
                <Button variant="primary" onClick={() => markAsRead(n.id)}>
                  Marcar visualizado
                </Button>
              }
            />
          ))}
        </>
      )}
    </PageWrapper>
  );
}
