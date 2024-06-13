/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Loading } from '../../../Loading'
import Form from '../../../RHF/Form'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@observatorio-brasil/atores/src/store/hooks'
import { useDispatch } from 'react-redux'
import { FormsActions } from '@observatorio-brasil/atores/src/store/slices/forms'
import dayjs from 'dayjs'
import {
  createClient,
  updateClient,
} from '@observatorio-brasil/atores/src/api/services/clients'
import { toast } from 'react-toastify'
import {
  selectClientModal,
  onClose,
} from '@observatorio-brasil/atores/src/store/slices/clientModal'
import ChakraInput from '../../../CrakraInput/ChakraInput'
import Image from 'next/image'
import ShadowLogo from '../../../../assets/image-svgrepo-com 1.png'

export interface RegisterClientFormValues {
  name: string
  nickName: string
  contractStartDate: Date | string
  iconUrl: string
  businessIcon?: FileList
}

interface SelectedImageProps {
  file: File | null
  url: string
}

function ClientActionModal() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [selectedImage, setSelectedImage] = useState<SelectedImageProps>({
    file: null,
    url: '',
  })
  console.log('selectedImage', selectedImage)
  const { isOpen, isCreate, client } = useAppSelector(selectClientModal)

  const { handleSubmit, register } = useForm<RegisterClientFormValues>({
    values: {
      name: client?.name || '',
      nickName: client?.nickName || '',
      contractStartDate: dayjs(client?.contractStartDate).format('YYYY-MM-DD'),
      iconUrl: client?.logoUrl || '',
    },
  })

  const dispatch = useDispatch()
  // const clientRegistrationFormState = useAppSelector(
  //   selectClientRegistrationForm,
  // )

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      console.log('Image URL:', imageUrl) // Log para depuração
      setSelectedImage({ file, url: imageUrl })
    }
  }

  const handleCreateClient = async (values: RegisterClientFormValues) => {
    if (!selectedImage.file || !(selectedImage.file instanceof File)) {
      toast('Faça o upload de um arquivo', { type: 'error' })
      return
    }

    // if (!clientRegistrationFormState.loading) {
    //   dispatch(FormsActions.requestClientRegistrationFormSubmit())

    const formData = new FormData()
    formData.append('file', selectedImage.file)
    formData.append('name', values.name)
    formData.append('nickName', values.nickName)
    formData.append(
      'contractStartDate',
      dayjs(values.contractStartDate).startOf('day').toJSON(),
    )

    const res = await createClient(formData)

    if (res.data) {
      dispatch(FormsActions.clientRegistrationFormSubmitSuccessful())
      router.push(`/clientes/${res.data.id}/pastas`)
    } else {
      dispatch(FormsActions.clientRegistrationFormSubmitFailed())
    }
    // }
  }

  const handleEditClient = async (values: RegisterClientFormValues) => {
    try {
      setLoading(true)
      const { businessIcon } = values
      if (!client) throw new Error('Cliente inválido. Recarregue a página.')

      const formData = new FormData()
      if (businessIcon?.length) {
        formData.append('file', businessIcon?.[0])
      }
      formData.append('name', values.name)
      formData.append('nickName', values.nickName)
      formData.append(
        'contractStartDate',
        dayjs(values.contractStartDate).startOf('day').toJSON(),
      )

      const res = await updateClient(client.id, formData)

      if (res.data) {
        router.push(`/clientes/${res.data.id}/pastas`)
      }
    } catch (e: any) {
      toast(e?.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (client && client.logoUrl) {
      setSelectedImage({ file: null, url: client.logoUrl })
    } else {
      setSelectedImage({ file: null, url: '' })
    }
  }, [client])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={() => dispatch(onClose())}
          isCentered
        >
          <Form
            onSubmit={handleSubmit((values) => {
              if (isCreate) {
                handleCreateClient(values)
              } else {
                handleEditClient(values as RegisterClientFormValues)
              }
            })}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {!isCreate ? 'Editar Cliente' : 'Novo Cliente'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <div>
                  <FormControl className="w-full justify-center items-center flex">
                    <Box
                      position="relative"
                      width="150px"
                      height="150px"
                      borderRadius="50%"
                      overflow="hidden"
                      bg="gray.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                    >
                      <Image
                        src={selectedImage.url || ShadowLogo}
                        alt="Logo"
                        objectFit="cover"
                        layout="fill"
                      />
                      <ChakraInput
                        type="file"
                        accept="image/*"
                        id={'businessIcon'}
                        {...register('businessIcon')}
                        onChange={handleImageChange}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </Box>
                  </FormControl>
                </div>
                <FormControl>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <ChakraInput
                    id={'name'}
                    rhfregister={register('name')}
                    placeholder="Nome da Empresa"
                    className="text-primary font-normal"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Apelido</FormLabel>
                  <ChakraInput
                    id={'nickName'}
                    rhfregister={register('nickName')}
                    placeholder="Apelido"
                    className="text-primary font-normal"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Data de início de contrato</FormLabel>
                  <ChakraInput
                    type="date"
                    id={'contractStartDate'}
                    rhfregister={register('contractStartDate')}
                    placeholder="Data de início de contrato"
                    className="text-primary font-normal"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  {!isCreate ? 'Salvar' : 'Criar'}
                </Button>
                <Button onClick={() => dispatch(onClose())}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default ClientActionModal
