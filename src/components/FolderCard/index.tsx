import React from 'react'

import { StackProps } from '@chakra-ui/react'
import { Folder } from '@prisma/client'
import { useRouter } from 'next/router'

import Image from 'next/image'
import FolderIcon from '../../../public/images/folder-minus-svgrepo-com.svg'
import EditIcon from '../../../public/images/edit-icon.svg'
import DeleteIcon from '../../../public/images/delete-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { onOpen } from '../../store/slices/clientFolderModal/index'
import { onOpenDeleteModal } from '../../store/slices/clientFolderDeleteModal'

interface FolderCard {
  clientId: string
  folder: Folder
  refresh: () => Promise<void>
}

const FolderCard = ({
  clientId,
  folder,
  // refresh,
  // ...props
}: FolderCard & StackProps) => {
  // const toast = useToast()
  const router = useRouter()
  // const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { modalProps } = useSelector((state: any) => state.clientFolderModal)

  // const handleEdit = () => {
  //   router.push(`/clientes/${folder.clientId}/pastas/${folder.id}/editar`)
  // }

  return (
    <>
      <div className="h-20 w-full bg-aditional-light-gray rounded-lg mb-5">
        <div className="flex px-9 h-full items-center">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Image src={FolderIcon} alt="ícone de pasta" width={24}></Image>
            </div>
            <div className="flex flex-col gap-1">
              <h4
                className="font-bold text-primary hover:underline cursor-pointer"
                onClick={() =>
                  router.push(
                    `/clientes/${clientId}/pastas/${folder.id}/proposicoes`,
                  )
                }
              >
                {folder.name}
              </h4>
              <span className="font-normal text-primary">
                {folder.description}
              </span>
            </div>
          </div>
          <div className="flex gap-4 ml-auto">
            <Image
              src={EditIcon}
              alt="ícone de edição"
              width={24}
              onClick={() =>
                dispatch(
                  onOpen({
                    open: true,
                    clientId,
                    folderId: folder.id,
                    isCreate: false,
                  }),
                )
              }
              {...modalProps}
              className="cursor-pointer"
            ></Image>
            <Image
              src={DeleteIcon}
              alt="ícone de deleção"
              width={24}
              onClick={() =>
                dispatch(onOpenDeleteModal({ clientId, folderId: folder.id }))
              }
              className="cursor-pointer"
            ></Image>
          </div>
        </div>
      </div>
    </>
    // <ListItem w={'100%'}>
    //   <Box
    //     boxShadow={'0px 0px 5px 2px rgba(0, 0, 0, 0.25)'}
    //     rounded={'md'}
    //     px={4}
    //     py={4}
    //   >
    //     <HStack w="full" align="center" spacing={2}>
    //       <Link
    //         href={`/clientes/${clientId}/pastas/${folder.id}/proposicoes`}
    //         w="full"
    //       >
    //         <HStack gap={6} w="full">
    //           <FolderOpenOutlined
    //             style={{
    //               color: 'black',
    //               fontSize: '24px',
    //             }}
    //           />
    //           <VStack align={'flex-start'}>
    //             <Text as="b" fontSize="md">
    //               {folder?.name}
    //             </Text>
    //             <Text fontSize="md">{folder?.description}</Text>
    //           </VStack>
    //         </HStack>
    //       </Link>

    //       <Button
    //         variant="ghost"
    //         _hover={{ bg: 'red', color: 'white' }}
    //         colorScheme="blue"
    //         onClick={onOpen}
    //         isLoading={loading}
    //       >
    //         <DeleteOutlined />
    //       </Button>
    //       <Button
    //         _hover={{ bg: 'blue.200' }}
    //         colorScheme="blue"
    //         onClick={handleEdit}
    //         isLoading={loading}
    //       >
    //         <EditOutlined />
    //       </Button>
    //     </HStack>
    //   </Box>
    //   <ConfirmModal
    //     isOpen={isOpen}
    //     onClose={onClose}
    //     title={'Excluir pasta'}
    //     message={'Deseja realmente continuar?'}
    //     action={handleDelete}
    //   />
    // </ListItem>
  )
}

export default FolderCard
