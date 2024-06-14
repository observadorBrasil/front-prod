import React from "react";
import {
  Button,
  Center,
  HStack,
  List,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../../src/hooks/useDebounce";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import FolderCard from "../../../../src/components/FolderCard";
import PageWrapper from "../../../../src/components/PageWrapper";
import Form from "../../../../src/components/RHF/Form";
import TextInput from "../../../../src/components/RHF/TextInput";
import theme from "../../../../src/theme";
import { searchFolderByName } from "../../../../src/api/services/folders";
import { Client, Folder } from "@prisma/client";
import { getClientById } from "../../../../src/api/services/clients";
import { Loading } from "../../../../src/components/Loading";

const defaultValues = {
  search: "",
};

export default function ClientFoldersPage() {
  const { register, watch } = useForm({ defaultValues });
  const router = useRouter();
  const { clientId } = router.query;
  const toast = useToast();

  const searchValue = watch("search");
  const debouncedSearch = useDebounce(searchValue);

  const [client, setClient] = useState<Client | undefined>(undefined);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSearch = useCallback(async () => {
    try {
      const id = clientId!.toString();
      const results = await searchFolderByName(+id, debouncedSearch);
      if (results.data) {
        setFolders(results.data);
        setIsLoading(false);
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    } finally {
      setIsLoading(false);
    }
  }, [clientId, debouncedSearch]);

  const fetchClient = useCallback(async () => {
    const id = clientId!.toString();
    const result = await getClientById(id);
    if (result.data) {
      setClient(result.data);
    }
  }, [clientId]);

  const redirectToCreateFolder = () => {
    router.push(`/clientes/${clientId?.toString()}/pastas/cadastrar`);
  };

  useEffect(() => {
    if (clientId) {
      handleSearch();
    }
  }, [clientId, debouncedSearch, handleSearch]);

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId, fetchClient]);

  return (
    <PageWrapper presentGoBack restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Pastas de {client?.nickName}
        </Text>
      </HStack>
      <HStack w={"full"} align={"baseline"} justify={"flex-start"} spacing={12}>
        <Form>
          <TextInput
            rhfregister={register("search")}
            id={"folders_search"}
            type={"text"}
            icon={
              <SearchOutlined
                style={{
                  borderColor: theme.colors.primary,
                  fontSize: "25px",
                }}
              />
            }
            placeholder={"Buscar pasta..."}
          />
        </Form>
        <Button
          onClick={redirectToCreateFolder}
          borderWidth={1}
          borderColor={"primary"}
          backgroundColor={"transparent"}
          fontSize={"sm"}
          h={"100%"}
          px={10}
          py={"4px"}
        >
          {isLargerThan450 ? "Cadastrar nova pasta" : "+ pasta"}
        </Button>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <List w={"100%"} spacing={6}>
          {!folders?.length && !isLoading && (
            <Center w={"100%"}>Nenhuma pasta cadastrada</Center>
          )}
          {folders?.map((f) => (
            <FolderCard
              key={f.id}
              folder={f}
              clientId={clientId!.toString()}
              refresh={handleSearch}
            />
          ))}
        </List>
      )}
    </PageWrapper>
  );
}
