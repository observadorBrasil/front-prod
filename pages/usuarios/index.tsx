import React, { useEffect, useState } from "react";
import { Center, Stack, Text } from "@chakra-ui/react";
import { getAllUsers } from "../../src/api/services/user";
import { UserInterface } from "../../src/api/services/user/interfaces/user.interface";
import Button from "../../src/components/Button";
import { Table } from "antd";
import Link from "../../src/components/Link";
import { Loading } from "../../src/components/Loading";
import PageWrapper from "../../src/components/PageWrapper";
import columns from "../../src/modules/UsersPage/Datatable/columns";
import { useAppSelector } from "../../src/store/hooks";
import { selectUser, UserActions } from "../../src/store/slices/user";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { store } from "@observatorio-brasil/atores/src/store";

const UsersPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const userState = useAppSelector(selectUser);

  const columns: ColumnsType<UserInterface> = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Excluir",
    key: "action",
    render: (_, record) => {
      const userId = record.id;
      return userState.currentDeletingUserId === userId && userState.loading ? (
        <Loading />
      ) : (
        <DeleteOutlined
          onClick={() =>
            store.dispatch(
              UserActions.requestUserDelete({ userId: record.id })
            )
          }
          style={{ fontSize: 22 }}
        />
      );
    },
  },
];

  const fetchUsers = async () => {
    if (loading) return;
    setLoading(true);
    const res = await getAllUsers();
    if (res.data) {
      setUsers(res.data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, [users]);

  useEffect(() => {
    if (!userState.loading && !userState.currentDeletingUserId) {
      fetchUsers();
    }
  }, [userState.loading, userState.currentDeletingUserId]);

  return (
    <PageWrapper restricted>
      <Stack
        direction={{ base: "column", md: "row" }}
        w={"100%"}
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent={"space-between"}
        margin={"2% 0"}
      >
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Visualizar Usuários
        </Text>
        <Link href="/usuarios/cadastrar">
          <Button variant="primary">Cadastrar usuário</Button>
        </Link>
      </Stack>
      {loading ? (
        <Center w={"100%"}>
          <Loading />
        </Center>
      ) : (
          <Table
          className="w-full"
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.id}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Sem resultados relevantes" }}
        />
      )}
    </PageWrapper>
  );
};

export default UsersPage;
