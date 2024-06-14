/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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
import Form from '../../../RHF/Form'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseDeleteModal, selectMonitoringDeleteModal } from '../../../../store/slices/monitoringDeleteModal/index'
import {
  SearchActions,
} from "../../../../../src/store/slices/search";

interface FolderFormInput {
  name: string
  description: string
  visible: boolean
}

export default function MonitoringDeleteModal() {
  const { isOpen, filterId } = useSelector(selectMonitoringDeleteModal)
  console.log('isOpen', isOpen)
  const dispatch = useDispatch()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  })


  const { handleSubmit } = useForm<FolderFormInput>({})
  const handleDelete = () => {
    if (!filterId) {
      return
    }
    dispatch(SearchActions.requestSearchDelete(filterId))
    dispatch(onCloseDeleteModal())
  }

  return (
    <>
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
              <ModalHeader>{'Deletar Filtro'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <h3 className="text-primary font-normal">
                  Tem certeza que deseja excluir esse filtro? Essa ação não
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
    </>
  )
}
