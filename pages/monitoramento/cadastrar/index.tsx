import React from 'react';
import { Text, VStack } from "@chakra-ui/react";
import LegislativeHousesStep from "../../../src/modules/AdvancedSearch/LegislativeHousesStep";
import { useRouter } from "next/router";
import Stepper from "../../../src/components/Stepper";
import AdvancedSearchFiltersStep from "../../../src/modules/AdvancedSearch/AdvancedSearchFiltersStep";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import {
  FormActions,
  selectAdvancedSearchForm,
} from "../../../src/store/slices/forms/advancedSearchForm";
import PageWrapper from "../../../src/components/PageWrapper";
import { useEffect } from "react";
import { useElasticMonitoringConfig } from "../../../src/modules/AdvancedSearch/ElasticFilters/config/monitoring";
import { ElasticFilterStep } from "../../../src/modules/AdvancedSearch/ElasticFilterStep";
import NewFilterStep from "../../../src/modules/AdvancedSearch/NewFilterStep";

export default function CreateMonitoringPage() {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectAdvancedSearchForm);
  const router = useRouter();

  const saveQuery = (value: object, searchTerm?: string) => {
    const json = JSON.stringify(value);
    dispatch(FormActions.setElasticQuery(json));
    if (searchTerm) dispatch(FormActions.setSearchTerm(searchTerm));
  };
  const config = useElasticMonitoringConfig(formState, saveQuery);

  useEffect(() => {
    dispatch(FormActions.reset());
  }, [dispatch]);

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
      component: () => <ElasticFilterStep config={config} />,
    },
  ];

  return (
    <PageWrapper
      restricted
      presentGoBack={!(formState.step === 0)}
      overrideGoBack={() =>
        formState.step === 0
          ? router.back()
          : dispatch(FormActions.setStep(formState.step - 1))
      }
    >
      <VStack w={"full"} align={"flex-start"} justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Cadastrar novo filtro monitorado
        </Text>
        <Stepper steps={steps} currentStep={formState.step} />
      </VStack>
    </PageWrapper>
  );
}
