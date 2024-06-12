import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { getActiveSearches } from "@observatorio-brasil/atores/src/api/services/search";
import Button from "@observatorio-brasil/atores/src/components/Button";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import Link from "@observatorio-brasil/atores/src/components/Link";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import { useSearchColumns } from "@observatorio-brasil/atores/src/modules/MonitoringPage/columns";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  SearchActions,
  selectSearch,
} from "@observatorio-brasil/atores/src/store/slices/search";
import { useEffect, useCallback } from "react";

const MonitoringPage = () => {
  const dispatch = useAppDispatch();
  const { searches, loading } = useAppSelector(selectSearch);
  const columns = useSearchColumns();

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
          margin={"2% 0"}
        >
          <HStack w={"100%"} justifyContent={"space-between"} py={"1%"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Visualizar filtros monitorados
            </Text>
            <Link href="/monitoramento/cadastrar">
              <Button variant="primary" alignSelf={"flex-end"}>
                Cadastrar novo filtro
              </Button>
            </Link>
          </HStack>
          <DataTable
            size="lg"
            columns={columns}
            data={searches}
            pageSize={5}
            pagination
          />
        </VStack>
      )}
    </PageWrapper>
  );
};

export default MonitoringPage;
