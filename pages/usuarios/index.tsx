import React from 'react';
import { Center, Stack, Text } from "@chakra-ui/react";
import { getAllUsers } from "@observatorio-brasil/atores/src/api/services/user";
import { UserInterface } from "@observatorio-brasil/atores/src/api/services/user/interfaces/user.interface";
import Button from "@observatorio-brasil/atores/src/components/Button";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import Link from "@observatorio-brasil/atores/src/components/Link";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import columns from "@observatorio-brasil/atores/src/modules/UsersPage/Datatable/columns";
import { useAppSelector } from "@observatorio-brasil/atores/src/store/hooks";
import { selectUser } from "@observatorio-brasil/atores/src/store/slices/user";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [loading, setLoading] = useState<boolean>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const userState = useAppSelector(selectUser);

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
  });

  useEffect(() => {
    if (!userState.loading && !userState.currentDeletingUserId) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <DataTable size="lg" columns={columns} data={users} />
      )}
    </PageWrapper>
  );
};

export default UsersPage;