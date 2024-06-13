/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Folder } from '@prisma/client'
import {
  deleteFolder,
  getFolder,
} from '@observatorio-brasil/atores/src/api/services/folders'
import Form from '../../../RHF/Form'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseDeleteModal } from '../../../../store/slices/clientFolderDeleteModal/index'
import { Loading } from '../../../Loading'
import { FolderActions } from '@observatorio-brasil/atores/src/store/slices/folder'

interface FolderFormInput {
  name: string
  description: string
  visible: boolean
}

export default function FolderDeleteModal() {
  const { isOpen, folderId } = useSelector(
    (state: any) => state.clientFolderDeleteModal,
  )
  console.log('isOpen', isOpen)
  const dispatch = useDispatch()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  })

  const [folder, setFolder] = useState<Folder | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit } = useForm<FolderFormInput>({})

  const handleDelete = async () => {
    const hasFolder = folder !== null && folder !== undefined
    try {
      setLoading(true)
      if (hasFolder) {
        const res = await deleteFolder(folder.id)
        if (res.data) {
          toast({
            status: 'success',
            description: 'Pasta excluída com sucesso!',
          })
          dispatch(FolderActions.deleteFolder({ folderId: folder.id }))
          //   dispatch(FolderActions.requestFolders({ clientId }))
          dispatch(onCloseDeleteModal())
        }
      }
    } catch (error: unknown) {
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
          onClose={() => dispatch(onCloseDeleteModal())}
          isCentered
        >
          <Form onSubmit={handleSubmit(handleDelete)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{'Deletar Pasta'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <h3 className="text-primary font-normal">
                  Tem certeza que deseja excluir essa pasta? Essa ação não
                  poderá ser desfeita!
                </h3>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  {'Deletar'}
                </Button>
                <Button onClick={() => dispatch(onCloseDeleteModal())}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Modal>
      )}
    </>
  )
}
