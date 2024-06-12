import React from 'react';
import { Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FormActions,
  selectAdvancedSearchForm,
} from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import { useCallback, useEffect } from "react";
import { useElasticMonitoringConfig } from "@observatorio-brasil/atores/src/modules/AdvancedSearch/ElasticFilters/config/monitoring";
import { ElasticFilterStep } from "@observatorio-brasil/atores/src/modules/AdvancedSearch/ElasticFilterStep";
import NewFilterStep from "@observatorio-brasil/atores/src/modules/AdvancedSearch/NewFilterStep";
import Stepper from "@observatorio-brasil/atores/src/components/Stepper";
import AdvancedSearchFiltersStep from "@observatorio-brasil/atores/src/modules/AdvancedSearch/AdvancedSearchFiltersStep";
import LegislativeHousesStep from "@observatorio-brasil/atores/src/modules/AdvancedSearch/LegislativeHousesStep";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import { getSearchById } from "@observatorio-brasil/atores/src/api/services/search";

export default function EditMonitoringPage() {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectAdvancedSearchForm);
  const router = useRouter();

  const { searchId } = router.query;

  const saveQuery = (value: object, searchTerm?: string) => {
    const json = JSON.stringify(value);
    dispatch(FormActions.setElasticQuery(json));
    if (searchTerm) dispatch(FormActions.setSearchTerm(searchTerm));
  };
  const config = useElasticMonitoringConfig(formState, saveQuery);

  const fetchSearch = useCallback(async () => {
    const id = searchId!;
    const result = await getSearchById(+id);
    if (result.data) {
      const { name, description, advancedFormState, query } = result.data;
      const parsedState = JSON.parse(advancedFormState as string);
      dispatch(FormActions.setScheduledFilter({ name, description }));
      dispatch(FormActions.setData(parsedState));
      dispatch(FormActions.setElasticQuery(query as string));
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    dispatch(FormActions.reset());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      fetchSearch();
    }
  }, [searchId, fetchSearch]);

  const steps = [
    {
      label: "Novo filtro",
      order: 0,
      component: () => <NewFilterStep />,
    },
    {
      label: "Casa legislativa",
      order: 1,
      component: () => <LegislativeHousesStep />,
    },
    {
      label: "Filtros",
      order: 2,
      component: () => <AdvancedSearchFiltersStep />,
    },
    {
      label: "Palavras-chave",
      order: 3,
      component: () => (
        <ElasticFilterStep config={config} searchId={+searchId!} />
      ),
    },
  ];

  const handleGoBack = () => {
    if (formState.step === 0) {
      dispatch(FormActions.reset());
      router.back();
      return;
    }
    dispatch(FormActions.setStep(formState.step - 1));
  };

  return (
    <PageWrapper restricted presentGoBack overrideGoBack={handleGoBack}>
      <VStack w={"full"} align={"flex-start"} justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Editar filtro monitorado
        </Text>
        <Stepper steps={steps} currentStep={formState.step} />
      </VStack>
    </PageWrapper>
  );
}
