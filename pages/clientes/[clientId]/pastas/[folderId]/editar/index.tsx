import React from "react";
import {
  FormLabel,
  HStack,
  Stack,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import Button from "@observatorio-brasil/atores/src/components/Button";
import {
  createFolder,
  getFolder,
  patchFolder,
} from "@observatorio-brasil/atores/src/api/services/folders";
import { Folder } from "@prisma/client";

interface FolderFormInput {
  name: string;
  description: string;
  visible: boolean;
}

export default function EditFolderPage() {
  const toast = useToast();
  const router = useRouter();

  const [folder, setFolder] = useState<Folder | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { clientId, folderId } = router.query;

  const { handleSubmit, register, watch, setValue } = useForm<FolderFormInput>({
    values: {
      name: folder?.name || "",
      description: folder?.description || "",
      visible: folder?.visible || true,
    },
    defaultValues: { visible: true },
  });

  const visible = watch("visible");

  const handleFormSubmit = async (values: FolderFormInput) => {
    try {
      setLoading(true);
      if (!folder || !clientId)
        throw new Error("Não foi possível editar a pasta.");

      const res = await patchFolder(folder.id, values);
      if (res.data) {
        router.push(
          `/clientes/${clientId.toString()}/pastas/${res.data.id}/proposicoes`
        );
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchFolder = useCallback(async () => {
    const id = folderId!.toString();
    const result = await getFolder(+id);
    if (result.data) {
      setFolder(result.data);
    }
  }, [folderId]);

  useEffect(() => {
    if (folderId) {
      fetchFolder();
    }
  }, [folderId, fetchFolder]);

  return (
    <PageWrapper presentGoBack restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"} py={8}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Editar pasta
        </Text>
      </HStack>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack
          boxShadow={"0px 0px 6px 2px rgba(0, 0, 0, 0.25)"}
          borderRadius={10}
          w={"full"}
          align={"flex-start"}
          p={8}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            w={"full"}
            align={"center"}
            justify={"space-between"}
          >
            <TextInput
              label="Nome da pasta"
              id={"name"}
              type={"text"}
              rhfregister={register("name")}
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
            <TextInput
              label="Descrição"
              id={"description"}
              type={"text"}
              rhfregister={register("description")}
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
          </Stack>

          <FormLabel htmlFor="isChecked">Criar como visível?</FormLabel>
          <Switch
            isChecked={visible}
            onChange={() => {
              setValue("visible", !visible);
            }}
          />

          <HStack w={"full"} align={"center"} justify={"flex-end"} pt={16}>
            <Button
              isLoading={loading}
              type="submit"
              width={{ base: "100%", md: "20%" }}
              minW={"100px"}
              variant="primary"
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Form>
    </PageWrapper>
  );
}
