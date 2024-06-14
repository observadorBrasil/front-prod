import React, { useState } from "react";
import LogoIcon from "../../../public/images/iconLogo.svg";
import { UserActions } from "../../../src/store/slices/user";
import Form from "../../../src/components/RHF/Form";
import Link from "next/link";
import ChakraInput from "../../../src/components/CrakraInput/ChakraInput";
import ChakraFormLabel from "../../../src/components/ChakraFormLabel/ChakraFormLabel";
import ChakraFormControl from "../../../src/components/ChakraFormControl/ChakraFormControl";
import ChakraFormHelperText from "../../../src/components/ChakraFormHelperText/ChakraFormHelperText";

import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { z } from "zod";

import { useAppDispatch } from "../../store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

// cleid:C= Form-Component-For-External-Customer-Register-Actions

const schema = z.object({
  name: z.string(),
  email: z
    .string()
    .email({ message: "E-mail inválido!" })
    .min(1, { message: "Preencha o campo de e-mail!" }),
  password: z.string().min(1, { message: "Preencha o campo de senha!" }),
});

export type loginSchema = z.infer<typeof schema>;

function ExternalRegisterForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="md:w-1/2 md:static mx-auto">
      <Form
        onSubmit={handleSubmit((v) =>
          dispatch(
            UserActions.requestUserLogin({
              username: v.email,
              password: v.password,
            })
          )
        )}
        className="w-full h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src={LogoIcon}
            alt="logo observatório brasil"
            className="z-20 min-w-[80px] md:block lg:block"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-aditional-black-blue font-extrabold">
              Cadastre-se
            </h1>
            <span className="text-xl mt-2 mb-0">
              Faça parte do Observador Brasil
            </span>
            <span className="text-xl mt-0 mb-11">
              A melhor Ferramenta de Big-Data sobre Legislações do País!
            </span>
          </div>

          <div className="flex flex-col items-center gap-8 w-96">
            <ChakraFormControl className="w-full">
              <ChakraFormLabel>Nome</ChakraFormLabel>
              <ChakraInput
                rhfregister={register("email")}
                type="email"
                placeholder="Exemplo: seu nome completo"
                className="w-full"
              />
              {errors.email ? (
                <ChakraFormHelperText>
                  {String(errors.email.message)}
                </ChakraFormHelperText>
              ) : null}
            </ChakraFormControl>

            <ChakraFormControl className="w-full">
              <ChakraFormLabel>Email</ChakraFormLabel>
              <ChakraInput
                rhfregister={register("email")}
                type="email"
                placeholder="Exemplo: usuario@gmail.com"
                className="w-full"
              />
              {errors.email ? (
                <ChakraFormHelperText>
                  {String(errors.email.message)}
                </ChakraFormHelperText>
              ) : null}
            </ChakraFormControl>

            <ChakraFormControl className="w-full">
              <ChakraFormLabel>Senha</ChakraFormLabel>
              <InputGroup>
                <ChakraInput
                  rhfregister={register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Exemplo: SenhaSuperSecreta123"
                  className="w-full"
                />
                <InputRightElement w={"4.5rem"}>
                  <Button h={"1.75rem"} size={"sm"} onClick={handleEyeClick}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password ? (
                <ChakraFormHelperText>
                  {String(errors.password.message)}
                </ChakraFormHelperText>
              ) : null}
            </ChakraFormControl>

            <Button
              backgroundColor={"#131931"}
              color={"secondary"}
              variant={"solid"}
              w={{ md: "100%", base: "100%" }}
              type={"submit"}
              className="mt-4"
              _hover={{
                backgroundColor: "#31437E", // Cor de fundo no hover
                color: "secondary", // Cor do texto no hover, se necessário
              }}
            >
              Cadastrar
            </Button>
          </div>
          <span className="mt-2 font-semibold hover:underline cursor-pointer">
            Já possui uma conta?
            <span className="text-secondary">
              <Link href="/login"> Entrar</Link>
            </span>
          </span>
        </div>
      </Form>
    </div>
  );
}

export default ExternalRegisterForm;
