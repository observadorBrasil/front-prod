import React, { useState } from 'react';
import { Button, Center, HStack, VStack } from "@chakra-ui/react";
import { getActiveSearches } from "@observatorio-brasil/atores/src/api/services/search";
// import Button from "@observatorio-brasil/atores/src/components/Button";
import Link from "@observatorio-brasil/atores/src/components/Link";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import EditIcon from '../../public/images/edit-icon.svg'
import DeleteIcon from '../../public/images/delete-icon.svg'
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  SearchActions,
  selectSearch,
} from "@observatorio-brasil/atores/src/store/slices/search";
import { useEffect, useCallback } from "react";
import { Table } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { formatDate } from '@observatorio-brasil/atores/src/utils/date';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { onOpenDeleteModal } from '@observatorio-brasil/atores/src/store/slices/monitoringDeleteModal';
import MonitoringDeleteModal from 'src/components/Modal/Monitoring/MonitoringDeleteModal/MonitoringDeleteModal'
const MonitoringPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { searches, loading, currentUpdatingSearchId } = useAppSelector(selectSearch);
  // const columns = useSearchColumns();
  const [columns, setColumns] = useState<Array<any>>([]);

  useEffect(() => {
    if (searches.length > 0) {
      const nameFilters = Array.from(
        new Set(searches.map((item) => item.name))
      ).map((name) => ({
        text: name,
        value: name,
      }));

      const descriptionFilters = Array.from(
        new Set(searches.map((item) => item.description))
      ).map((description) => ({
        text: description,
        value: description,
      }));

      const col = [
        {
          title: "Filtro",
          dataIndex: "name",
          key: "name",
          filters: nameFilters,
          filterMode: "tree",
          filterSearch: true,
          width: "30%",
          onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
        },
        {
          title: "Descrição",
          dataIndex: "description",
          key: "description",
          filters: descriptionFilters,
          onFilter: (value: any, record: any) => record.description.indexOf(value) === 0,
          filterSearch: true,
          width: "50%",
          render: (text: string) => <div style={{ whiteSpace: "normal" }}>{text}</div>,
        },
        {
          title: "Criado em",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (text: string, record: any) => formatDate(record.createdAt.toString()),
        },
        {
          title: "Resultados",
          key: "results",
          render: (text: string, record: any) => (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
                <LinkOutlined style={{ fontSize: 22 }} onClick={() => router.push(`/monitoramento/resultados/${record.id}`)}/>
            </div>
          ),
        },
        {
          title: "Editar",
          key: "edit",
          render: (text: string, record: any) => (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <Image
                src={EditIcon}
                alt="ícone de edição"
                width={24}
                onClick={() => router.push(`/monitoramento/${record.id}/editar`)}
                className="cursor-pointer"
              />
            </div>
          ),
        },
        {
          title: "Excluir",
          key: "delete",
          render: (text: string, record: any) => (
            <div style={{ textAlign: "center" }}>
              {loading && currentUpdatingSearchId === record.id ? (
                <Loading />
              ) : (
                  <Image
                    src={DeleteIcon}
                    alt="ícone de edição"
                    width={24}
                    onClick={() => {
                    dispatch(onOpenDeleteModal({ filterId: record.id }));
                  }}
                    className="cursor-pointer"
                  />
              )}
            </div>
          ),
        },
      ];

      setColumns(col);
    }
  }, [searches, loading, router, dispatch]);

  const fetchSearches = useCallback(async () => {
    try {
      dispatch(SearchActions.setLoading(true));
      const res = await getActiveSearches();
      if (res.data) {
        dispatch(SearchActions.setSearches(res.data));
      }
    } finally {
      dispatch(SearchActions.setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSearches();
  }, [fetchSearches]);

  return (
    <>
   
    <PageWrapper restricted>
      {loading ? (
        <Center w={"100%"}>
          <Loading />
        </Center>
      ) : (
        <VStack
          w={"100%"}
          alignItems={{ base: "flex-start" }}
          justifyContent={"space-between"}
          margin={"1% 0"}
        >
          <HStack w={"100%"} justifyContent={"space-between"}>
            <h2 className='text-xl text-primary font-bold'>
              Visualizar filtros monitorados
            </h2>
            <Link href="/monitoramento/cadastrar">
            <Button
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
            </Link>
          </HStack>
          {/* <DataTable
            size="lg"
            columns={columns}
            data={searches}
            pageSize={5}
            pagination
          /> */}
            <div className="h-full w-full mt-4">
            <Table
                columns={columns}
                dataSource={searches.slice(0, 6)}
                size="small"
                rowKey="id"
              />
              </div>
        </VStack>
      )}
      </PageWrapper>
      <MonitoringDeleteModal />
    </>
  );
};

export default MonitoringPage;
