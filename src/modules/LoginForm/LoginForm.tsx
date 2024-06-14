import React, { useEffect, useState } from 'react'
import LogoIcon from '../../../public/images/iconLogo.svg'
import { selectUser, UserActions } from '../../../src/store/slices/user'
import Form from '../../../src/components/RHF/Form'
import ChakraInput from '../../../src/components/CrakraInput/ChakraInput'
import ChakraFormLabel from '../../../src/components/ChakraFormLabel/ChakraFormLabel'
import ChakraFormControl from '../../../src/components/ChakraFormControl/ChakraFormControl'
import ChakraFormHelperText from '../../../src/components/ChakraFormHelperText/ChakraFormHelperText'

import { Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/router'

// cleid:A= Form-Component-Example-For-Login-Actions

const schema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido!' })
    .min(1, { message: 'Preencha o campo de e-mail!' }),
  password: z.string().min(1, { message: 'Preencha o campo de senha!' }),
})

export type loginSchema = z.infer<typeof schema>

function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUser)
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeClick = () => setShowPassword(!showPassword)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => { 
    if (user !== null && user !== undefined) {
      router.push('/')
    }
  }, [user, router])

  return (
    <div className="md:w-1/2 md:static mx-auto">
      <Form
        onSubmit={handleSubmit((v) =>
          dispatch(
            UserActions.requestUserLogin({
              username: v.email,
              password: v.password,
            }),
          ),
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
              Olá novamente!
            </h1>
            <span className="text-xl mt-2 mb-11">
              Entre com seu e-mail e senha
            </span>
          </div>

          <div className="flex flex-col items-center gap-8 w-96">
            <ChakraFormControl className="w-full">
              <ChakraFormLabel>E-mail</ChakraFormLabel>
              <ChakraInput
                rhfregister={register('email')}
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
                  rhfregister={register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Exemplo: SenhaSuperSecreta123"
                  className="w-full"
                />
                <InputRightElement w={'4.5rem'}>
                  <Button h={'1.75rem'} size={'sm'} onClick={handleEyeClick}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password ? (
                <ChakraFormHelperText>
                  {String(errors.password.message)}
                </ChakraFormHelperText>
              ) : null}
              <div className="flex justify-end">
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => router.push('/recover-password')}
                >
                  Esqueci a senha
                </span>
              </div>
            </ChakraFormControl>

            <Button
              backgroundColor={'#131931'}
              color={'secondary'}
              variant={'solid'}
              w={{ md: '100%', base: '100%' }}
              type={'submit'}
              className="mt-4"
              _hover={{
                backgroundColor: '#31437E', // Cor de fundo no hover
                color: 'secondary', // Cor do texto no hover, se necessário
              }}
            >
              Entrar
            </Button>
          </div>
          <span
            onClick={() => router.push('/external-customer-register')}
            className="mt-2 font-semibold hover:underline cursor-pointer"
          >
            Não possui uma conta?
            <span className="text-secondary"> Registre-se</span>
          </span>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
