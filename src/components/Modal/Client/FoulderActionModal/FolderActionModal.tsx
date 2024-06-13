/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import {
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
  Switch,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Folder } from '@prisma/client'
import { useRouter } from 'next/router'
import {
  createFolder,
  getFolder,
  patchFolder,
} from '@observatorio-brasil/atores/src/api/services/folders'
import Form from '../../../RHF/Form'
import ChakraInput from '../../../CrakraInput/ChakraInput'
import { useDispatch, useSelector } from 'react-redux'
import { onClose } from '../../../../store/slices/clientFolderModal/index'
import { Loading } from '../../../Loading'
import { FolderActions } from '@observatorio-brasil/atores/src/store/slices/folder'

interface FolderFormInputProps {
  name: string
  description: string
  visible: boolean
}

export default function FolderActionModal() {
  const { isOpen, clientId, folderId, isCreate } = useSelector(
    (state: any) => state.clientFolderModal,
  )
  const dispatch = useDispatch()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  })
  const router = useRouter()

  const [folder, setFolder] = useState<Folder | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, register, watch, setValue } =
    useForm<FolderFormInputProps>({
      values: {
        name: folder?.name || '',
        description: folder?.description || '',
        visible: folder?.visible || true,
      },
      defaultValues: {
        visible: true,
      },
    })

  const visible = watch('visible')

  useEffect(() => {
    if (isCreate) {
      setValue('name', '')
      setValue('description', '')
    } else if (folder && folderId === folder.id) {
      setValue('name', folder.name)
      setValue('description', folder.description)
      setValue('visible', folder.visible)
    }
  }, [folderId])

  const handleEditFormSubmit = async (values: FolderFormInputProps) => {
    try {
      setLoading(true)
      if (!folder || !clientId)
        throw new Error('Não foi possível editar a pasta.')

      const res = await patchFolder(folder.id, values)
      if (res.data) {
        // router.push(
        //   `/clientes/${clientId.toString()}/pastas/${res.data.id}/proposicoes`,
        // )
        toast({
          status: 'success',
          description: 'Pasta editada com sucesso!',
        })
        dispatch(
          FolderActions.editFolder({ folderId: folder.id, data: values }),
        )
        dispatch(onClose())
      }
    } catch (e: any) {
      toast({ status: 'error', description: e?.message })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFormSubmit = async (values: FolderFormInputProps) => {
    const id = clientId!.toString()
    try {
      setLoading(true)
      const data = { ...values, clientId: +id }
      const res = await createFolder(data)
      if (res.data) {
        toast({
          status: 'success',
          description: 'Pasta criada com sucesso!',
        })
        router.push(
          `/clientes/${clientId!.toString()}/pastas/${res.data.id}/proposicoes`,
        )
      }
      dispatch(onClose())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFolder = useCallback(async () => {
    const id = folderId!.toString()
    if (id) {
      const result = await getFolder(+id)
      if (result.data) {
        setFolder(result.data)
      }
    }
  }, [folderId])

  useEffect(() => {
    if (folderId) {
      fetchFolder()
    }
  }, [folderId, fetchFolder])

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
            onSubmit={
              isCreate
                ? handleSubmit(handleCreateFormSubmit)
                : handleSubmit(handleEditFormSubmit)
            }
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {!isCreate ? 'Editar pasta' : 'Nova Pasta'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Nome da Pasta</FormLabel>
                  <ChakraInput
                    id={'name'}
                    rhfregister={register('name')}
                    placeholder="Nome"
                    className="text-primary font-normal"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Descrição</FormLabel>
                  <ChakraInput
                    id={'description'}
                    rhfregister={register('description')}
                    placeholder="Descrição"
                    className="text-primary font-normal"
                  />
                </FormControl>

                <div className="flex items-center mt-4">
                  <FormLabel htmlFor="isChecked">Criar como visível?</FormLabel>
                  <Switch
                    id="visible"
                    isChecked={visible}
                    onChange={() => {
                      setValue('visible', !visible)
                    }}
                  />
                </div>
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
