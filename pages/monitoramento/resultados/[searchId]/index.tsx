import React from 'react';
import { DeleteOutlined, LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { getResultsBySearchId } from "../../../../src/api/services/search-result";
import { SearchResultInterface } from "../../../../src/api/services/search-result/interfaces/search-result.interface";
import DataTable from "../../../../src/components/DataTable/DataTable";
import { Loading } from "../../../../src/components/Loading";
import PageWrapper from "../../../../src/components/PageWrapper";
import Form from "../../../../src/components/RHF/Form";
import TextInput from "../../../../src/components/RHF/TextInput";
import { useDebounce } from "../../../../src/hooks/useDebounce";
import { useSearchResultsColumns } from "../../../../src/modules/MonitoringPage/Results/columns";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  SearchResultActions,
  selectSearchResult,
} from "../../../../src/store/slices/search-result";
import theme from "../../../../src/theme";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge, Table, Tooltip } from 'antd';
import { formatDate } from '@observatorio-brasil/atores/src/utils/date';
import Link from 'next/link';
import { resultMockSearch } from '@observatorio-brasil/atores/database';

const defaultValues = {
  search: "",
};

const SearchResultsPage = () => {
  const dispatch = useAppDispatch();
  const { loading, currentSearch, searchResults, currentUpdatingSearchResultId } =
    useAppSelector(selectSearchResult);
  // const columns = useSearchResultsColumns();
  const router = useRouter();
  const { searchId } = router.query;

  const { register, watch } = useForm({ defaultValues });
  const searchValue = watch("search");
  const debouncedSearch = useDebounce(searchValue);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [filteredResults, setFilteredResults] = useState<
    SearchResultInterface[]
    >([]);
  
const searchStatusColors = {
  Pendente: { color: "purple" },
  Visualizado: { color: "green" },
  Ignorado: { color: "red" },
} as const;

  type SearchStatusKeys = keyof typeof searchStatusColors;
  
  useEffect(() => { 
    dispatch(SearchResultActions.setLoadingFalse(false))
  }, [])

  const columns = [
    {
      title: 'Status',
      dataIndex: 'searchResultStatus',
      key: 'status',
      render: (status: { description: SearchStatusKeys }) => (
        <Badge color={searchStatusColors[status.description]?.color}>
          {status.description}
        </Badge>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: ['proposition', 'propositionType', 'description'],
      key: 'tipo',
    },
    {
      title: 'Número',
      dataIndex: ['proposition', 'number'],
      key: 'numero',
      width: 120,
    },
    {
      title: 'Ano',
      dataIndex: ['proposition', 'year'],
      key: 'ano',
    },
    {
      title: 'Casa',
      dataIndex: ['proposition', 'house', 'description'],
      key: 'casa',
    },
    {
      title: 'Autoria',
      dataIndex: ['proposition', 'author'],
      key: 'autoria',
    },
    {
      title: 'Ementa',
      dataIndex: ['proposition', 'ementa'],
      key: 'ementa',
      render: (ementa: string) => {
        if (ementa) {
          const raw = ementa.toString();
          return raw.length > 20 ? (
            <Tooltip title={raw}>{`${raw.substring(0, 19)}...`}</Tooltip>
          ) : (
            raw
          );
        }
        return null;
      },
    },
    {
      title: 'Data de apresentação',
      dataIndex: ['proposition', 'presentationDate'],
      key: 'dataApresentacao',
      width: 240,
      minWidth: 240,
      render: (date: string) => formatDate(date.toString()),
    },
    {
      title: 'Visualizar',
      key: 'visualizar',
      width: 180,
      minWidth: 180,
      render: (_: any, record: SearchResultInterface) => {
        const { id, proposition, searchResultStatus } = record;
        const handleClick = () => {
          if (searchResultStatus.description === 'Visualizado') return;
          dispatch(
            SearchResultActions.requestUpdateSearchResult({
              status: 'read',
              id,
            })
          );
          dispatch(SearchResultActions.setLoadingFalse(false))
        };
        return currentUpdatingSearchResultId === 999 ? ( // Alterado. Troque 999 por 'id'
          <div style={{ textAlign: 'center' }}>
            <Loading />
          </div>
        ) : (
          <Link href={`/proposicoes/${proposition.id}`}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <LinkOutlined style={{ fontSize: 22 }} onClick={handleClick} />
            </div>
          </Link>
        );
      },
    },
    {
      title: 'Ignorar',
      key: 'ignorar',
      width: 180,
      minWidth: 180,
      render: (_: any, record: SearchResultInterface) => {
        const { id } = record;
        return currentUpdatingSearchResultId === 999 ? ( // Alterado. Troque 999 por 'id'
          <div style={{ textAlign: 'center' }}>
            <Loading />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <DeleteOutlined
              style={{ fontSize: 22 }}
              onClick={() =>
                dispatch(
                  SearchResultActions.requestUpdateSearchResult({
                    status: 'ignored',
                    id,
                  })
                )
              }
            />
          </div>
        );
      },
    },
  ];

  const handleSearch = useCallback(async () => {
    if (!debouncedSearch) {
      setFilteredResults(searchResults);
      return;
    }
 
    try {
      setLoadingSearch(true);
      const id = parseInt(searchId!.toString());
      const results = await getResultsBySearchId(+id, debouncedSearch);
      if (results.data) {
        setFilteredResults(results.data);
      }
    } finally {
      setLoadingSearch(false);
      }
    
      
  }, [debouncedSearch, searchId, searchResults]);

  useEffect(() => {
    if (searchId && parseInt(searchId.toString()) !== 999) {
      const id = parseInt(searchId.toString());
      dispatch(SearchResultActions.requestSearchResults({ searchId: id }));
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (searchId && parseInt(searchId.toString()) !== 999) {
      handleSearch();
    } else {
      const mockSearch = resultMockSearch()
      setFilteredResults(mockSearch)
    }
  }, [debouncedSearch, handleSearch]);

  const data = filteredResults || searchResults;

  return (
    <PageWrapper restricted>
      {loading && currentSearch?.id?.toString() !== searchId ? (
        <Center w={"100%"}>
          <Loading />
        </Center>
      ) : (
        <Stack
          direction={{ base: "column" }}
          w={"100%"}
          alignItems={{ base: "flex-start" }}
          justifyContent={"space-between"}
          margin={"2% 0"}
        >
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {`Resultados do filtro "${currentSearch?.name}"`}
          </Text>
          <Text fontSize={"md"}>{`${currentSearch?.description}`}</Text>

          <Form>
            <TextInput
              rhfregister={register("search")}
              id={"results_search"}
              type={"text"}
              icon={
                loadingSearch ? (
                  <Spinner color={theme.colors.primary} />
                ) : (
                  <SearchOutlined
                    style={{
                      borderColor: theme.colors.primary,
                      fontSize: "25px",
                    }}
                  />
                )
              }
              placeholder={"Buscar resultado..."}
            />
          </Form>
           <div className="w-full md:w-[99%] lg:w-[79%] lg1058:w-[89%] xl:w-[99%]">
            <Table
              columns={columns}
              dataSource={data}
              locale={{ emptyText: "Sem dados relevantes" }}
              rowKey={(record) => record.id.toString()}
              pagination={{ position: ['bottomRight'] }}
              scroll={{ x: true, y: 300 }}
              />
            </div>
        </Stack>
      )}
    </PageWrapper>
  );
};

export default SearchResultsPage;
