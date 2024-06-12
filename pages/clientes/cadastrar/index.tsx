import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import PageWrapper from "../../../src/components/PageWrapper";
import { useForm } from "react-hook-form";
import Form from "../../../src/components/RHF/Form";
import TextInput from "../../../src/components/RHF/TextInput";
import Button from "../../../src/components/Button";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../src/store/hooks";
import {
  FormsActions,
  selectClientRegistrationForm,
} from "@observatorio-brasil/atores/src/store/slices/forms";
import FileUploader from "@observatorio-brasil/atores/src/components/RHF/FileUploader";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { createClient } from "@observatorio-brasil/atores/src/api/services/clients";
import { useRouter } from "next/router";

export interface RegisterClientFormValues {
  name: string;
  nickName: string;
  contractStartDate: Date | string;
  businessIcon: FileList;
}

export default function RegisterNewClientPage() {
  const router = useRouter();
  const { handleSubmit, register, watch } = useForm<RegisterClientFormValues>();
  const dispatch = useDispatch();
  const clientRegistrationFormState = useAppSelector(
    selectClientRegistrationForm
  );

  const businessIcon = watch("businessIcon");

  const handleFormSubmit = async (values: RegisterClientFormValues) => {
    const { businessIcon } = values;
    if (businessIcon.length <= 0) {
      toast("Faça o upload de um arquivo", { type: "error" });
      return;
    }

    if (!clientRegistrationFormState.loading) {
      dispatch(FormsActions.requestClientRegistrationFormSubmit());

      const formData = new FormData();
      formData.append("file", businessIcon[0]);
      formData.append("name", values.name);
      formData.append("nickName", values.nickName);
      formData.append(
        "contractStartDate",
        dayjs(values.contractStartDate).startOf("day").toJSON()
      );

      const res = await createClient(formData);

      if (res.data) {
        dispatch(FormsActions.clientRegistrationFormSubmitSuccessful());
        router.push(`/clientes/${res.data.id}/pastas`);
      } else {
        dispatch(FormsActions.clientRegistrationFormSubmitFailed());
      }
    }
  };

  return (
    <PageWrapper restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"} py={8}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Cadastrar cliente
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
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
            <TextInput
              label="Apelido"
              id={"nickName"}
              type={"text"}
              rhfregister={register("nickName")}
              required
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
                containerProps={{ w: "100%" }}
              />
            </VStack>
            <TextInput
              label="Data de Início de Contrato"
              id={"contractStartDate"}
              type={"date"}
              rhfregister={register("contractStartDate")}
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
          </Stack>
          <HStack w={"full"} align={"center"} justify={"flex-end"} pt={16}>
            <Button
              type="submit"
              width={{ base: "100%", md: "20%" }}
              minW={"100px"}
              variant="primary"
              isLoading={clientRegistrationFormState.loading}
            >
              Salvar
            </Button>
          </HStack>
        </VStack>
      </Form>
    </PageWrapper>
  );
}
