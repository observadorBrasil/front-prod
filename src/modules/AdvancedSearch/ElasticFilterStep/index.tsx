import React from "react";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import {
  createSearch,
  updateSearch,
} from "../../../../src/api/services/search";
import { Loading } from "../../../..src/components/Loading";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../..src/store/hooks";
import {
  FormActions,
  selectAdvancedSearchForm,
} from "../../../..src/store/slices/forms/advancedSearchForm";
import { useRouter } from "next/router";
import { useState } from "react";
import { StepButton } from "../AdvancedSearchFiltersStep/StepButton";
import ElasticFilters from "../ElasticFilters";

interface ElasticFilterStepProps {
  config: any;
  searchId?: number;
}

interface SavedMessageProps {
  searchId?: number;
}

const SavedMessage = ({ searchId }: SavedMessageProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const goBack = () => {
    dispatch(FormActions.reset());
    if (searchId) router.replace("/monitoramento");
  };

  return (
    <>
      <Text fontSize={"xl"} fontWeight={"semibold"}>
        Filtro monitorado salvo com sucesso!
      </Text>
      <HStack py={"2%"} px={"2%"} justifyContent={"flex-end"} w={"full"}>
        <Button
          onClick={goBack}
          backgroundColor={"primary"}
          w={{ base: "100%", md: "15%" }}
        >
          <Text fontSize={"md"} fontWeight={"light"} color={"secondary"}>
            Voltar
          </Text>
        </Button>
      </HStack>
    </>
  );
};

export const ElasticFilterStep = ({
  config,
  searchId,
}: ElasticFilterStepProps) => {
  const dispatch = useAppDispatch();

  const {
    loading,
    query,
    data,
    scheduledFilter: { name, description },
  } = useAppSelector(selectAdvancedSearchForm);

  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      dispatch(FormActions.setLoading(true));
      if (searchId) {
        await updateSearch(searchId, {
          name,
          description,
          query: query,
          advancedFormState: JSON.stringify(data),
        });
      } else {
        await createSearch({
          name,
          description,
          query: query || "",
          advancedFormState: JSON.stringify(data),
        });
      }
      setSaved(true);
    } finally {
      dispatch(FormActions.setLoading(false));
    }
  };

  return (
    <VStack
      w={"full"}
      py={"2%"}
      px={"2%"}
      align={"center"}
      justifyContent={"space-between"}
      borderRadius={"10px"}
      boxShadow={"0px 0px 7px rgba(0, 0, 0, 0.25)"}
    >
      {loading && <Loading />}
      {!saved && !loading && (
        <>
          <ElasticFilters config={config} />
          <HStack py={"2%"} px={"2%"} justifyContent={"flex-end"} w={"full"}>
            <StepButton
              buttonText="Salvar Filtro Monitorado"
              shouldIncrement={false}
              handleSubmit={handleSubmit}
            />
          </HStack>
        </>
      )}
      {saved && <SavedMessage searchId={searchId} />}
    </VStack>
  );
};
