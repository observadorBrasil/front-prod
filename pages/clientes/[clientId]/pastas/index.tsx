import React, { useEffect, useState, useCallback } from 'react'
import {
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDebounce } from '../../../../src/hooks/useDebounce'

import { useRouter } from 'next/router'
import FolderCard from '../../../../src/components/FolderCard'
import PageWrapper from '../../../../src/components/PageWrapper'
import { searchFolderByName } from '../../../../src/api/services/folders'
import { Client, Folder } from '@prisma/client'
import { getClientById } from '../../../../src/api/services/clients'
import { Loading } from '../../../../src/components/Loading'
import { HistoryItem } from '../../../../src/modules/RouteHistory'
import ChakraInput from '../../../../src/components/CrakraInput/ChakraInput'
import { FaSearch } from 'react-icons/fa'
import FolderActionModal from '../../../../src/components/Modal/Client/FoulderActionModal/FolderActionModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  onClose,
  onOpen,
} from '../../../../src/store/slices/clientFolderModal/index'
import FolderDeleteModal from '../../../../src/components/Modal/Client/FolderDeleteModal/FolderDeleteModal'
import { FolderActions } from '../../../../src/store/slices/folder'

const defaultValues = {
  search: '',
}

export default function ClientFoldersPage() {
  const { register, watch } = useForm({ defaultValues })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { folders } = useSelector((state: any) => state.folder)
  const router = useRouter()
  const { clientId } = router.query
  const toast = useToast()

  const dispatch = useDispatch()

  const searchValue = watch('search')
  const debouncedSearch = useDebounce(searchValue)

  const [client, setClient] = useState<Client | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleSearch = useCallback(async () => {
    try {
      const id = clientId!.toString()
      const results = await searchFolderByName(+id, debouncedSearch)
      if (results.data) {
        dispatch(FolderActions.searchFolders({ folders: results.data }))
        setIsLoading(false)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast({ status: 'error', description: e?.message })
    } finally {
      setIsLoading(false)
    }
  }, [clientId, debouncedSearch])

  const fetchClient = useCallback(async () => {
    const id = clientId!.toString()
    const result = await getClientById(id)
    if (result.data) {
      setClient(result.data)
    }
  }, [clientId])

  // const redirectToCreateFolder = () => {
  //   router.push(`/clientes/${clientId?.toString()}/pastas/cadastrar`)
  // }

  useEffect(() => {
    dispatch(onClose())
  }, [])

  useEffect(() => {
    if (clientId) {
      handleSearch()
    }
  }, [clientId, debouncedSearch, handleSearch])

  useEffect(() => {
    if (clientId) {
      fetchClient()
    }
  }, [clientId, fetchClient])

  // const RouteHistory = () => {
  //   return (
  //     <Breadcrumb>
  //       <BreadcrumbItem>
  //         <BreadcrumbLink href="/clientes">Clientes</BreadcrumbLink>
  //       </BreadcrumbItem>

  //       <BreadcrumbItem>
  //         <BreadcrumbLink isCurrentPage>{client?.nickName}</BreadcrumbLink>
  //       </BreadcrumbItem>
  //     </Breadcrumb>
  //   )
  // }

  const routeHistory: HistoryItem[] = [
    { label: 'Clientes', url: '/clientes', isCurrentPage: false },
    { label: client?.nickName, url: '#', isCurrentPage: true },
  ]

  return (
    <PageWrapper restricted>
      <section className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <InputGroup className="max-w-60 md:max-w-72 lg:max-w-80">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="#B3B3B3" />
            </InputLeftElement>
            <ChakraInput
              rhfregister={register('search')}
              id={'folders_search'}
              type={'text'}
              placeholder="Pesquise aqui"
              paddingLeft={'2.5rem'}
              backgroundColor={'#EDEDED'}
            />
          </InputGroup>
          <Button
            onClick={() =>
              dispatch(
                onOpen({
                  clientId,
                  isOpen: true,
                  isCreate: true,
                  folderId: '',
                }),
              )
            }
            className="ml-auto"
            backgroundColor={'#131931'}
            color={'secondary'}
            variant={'solid'}
            type={'submit'}
            _hover={{
              backgroundColor: '#31437E', // Cor de fundo no hover
              color: 'secondary', // Cor do texto no hover, se necessário
            }}
          >
            Criar nova Pasta
          </Button>
        </div>

        <div className="mt-9">
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {!folders.length && !isLoading ? (
                <div>Nenhuma pasta cadastrada</div>
              ) : (
                folders.map((item: Folder) => {
                  return (
                    <FolderCard
                      key={item.id}
                      clientId={item.id.toString()}
                      folder={item}
                      refresh={handleSearch}
                    />
                  )
                })
              )}
            </div>
          )}
        </div>
      </section>
      <FolderActionModal />
      <FolderDeleteModal />
    </PageWrapper>
  )
}
