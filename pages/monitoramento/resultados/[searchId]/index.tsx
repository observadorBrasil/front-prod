import React from 'react';
import { SearchOutlined } from "@ant-design/icons";
import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { getResultsBySearchId } from "@observatorio-brasil/atores/src/api/services/search-result";
import { SearchResultInterface } from "@observatorio-brasil/atores/src/api/services/search-result/interfaces/search-result.interface";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import { useDebounce } from "@observatorio-brasil/atores/src/hooks/useDebounce";
import { useSearchResultsColumns } from "@observatorio-brasil/atores/src/modules/MonitoringPage/Results/columns";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  SearchResultActions,
  selectSearchResult,
} from "@observatorio-brasil/atores/src/store/slices/search-result";
import theme from "@observatorio-brasil/atores/src/theme";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  search: "",
};

const SearchResultsPage = () => {
  const dispatch = useAppDispatch();
  const { loading, currentSearch, searchResults } =
    useAppSelector(selectSearchResult);
  const columns = useSearchResultsColumns();
  const router = useRouter();
  const { searchId } = router.query;

  const { register, watch } = useForm({ defaultValues });
  const searchValue = watch("search");
  const debouncedSearch = useDebounce(searchValue);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [filteredResults, setFilteredResults] = useState<
    SearchResultInterface[]
  >([]);

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
    if (searchId) {
      const id = parseInt(searchId.toString());
      dispatch(SearchResultActions.requestSearchResults({ searchId: id }));
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, handleSearch]);

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

          <DataTable
            size="lg"
            columns={columns}
            data={filteredResults || searchResults}
            noDataPlaceholder={"Sem dados relevantes"}
            pagination
            pageSize={5}
          />
        </Stack>
      )}
    </PageWrapper>
  );
};

export default SearchResultsPage;
