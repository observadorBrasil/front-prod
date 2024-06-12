import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { getHouses } from "@observatorio-brasil/atores/src/api/services/houses";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  FormActions,
  LegislativeHousesStepInput,
  selectAdvancedSearchForm,
} from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import {
  HouseActions,
  selectHouse,
} from "@observatorio-brasil/atores/src/store/slices/house";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StepButton } from "../AdvancedSearchFiltersStep/StepButton";
import MunicipalHouseOptions from "./municipal";
import NationalHouseOptions from "./national";
import RegionButton from "./RegionButton";
import StateHouseOptions from "./state";

type LegislativesRegions = "federal" | "state" | "municipal";

const LegislativeHousesStep = () => {
  const dispatch = useAppDispatch();
  const { houses } = useAppSelector(selectHouse);
  const { data, step } = useAppSelector(selectAdvancedSearchForm);

  const formProps = useForm<LegislativeHousesStepInput>({
    defaultValues: data.houseForm,
  });
  const { handleSubmit } = formProps;

  const [currentHouse, setCurrentHouse] =
    useState<LegislativesRegions>("federal");

  const fetchHouses = useCallback(async () => {
    const results = await getHouses();
    if (results.data) {
      dispatch(HouseActions.setHouses(results.data));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  const onSubmit = (data: LegislativeHousesStepInput) => {
    dispatch(FormActions.setFormHouses(data));
    dispatch(FormActions.setStep(step + 1));
  };

  const renderCurrentHouseOptions = () => {
    switch (currentHouse) {
      case "federal":
        return <NationalHouseOptions formProps={formProps} houses={houses} />;
      case "state":
        return <StateHouseOptions formProps={formProps} houses={houses} />;
      case "municipal":
        return <MunicipalHouseOptions formProps={formProps} houses={houses} />;
      default:
        return <Text>Casa não encontrada</Text>;
    }
  };

  return (
    <VStack
      w={"full"}
      align={"center"}
      justifyContent={"space-between"}
      borderRadius={"10px"}
      boxShadow={"0px 0px 7px rgba(0, 0, 0, 0.25)"}
      mt={"4%"}
    >
      <HStack
        w={"full"}
        align={"center"}
        justifyContent={"space-between"}
        backgroundColor={"primary"}
        pt={"6px"}
        pb={"6px"}
        borderTopRadius={"10px"}
      >
        <RegionButton
          isSelectedHouse={currentHouse === "federal"}
          shouldHaveBorder
          onClick={() => setCurrentHouse("federal")}
        >
          Federal
        </RegionButton>
        <RegionButton
          isSelectedHouse={currentHouse === "state"}
          shouldHaveBorder
          onClick={() => setCurrentHouse("state")}
        >
          Estado
        </RegionButton>
        <RegionButton
          isSelectedHouse={currentHouse === "municipal"}
          onClick={() => setCurrentHouse("municipal")}
        >
          Município
        </RegionButton>
      </HStack>
      <HStack
        w={"full"}
        borderBottomRadius={"10px"}
        padding={"8px"}
        minHeight={"240px"}
        align={"flex-start"}
      >
        {renderCurrentHouseOptions()}
      </HStack>
      <HStack py={"2%"} px={"2%"} justifyContent={"flex-end"} w={"full"}>
        <StepButton handleSubmit={handleSubmit(onSubmit)} />
      </HStack>
    </VStack>
  );
};

export default LegislativeHousesStep;
