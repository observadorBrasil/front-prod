import React from "react";
import {
  Button,
  HStack,
  SimpleGrid,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import TextInput from "../../src/components/RHF/TextInput";
import PageWrapper from "../../src/components/PageWrapper";
import { SearchOutlined } from "@ant-design/icons";
import theme from "../../src/theme";
import ClientCard from "../../src/components/ClientCard";
import { useForm } from "react-hook-form";
import Form from "../../src/components/RHF/Form";
import { useDebounce } from "../../src/hooks/useDebounce";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { searchClientByName } from "../../src/api/services/clients";
import { ClientInterface } from "../../src/api/services/clients/interfaces/client.interface";
import { Loading } from "../../src/components/Loading";

const defaultValues = {
  search: "",
};

export default function ClientsPage() {
  const { register, watch } = useForm({ defaultValues });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const searchValue = watch("search");
  const debouncedSearch = useDebounce(searchValue);

  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await searchClientByName(debouncedSearch);
      if (results.data) {
        setClients(results.data);
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  const redirectToCreateFilter = () => {
    router.push("monitoramento/cadastrar");
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, handleSearch]);

  return (
    <PageWrapper restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Clientes
        </Text>
      </HStack>
      <HStack w={"full"} align={"baseline"} justify={"flex-start"} spacing={12}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextInput
            rhfregister={register("search")}
            id={"clients_search"}
            type={"text"}
            icon={
              <SearchOutlined
                style={{
                  borderColor: theme.colors.primary,
                  fontSize: "25px",
                }}
              />
            }
            placeholder={"Buscar cliente..."}
          />
        </Form>
        <Button
          onClick={redirectToCreateFilter}
          borderWidth={1}
          borderColor={"primary"}
          backgroundColor={"transparent"}
          fontSize={"sm"}
          h={"40px"}
          px={10}
          py={"4px"}
        >
          {isLargerThan450
            ? "Cadastrar Cliente"
            : "+ Cadastrar Cliente"}
        </Button>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <SimpleGrid spacing={6} columns={{ base: 1, lg: 4 }}>
          {clients?.map((c) => (
            <ClientCard key={c.id} client={c} refresh={handleSearch} />
          ))}
        </SimpleGrid>
      )}
    </PageWrapper>
  );
}
