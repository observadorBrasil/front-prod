import React from "react";
import { HStack, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../../src/components/PageWrapper";
import { useElasticAdvancedConfig } from "../../../src/modules/AdvancedSearch/ElasticFilters/config/advanced";
import {
  FormActions,
  selectAdvancedSearchForm,
} from "../../../src/store/slices/forms/advancedSearchForm";
import Stepper from "../../../src/components/Stepper";
import AdvancedSearchFiltersStep from "../../../src/modules/AdvancedSearch/AdvancedSearchFiltersStep";
import ElasticFilters from "../../../src/modules/AdvancedSearch/ElasticFilters";
import LegislativeHousesStep from "../../../src/modules/AdvancedSearch/LegislativeHousesStep";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../src/store/hooks";

export default function AdvancedSearchPage() {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectAdvancedSearchForm);
  const router = useRouter();
  const config = useElasticAdvancedConfig(formState);

  useEffect(() => {
    dispatch(FormActions.reset());
  }, [dispatch]);

  const steps = [
    {
      label: "Casa legislativa",
      order: 0,
      component: () => <LegislativeHousesStep />,
    },
    {
      label: "Filtros",
      order: 1,
      component: () => <AdvancedSearchFiltersStep />,
    },
    {
      label: "Resultados",
      order: 2,
      component: () => (
        <>
          <HStack w="100%" justifyContent={"flex-end"}>
            <Select
              placeholder="Ordenar por"
              variant="flushed"
              w="350px"
              onChange={(e) => {
                dispatch(FormActions.setSort(e.target.value));
              }}
            >
              <option value={undefined}>Padrão</option>
              <option value={"presentationdate-asc"}>
                DATA DE APRESENTAÇÃO - Crescente
              </option>
              <option value={"presentationdate-desc"}>
                DATA DE APRESENTAÇÃO - Decrescente
              </option>
              <option value={"author-asc"}>AUTORIA - A-Z </option>
              <option value={"author-desc"}>AUTORIA - Z-A </option>
            </Select>
          </HStack>
          <ElasticFilters config={config} />
        </>
      ),
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
          Busca Avançada
        </Text>
        <Stepper steps={steps} currentStep={formState.step} />
      </VStack>
    </PageWrapper>
  );
}
