import React from 'react';
import { Stack, VStack, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  selectUser,
  UserActions,
} from "@observatorio-brasil/atores/src/store/slices/user";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import Button from "@observatorio-brasil/atores/src/components/Button";
import { toast } from "react-toastify";

interface RegisterUserFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterUserPage() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);

  const { register, handleSubmit } = useForm<RegisterUserFormValues>();

  const handleSubmission = (v: RegisterUserFormValues) => {
    if (userState.loading) return;
    if (v.password === v.confirmPassword) {
      dispatch(
        UserActions.requestUserRegister({
          email: v.email,
          password: v.password,
        })
      );
    } else {
      toast("Senhas não são iguais", {
        type: "error",
      });
    }
  };

  return (
    <PageWrapper restricted>
      <HStack w={"full"} align={"flex-start"} justify={"flex-start"} py={8}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Cadastrar
        </Text>
      </HStack>
      <Form onSubmit={handleSubmit(handleSubmission)}>
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
              label="Email"
              id={"email"}
              type={"text"}
              rhfregister={register("email")}
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            w={"full"}
            align={"center"}
            justify={"space-between"}
          >
            <TextInput
              label="Senha"
              id={"password"}
              type={"password"}
              rhfregister={register("password")}
              required
              containerProps={{ w: { base: "100%", md: "45%" } }}
            />
            <TextInput
              label="Confirmar senha"
              id={"confirmPassword"}
              type={"password"}
              rhfregister={register("confirmPassword")}
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
            >
              {userState.loading ? (
                <Loading color={"secondary"} />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </HStack>
        </VStack>
      </Form>
    </PageWrapper>
  );
}
