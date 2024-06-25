import React from "react";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StepButton } from "./StepButton";
import SideBySideContentBox from "../../../../src/components/SideBySideContentBox";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  selectAdvancedSearchForm,
  FormActions,
  FiltersStepInput,
} from "../../../../src/store/slices/forms/advancedSearchForm";
import { selectHouse } from "../../../../src/store/slices/house";
import {
  PropositionTypeActions,
  selectPropositionType,
} from "../../../../src/store/slices/proposition/proposition-type";
import {
  selectSituation,
  SituationActions,
} from "../../../../src/store/slices/proposition/situation";
import {
  getPropositionTypes,
  getPropositionSituations,
} from "../../../../src/api/services/propositions";
import { useCallback, useEffect } from "react";
import Form from "../../../../src/components/RHF/Form";
import TextInput from "../../../../src/components/RHF/TextInput";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputBubbles from "../../../../src/components/RHF/InputBubbles";

interface HelperFiltersStepInput {
  keyword: string;
  excludeKeyword: string;
  propositionType: string;
  situation: string;
}

type AdvancedSearchFilterFormInput = FiltersStepInput & HelperFiltersStepInput;

const AdvancedSearchFiltersStep = () => {
  const dispatch = useAppDispatch();
  const { houses } = useAppSelector(selectHouse);
  const { propositionTypes } = useAppSelector(selectPropositionType);
  const { situations } = useAppSelector(selectSituation);
  const { data } = useAppSelector(selectAdvancedSearchForm);
  const {
    houseForm,
    houseIds,
    filterKeywords,
    mustNotKeywords,
    propositionTypeIds,
    situationIds,
    ...values
  } = data;

  const { handleSubmit, register, setValue, watch } =
    useForm<AdvancedSearchFilterFormInput>({
      defaultValues: {
        ...values,
        initialDate: "",
      },
    });

  const keyword = watch("keyword");
  const keywordValues = filterKeywords.map((k, idx) => ({ id: idx, label: k }));
  const excludeKeyword = watch("excludeKeyword");
  const excludeKeywordValues = (mustNotKeywords || []).map((k, idx) => ({
    id: idx,
    label: k,
  }));
  const propositionTypeValues = propositionTypes
    .filter((pt) => propositionTypeIds.includes(pt.id))
    .map((pt) => ({ id: pt.id, label: pt.description }));
  const situationValues = situations
    .filter((s) => situationIds.includes(s.id))
    .map((s) => ({ id: s.id, label: s.description }));

  const fetchPropositionTypes = useCallback(async () => {
    const results = await getPropositionTypes();
    if (results.data) {
      dispatch(PropositionTypeActions.setPropositionTypes(results.data));
    }
  }, [dispatch]);

  const fetchSituations = useCallback(async () => {
    const results = await getPropositionSituations();
    if (results.data) {
      dispatch(SituationActions.setSituations(results.data));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPropositionTypes();
    fetchSituations();
  }, [dispatch, fetchPropositionTypes, fetchSituations]);

  const handleAddKeyword = () => {
    const keywords = [...filterKeywords, keyword];
    dispatch(FormActions.setKeywords(keywords));
    setValue("keyword", "");
  };

  const handleRemoveKeyword = (_: number, keyword: string) => {
    const keywords = filterKeywords.filter((k) => k != keyword);
    dispatch(FormActions.setKeywords(keywords));
  };

  const handleAddExcludeKeyword = () => {
    const keywords = [...mustNotKeywords, excludeKeyword];
    dispatch(FormActions.setExcludeKeywords(keywords));
    setValue("excludeKeyword", "");
  };

  const handleRemoveExcludeKeyword = (_: number, keyword: string) => {
    const keywords = mustNotKeywords.filter((k) => k != keyword);
    dispatch(FormActions.setExcludeKeywords(keywords));
  };

  const handleAddPropositionType = (id: number) => {
    const ids = [...propositionTypeIds, id];
    dispatch(FormActions.setPropositionTypeIds(ids));
  };

  const handleRemovePropositionType = (id: number, _: string) => {
    const ids = propositionTypeIds.filter((ptid) => ptid != id);
    dispatch(FormActions.setPropositionTypeIds(ids));
  };

  const handleAddSituation = (id: number) => {
    const ids = [...situationIds, id];
    dispatch(FormActions.setSituationIds(ids));
  };

  const handleRemoveSituation = (id: number, _: string) => {
    const ids = situationIds.filter((sid) => sid != id);
    dispatch(FormActions.setSituationIds(ids));
  };

  const onSubmit = async (values: AdvancedSearchFilterFormInput) => {
    dispatch(FormActions.setFormFilters(values));
  };

  return (
    <SideBySideContentBox
      containerProps={{
        direction: { base: "column", md: "row" },
      }}
      sideChildrenContainerProps={{
        w: { base: "100%", md: "20%" },
      }}
      sideChildren={
        <VStack
          w={"full"}
          align={{ base: "flex-start", md: "center" }}
          justify={"space-between"}
          gap={6}
          textAlign={"center"}
        >
          <Text fontWeight={"semibold"} fontSize={"2xl"}>
            Casas
          </Text>
          <Stack
            w={"100%"}
            direction={{ base: "row", md: "column" }}
            alignItems={"center"}
            justify={{ base: "flex-start", md: "space-between" }}
            gap={{ base: 10, md: 6 }}
          >
            {houses
              .filter((h) => data.houseIds.includes(h.id))
              .map((v) => (
                <Text color={"black"} key={`selected-house-${v.id}`}>
                  {v.description}
                </Text>
              ))}
          </Stack>
        </VStack>
      }
      mainChildrenContainerProps={{
        borderLeft: { base: "none", md: "1px solid" },
        borderTop: { base: "1px solid", md: "none" },
        paddingLeft: { base: 0, md: 16 },
      }}
    >
      <Form>
        <VStack
          w={"100%"}
          align={"flex-start"}
          justify={"space-between"}
          gap={6}
        >
          <Text color={"black"} fontSize={"2xl"}>
            Filtros
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            width={"100%"}
            justify={{ base: "space-between", md: "space-between" }}
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 0, md: 6 }}
            style={{ marginTop: 0 }}
          >
            <TextInput
              id={"number"}
              label={"Número"}
              type={"text"}
              rhfregister={register("number")}
            />
            <TextInput
              id={"year"}
              label={"Ano"}
              type={"text"}
              rhfregister={register("year")}
            />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            width={"100%"}
            justify={{ base: "space-between", md: "space-between" }}
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 0, md: 6 }}
            style={{ marginTop: 0 }}
          >
            <TextInput
              id={"presentationDate"}
              label={"Data apresentação"}
              type={"date"}
              rhfregister={register("presentationDate")}
            />
            <TextInput
              id={"author"}
              label={"Autoria"}
              type={"text"}
              rhfregister={register("author")}
            />
          </Stack>

          <HStack align={"center"} w={"100%"}>
            <TextInput
              id={"keyword"}
              placeholder={"Filtre por palavras-chave..."}
              label={"Palavras-chave"}
              type={"text"}
              rhfregister={register("keyword")}
            />
            <PlusCircleOutlined
              style={{ color: "black", fontSize: 20, cursor: "pointer" }}
              onClick={handleAddKeyword}
            />
          </HStack>
          <InputBubbles
            values={keywordValues}
            removeBubble={handleRemoveKeyword}
          />

          <HStack align={"center"} w={"100%"}>
            <TextInput
              id={"excludeKeyword"}
              placeholder={"Essas palavras/frases não devem aparecer..."}
              label={"Palavras excludentes"}
              type={"text"}
              rhfregister={register("excludeKeyword")}
            />
            <PlusCircleOutlined
              style={{ color: "black", fontSize: 20, cursor: "pointer" }}
              onClick={handleAddExcludeKeyword}
            />
          </HStack>
          <InputBubbles
            values={excludeKeywordValues}
            removeBubble={handleRemoveExcludeKeyword}
          />

          <TextInput
            id={"propositionType"}
            placeholder={"Selecione tipos de proposição..."}
            label={"Tipo de proposição"}
            type={"text"}
            rhfregister={register("propositionType")}
            suggestions={{
              options: () =>
                propositionTypes
                  .map((p) => p.description)
                  .sort((a, b) => a.localeCompare(b)),
              onOptionClick: (v) => {
                setValue("propositionType", "");
                const propositionType = propositionTypes.find(
                  (pt) => pt.description === v
                );
                if (propositionType)
                  handleAddPropositionType(propositionType.id);
              },
            }}
          />
          <InputBubbles
            values={propositionTypeValues}
            removeBubble={handleRemovePropositionType}
          />

          <TextInput
            id={"situation"}
            placeholder={"Selecione situações..."}
            label={"Situação"}
            type={"text"}
            rhfregister={register("situation")}
            suggestions={{
              options: () =>
                (situations || [])
                  .map((p) => p.description)
                  .sort((a, b) => a.localeCompare(b)),
              onOptionClick: (v) => {
                setValue("situation", "");
                const situation = situations.find((s) => s.description === v);
                if (situation) handleAddSituation(situation.id);
              },
            }}
          />
          <InputBubbles
            values={situationValues}
            removeBubble={handleRemoveSituation}
          />

          {/* <Text color={"black"} fontSize={"2xl"} fontWeight={"semibold"}>
            Período
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            width={"100%"}
            justify={{ base: "space-between", md: "space-between" }}
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: 0, md: 6 }}
            style={{ marginTop: 0 }}
          >
            <TextInput
              id={"initialDate"}
              label={"Início"}
              type={"date"}
              rhfregister={register("initialDate")}
            />
            <TextInput
              id={"finalDate"}
              label={"Fim"}
              type={"date"}
              rhfregister={register("finalDate")}
            /> 
          </Stack>*/}
        </VStack>
      </Form>
      <HStack py={"2%"} px={"2%"} justifyContent={"flex-end"} w={"full"}>
        <StepButton handleSubmit={handleSubmit(onSubmit)} />
      </HStack>
    </SideBySideContentBox>
  );
};

export default AdvancedSearchFiltersStep;
