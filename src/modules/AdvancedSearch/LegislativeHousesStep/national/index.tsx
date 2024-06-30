import React from "react";
import { VStack, Button, HStack } from "@chakra-ui/react";
import { HouseInterface } from "../../../../../src/api/services/houses/interfaces/house.interface";
import CheckboxGroup from "../../../../../src/components/RHF/CheckboxGroup";
import { HouseOption, LegislativeHousesStepInput } from "../../../../../src/store/slices/forms/advancedSearchForm";
import { Control, UseFormReturn } from "react-hook-form";

interface NationalHouseOptionsProps {
  formProps: UseFormReturn<LegislativeHousesStepInput, any>;
  houses: HouseInterface[];
}

const NationalHouseOptions = ({
  houses,
  formProps,
}: NationalHouseOptionsProps) => {
  const { setValue, getValues } = formProps;

  const checkboxes = houses
    .filter((h) => h.houseType.description === "Federal")
    .map((h) => ({
      name: `federal.house-${h.id}`,
      label: h.description,
    }));

    const selectAll = () => {
      const updatedValues: Record<string, boolean> = {};
      checkboxes.forEach((checkbox) => {
        updatedValues[checkbox.name] = true;
      });
  
      checkboxes.forEach((checkbox) => {
        setValue(checkbox.name as keyof LegislativeHousesStepInput, true as unknown as string | { [id: number]: boolean; }[] | { houseIds: number[]; houses: HouseOption[]; } | { [id: number]: boolean; }[] | undefined);
      });
    };
  
    const clearSelection = () => {
      const updatedValues: Record<string, boolean> = {};
      checkboxes.forEach((checkbox) => {
        updatedValues[checkbox.name] = false;
      });
  
      checkboxes.forEach((checkbox) => {
        setValue(checkbox.name as keyof LegislativeHousesStepInput, false as unknown as unknown as string | { [id: number]: boolean; }[] | { houseIds: number[]; houses: HouseOption[]; } | { [id: number]: boolean; }[] | undefined);
      });
    };  
  

  return (
    <VStack w={"full"} align={"flex-start"} pl={"5%"}>
      {checkboxes.length > 0 && (
        <>
          <HStack spacing={4} mb={4}>
            <Button onClick={selectAll}>Selecionar Todos</Button>
            <Button onClick={clearSelection}>Limpar Seleção</Button>
          </HStack>
          <CheckboxGroup
            size="lg"
            colorScheme="blue"
            rhfControl={formProps.control as Control<any, any>}
            checkboxes={checkboxes}
          />
        </>
      )}
    </VStack>
  );
};

export default NationalHouseOptions;
