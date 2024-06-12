import {
  Button,
  Flex,
  Heading,
  Stack,
  Center,
  Divider,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import TextInput from "../src/components/RHF/TextInput";
import { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../src/store/hooks";
import { selectUser, UserActions } from "../src/store/slices/user";
import PageWrapper from "../src/components/PageWrapper";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Form from "../src/components/RHF/Form";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (userState.user) router.push("/");
  }, [userState, router]);

  const { register, handleSubmit } = useForm();

  return (
    <PageWrapper
      containerProps={{
        pl: 0,
        pr: 0,
        pt: 0,
        h: "100vh",
      }}
    >
      <Center h={"100%"} width={"100%"} backgroundColor={"primary"}>
        <Stack
          minH={{ md: "60vh", base: "80vh" }}
          width={{ base: "90%", xl: "70%" }}
          direction={{ base: "column", md: "row" }}
          backgroundColor={"secondary"}
          borderRadius={"10px"}
        >
          <Flex flex={1} align={"center"} justify={"center"}>
            <Image
              alt={"MB Logo"}
              objectFit={"contain"}
              width={458}
              height={458 / 3.132}
              src={"/images/observatorio_brasil_logo.png"}
            />
          </Flex>
          <Center
            display={{ base: "none", md: "flex" }}
            paddingTop={"5%"}
            paddingBottom={"5%"}
          >
            <Divider
              orientation="vertical"
              borderWidth={"1px"}
              borderColor={"primary"}
            />
          </Center>
          <VStack
            p={{ base: 6, md: 8 }}
            pt={{ base: 8, md: 16 }}
            pb={{ base: 8, md: 16 }}
            align={"center"}
            justify={"space-between"}
            flex={1}
          >
            <Form
              onSubmit={handleSubmit((v) =>
                dispatch(
                  UserActions.requestUserLogin({
                    username: v.email,
                    password: v.password,
                  })
                )
              )}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
                gap: 24,
              }}
            >
              <Heading
                fontSize={"2xl"}
                fontWeight={"normal"}
                color={"primary"}
                mb={8}
              >
                Login
              </Heading>
              <Flex
                w={{ base: "90%", xl: "60%" }}
                direction={"column"}
                align={"center"}
                justify={"center"}
              >
                <TextInput
                  rhfregister={register("email")}
                  id={"email"}
                  type={"email"}
                  placeholder="Email"
                  icon={<UserOutlined />}
                  containerProps={{ width: "full" }}
                />
                <TextInput
                  rhfregister={register("password")}
                  id={"password"}
                  type={"password"}
                  placeholder="Senha"
                  icon={<LockOutlined />}
                  containerProps={{ width: "full" }}
                />
              </Flex>
              <Stack
                direction={"column"}
                align={"center"}
                justify={"space-between"}
                w={"full"}
                mt={{ base: 8 }}
              >
                <Button
                  backgroundColor={"primary"}
                  color={"secondary"}
                  variant={"solid"}
                  w={{ md: "50%", base: "60%" }}
                  type={"submit"}
                >
                  Entrar
                </Button>
              </Stack>
            </Form>
          </VStack>
        </Stack>
      </Center>
    </PageWrapper>
  );
}
