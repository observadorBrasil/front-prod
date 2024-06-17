/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react'
import PageWrapper from '../src/components/PageWrapper'
import Image from 'next/image'
import EyeIcon from '../public/images/eye-svgrepo-com 1.svg'
import EditIcon from '../public/images/edit-svgrepo-com 1.svg'
import DeleteIcon from '../public/images/trash-bin-minimalistic-svgrepo-com 1.svg'
import HumanSvg from '../public/images/human-svg-dashboard.svg'
import ShieldLogo from '../public/images/iconLogo.svg'
import { useSelector } from 'react-redux'
import { selectUser } from '../src/store/slices/user'
import { selectNotification } from '../src/store/slices/notification'
import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Table } from 'antd'
import { selectSearch, SearchActions } from '../src/store/slices/search'
import { Search } from '@prisma/client'
import { Loading } from '../src/components/Loading'
import BarChart from '../src/components/Charts/BarChart/BarChart'
import Select from 'react-select'
import { ClientInterface } from '../src/api/services/clients/interfaces/client.interface'
import { searchClientByName } from '../src/api/services/clients'
import { getResultsBySearchId } from '../src/api/services/search-result'
import { SearchResultInterface } from '../src/api/services/search-result/interfaces/search-result.interface'
import DonutArea from '../src/components/DonutDashArea/DonutArea/DonutArea'
import Dashboard from '../src/patterns/Dashboard'
import { getActiveSearches } from '../src/api/services/search'
import { useAppDispatch } from '../src/store/hooks'
// https://github.com/nrwl/nx/issues/9017#issuecomment-1180462040
// import path from 'path'
// path.resolve('./next.config.js')
interface ResultProps {
  id: number
  data: any[]
}

interface ResultChartsProps {
  id: number
  data: SearchResultInterface[]
  label: string
}

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useSelector(selectUser)
  const { notifications } = useSelector(selectNotification)
  const { searches } = useSelector(selectSearch)
  console.log('searches', searches)
  const [actionLoading, setActionLoading] = useState(false)
  const [donutOne, setDonutOne] = useState(false)
  const [donutTwo, setDonutTwo] = useState(false)
  const [columns, setColumns] = useState<Array<any>>([])
  const [recordKey, setRecordKey] = useState(null)
  // const [columnsPropositions, setColumnsPropositions] = useState<Array<any>>([])
  const toast = useToast()
  const [selectedFolder, setSelectedFolder] = useState<ResultProps>({
    id: 0,
    data: [],
  })
  console.log('selectedFolder', selectedFolder)

  const [selectedFolderOne, setSelectedFolderOne] = useState<ResultChartsProps>(
    {
      id: 0,
      data: [],
      label: '',
    },
  )
  console.log('selectedFolderOne', selectedFolderOne)

  const [selectedFolderTwo, setSelectedFolderTwo] = useState<ResultChartsProps>(
    {
      id: 0,
      data: [],
      label: '',
    },
  )

  const [clients, setClients] = useState<ClientInterface[]>([])

  const [is2XL, setIs2XL] = useState(false)

  useEffect(() => {
    if (window !== undefined && recordKey && recordKey !== null) {
      router.push('/proposicoes/' + recordKey)
    }
  }, [recordKey, router])

  useEffect(() => {
    const handleResize = () => {
      setIs2XL(window.innerWidth >= 1536) // 1536px é o breakpoint padrão para 2xl no Tailwind CSS
    }

    window.addEventListener('resize', handleResize)

    // Chama a função imediatamente para definir o estado inicial
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const fetchSearches = useCallback(async () => {
    try {
      dispatch(SearchActions.setLoading(true))
      const res = await getActiveSearches()
      if (res.data) {
        dispatch(SearchActions.setSearches(res.data))
      }
    } finally {
      dispatch(SearchActions.setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchSearches()
  }, [fetchSearches])

  const propositionColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '33%',
      render: (text: string) => (
        <Tooltip label={text}>
          <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '33%',
      filters: [
        { text: 'Pendente', value: 'Pendente' },
        { text: 'Visualizado', value: 'Visualizado' },
        { text: 'Ignorado', value: 'Ignorado' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <div className="flex gap-4 ml-auto">
          <Image
            src={EyeIcon}
            alt="ícone de edição"
            width={20}
            onClick={() => {
              setRecordKey(record.key)
            }}
            className="cursor-pointer"
          ></Image>
          <Image
            src={EditIcon}
            alt="ícone de edição"
            width={20}
            onClick={() => handleEdit(record)}
            className="cursor-pointer"
          ></Image>
          <Image
            src={DeleteIcon}
            alt="ícone de deleção"
            width={20}
            onClick={() => handleDelete(record)}
            className="cursor-pointer"
          ></Image>
        </div>
      ),
    },
  ]

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      maxWidth: 240,
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      zIndex: 50,
      width: '240px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: 200,
    }),
  }

  const columnsWithSelect = [
    {
      title: (
        <Select
          placeholder="Selecione uma pasta"
          styles={customStyles}
          onChange={(e) => {
            handleGetPl(Number(e?.value))
          }}
          options={searches.map((i) => {
            return { value: i.id, label: i.name }
          })}
          menuPortalTarget={document.body}
        ></Select>
      ),
      children: propositionColumns,
    },
  ]

  const handleGetPlOne = async (id: number, label: string) => {
    try {
      setDonutOne(true)
      const results = await getResultsBySearchId(+id, '')
      if (results.data) {
        setSelectedFolderOne({
          id,
          data: results.data,
          label,
        })
      }
    } finally {
      setDonutOne(false)
    }
  }

  const handleGetPlTwo = async (id: number, label: string) => {
    try {
      setDonutTwo(true)
      const results = await getResultsBySearchId(+id, '')
      if (results.data) {
        setSelectedFolderTwo({
          id,
          data: results.data,
          label,
        })
      }
    } finally {
      setDonutTwo(false)
    }
  }

  const handleGetPl = async (id: number) => {
    const identity = parseInt(id.toString())
    console.log('identity', identity)
    try {
      setActionLoading(true)
      const results = await getResultsBySearchId(identity, '')
      if (results.data) {
        const transformedData = results.data.map((i) => ({
          key: i.id,
          name: i.proposition.ementa,
          status: i.searchResultStatus?.description,
        }))
        setSelectedFolder({
          id,
          data: transformedData,
        })
      }
    } finally {
      setActionLoading(false)
    }
  }
  const handleSearch = async () => {
    try {
      const results = await searchClientByName('')
      if (results.data) {
        setClients(results.data)
      }
    } catch (e: any) {
      toast({ status: 'error', description: e?.message })
    }
  }

  /* const fetchSearches = useCallback(async () => {
    try {
      dispatch(SearchActions.setLoading(true))
      const res = await getActiveSearches()
      if (res.data) {
        dispatch(SearchActions.setSearches(res.data))
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      dispatch(SearchActions.setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchSearches()
  }, [fetchSearches])
*/
  useEffect(() => {
    handleSearch()
  }, [])

  useEffect(() => {
    if (searches.length > 0) {
      const nameFilters = Array.from(
        new Set(searches.map((item) => item.name)),
      ).map((name) => ({
        text: name,
        value: name,
      }))

      const descriptionFilters = Array.from(
        new Set(searches.map((item) => item.description)),
      ).map((description) => ({
        text: description,
        value: description,
      }))

      const col = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
          filters: nameFilters,
          filterMode: 'tree',
          filterSearch: true,
          width: '30%',
          onFilter: (value: string, record: Search) => {
            return record.name.indexOf(value) === 0
          },
        },
        {
          title: 'Descrição',
          dataIndex: 'description',
          key: 'description',
          filters: descriptionFilters,
          onFilter: (value: string, record: Search) =>
            record.description?.indexOf(value) === 0,
          filterSearch: true,
          width: '50%',
        },
        {
          title: 'Ações',
          dataIndex: 'action',
          key: 'actions',
          render: (text: any, record: Search) => (
            <div className="flex gap-4 ml-auto">
              <Image
                src={EyeIcon}
                alt="ícone de edição"
                width={20}
                onClick={() => {
                  setActionLoading(true)
                  router.push(`/monitoramento/resultados/${record.id}`)
                }}
                className="cursor-pointer"
              ></Image>
              <Image
                src={EditIcon}
                alt="ícone de edição"
                width={20}
                onClick={() => handleEdit(record)}
                className="cursor-pointer"
              ></Image>
              <Image
                src={DeleteIcon}
                alt="ícone de deleção"
                width={20}
                onClick={() => handleDelete(record)}
                className="cursor-pointer"
              ></Image>
            </div>
          ),
        },
      ]

      setColumns(col)
    }
  }, [searches])

  const handleEdit = (record: Search) => {
    console.log('Editar', record)
  }

  const handleDelete = (record: Search) => {
    console.log('Deletar', record)
  }

  const clientsOptions = clients.map((c) => {
    return { value: c.name, label: c.name }
  })
  console.log('clientsOptions', clientsOptions)

  return (
    <PageWrapper restricted>
      {actionLoading ? <Loading /> : null}
      <Dashboard.Root>
        <Dashboard.Select
          text="Selecione um cliente"
          // options={clientsOptions.map((i) => {
          //   return { value: i.label, label: i.label }
          // })}
          options={[{value: "Selecione um cliente", label: 'Selecione um cliente'}]}
          className="max-w-[300px] mb-4"
        />
        <div className="2xl:flex gap-4 justify-between w-full max-w-full overflow-hidden">
          <div className="bg-primary w-full lg:max-w-[100%] mb-5 2xl:mb-0 xl:w-full 2xl:w-1/3 relative h-96 rounded-xl overflow-auto">
            <div className="mt-4 ml-4">
              <h2 className="text-white font-bold text-2xl">
                Bem vindo de volta,
                <span className="text-aditional-limon-green">
                  {' '}
                  {user?.email}
                </span>
              </h2>
              <h3 className="text-white font-bold text-lg">
                Você tem{' '}
                <span className="text-aditional-limon-green">
                  {notifications?.length}
                </span>{' '}
                novas notificações!
              </h3>
              <p className="text-white font-bold text-sm">
                Desejamos um bom dia!
              </p>
            </div>
            <Image
              src={ShieldLogo}
              alt="logo do observatório brasil"
              className="absolute left-4 bottom-3 w-9"
            ></Image>
            <Image
              src={HumanSvg}
              alt="imagem de um homem usando o computador"
              className="absolute right-0 bottom-0"
            ></Image>
          </div>

          <div className="xl:w-full 2xl:w-2/3 overflow-hidden h-96 rounded-xl bg-white p-4 mt-4 lg:mt-0">
            <div className="flex w-full justify-between">
              <h1 className="text-lg text-primary font-medium">
                Últimos filtros monitorados
              </h1>
              <Button
                backgroundColor={'#fff'}
                _hover={{ background: '#3D57C5' }}
                height={8}
                className="border-2 border-primary-blue-800"
                onClick={() => router.push('/monitoramento')}
              >
                <span className="text-primary-blue-800 hover:text-white">
                  Ver todos
                </span>
              </Button>
            </div>
            <div className="h-full w-full mt-4">
              <Table
                pagination={false}
                columns={columns}
                dataSource={searches.slice(0, 6)}
                size="small"
                rowKey="id"
              />
            </div>
          </div>
        </div>

        <div className="2xl:w-full h-full xl:flex-col 2xl:flex 2xl:flex-row gap-4 mt-4">
          <div className="md:w-full xl:w-full 2xl:w-1/3 mb-4 2xl:mb-0 bg-white rounded-xl h-full flex flex-col">
           <div className="md:w-full xl:pb-3 w-full mt-4 flex-grow flex flex-col overflow-hidden">
          <Table
            columns={columnsWithSelect}
            dataSource={selectedFolder.data.slice(0, 200)}
            size="small"
            rowKey="key"
            className="flex-grow rounded-xl w-[99%]"
            scroll={{
              x: 'max-content',
              y: 'calc(100vh - 300px)', // Ajuste conforme necessário para reservar espaço para outros elementos
            }}
            pagination={{ position: ['bottomRight'] }} // Para fixar o rodapé (paginação)
          />
        </div> 
        </div>

          <div className="xl:w-full 2xl:w-2/3 gap-4 flex flex-col justify-between">
            <div className="bg-white h-full w-full rounded-xl">
              <BarChart></BarChart>
            </div> 
            <div className="bg-white pb-6 h-[340px] w-full rounded-xl flex justify-around">
              <DonutArea
                searches={searches}
                actionLoading={donutOne}
                handleGetPl={handleGetPlOne}
                selectedFolder={selectedFolderOne}
              />

              <DonutArea
                searches={searches}
                actionLoading={donutTwo}
                handleGetPl={handleGetPlTwo}
                selectedFolder={selectedFolderTwo}
              />
            </div>
          </div>
        </div>
      </Dashboard.Root>
    </PageWrapper>
  )
}
