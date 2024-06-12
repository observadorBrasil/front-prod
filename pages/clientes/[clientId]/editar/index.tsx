import React from 'react';
import { HStack, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import FileUploader from "@observatorio-brasil/atores/src/components/RHF/FileUploader";
import {
  getClientById,
  updateClient,
} from "@observatorio-brasil/atores/src/api/services/clients";
import { useRouter } from "next/router";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import { useCallback, useEffect, useState } from "react";
import Button from "@observatorio-brasil/atores/src/components/Button";
import dayjs from "dayjs";
import { Client } from "@prisma/client";

export interface EditClientFormValues {
  name: string;
  nickName: string;
  contractStartDate: Date | string;
  iconUrl: string;
  businessIcon?: FileList;
}

export default function EditClientPage() {
  const toast = useToast();
  const router = useRouter();

  const [client, setClient] = useState<Client | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { clientId } = router.query;

  const { handleSubmit, register, watch } = useForm<EditClientFormValues>({
    values: {
      name: client?.name || "",
      nickName: client?.nickName || "",
      contractStartDate: dayjs(client?.contractStartDate).format("YYYY-MM-DD"),
      iconUrl: client?.logoUrl || "",
    },
  });

  const businessIcon = watch("businessIcon");

  const handleFormSubmit = async (values: EditClientFormValues) => {
    try {
      setLoading(true);
      const { businessIcon } = values;
      if (!client) throw new Error("Cliente inválido. Recarregue a página.");

      const formData = new FormData();
      if (businessIcon?.length) {
        formData.append("file", businessIcon?.[0]);
      }
      formData.append("name", values.name);
      formData.append("nickName", values.nickName);
      formData.append(
        "contractStartDate",
        dayjs(values.contractStartDate).startOf("day").toJSON()
      );

      const res = await updateClient(client.id, formData);

      if (res.data) {
        router.push(`/clientes/${res.data.id}/pastas`);
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchClient = useCallback(async () => {
    const id = clientId!.toString();
    const result = await getClientById(id);
    if (result.data) {
      setClient(result.data);
    }
  }, [clientId]);

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId, fetchClient]);

  return (
    <PageWrapper restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"} py={8}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Editar cliente
        </Text>
      </HStack>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack
          boxShadow={"0px 0px 6px 2px rgba(0, 0, 0, 0.25)"}
          borderRadius={10}
          w={"full"}
          p={8}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            w={"full"}
            align={"center"}
            justify={"space-between"}
          >
            <TextInput
              label="Nome da empresa"
              id={"name"}
              type={"text"}
              rhfregister={register("name")}
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
            <TextInput
              label="Apelido"
              id={"nickName"}
              type={"text"}
              rhfregister={register("nickName")}
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
          </Stack>
          <Stack
            w={"full"}
            align={"flex-start"}
            justify={"space-between"}
            direction={{ base: "column", md: "row" }}
          >
            <VStack
              w={{ base: "100%", md: "45%" }}
              align={"flex-start"}
              justify={"space-between"}
            >
              <Text fontWeight={"medium"}>Logo empresa</Text>
              <FileUploader
                buttonLabel="Upload"
                fileWatch={businessIcon}
                rhfregister={register("businessIcon")}
                multiple={false}
                previewUrl={client?.logoUrl}
                containerProps={{ w: "100%" }}
              />
            </VStack>
            <TextInput
              label="Data de Início de Contrato"
              id={"contractStartDate"}
              type={"date"}
              rhfregister={register("contractStartDate")}
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
          </Stack>
          <HStack w={"full"} align={"center"} justify={"flex-end"} pt={16}>
            <Button
              type="submit"
              width={{ base: "100%", md: "20%" }}
              minW={"100px"}
              variant="primary"
              isLoading={loading}
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Form>
    </PageWrapper>
  );
}
