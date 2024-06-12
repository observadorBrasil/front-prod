import { VStack } from "@chakra-ui/react";
import { HouseInterface } from "@observatorio-brasil/atores/src/api/services/houses/interfaces/house.interface";
import CheckboxGroup from "@observatorio-brasil/atores/src/components/RHF/CheckboxGroup";
import { LegislativeHousesStepInput } from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import { Control, UseFormReturn } from "react-hook-form";

interface NationalHouseOptionsProps {
  formProps: UseFormReturn<LegislativeHousesStepInput, any>;
  houses: HouseInterface[];
}

const NationalHouseOptions = ({
  houses,
  formProps,
}: NationalHouseOptionsProps) => {
  const checkboxes = houses
    .filter((h) => h.houseType.description === "Federal")
    .map((h) => ({
      name: `federal.house-${h.id}`,
      label: h.description,
    }));

  return (
    <VStack w={"full"} align={"flex-start"} pl={"5%"}>
      {checkboxes.length > 0 && (
        <CheckboxGroup
          size="lg"
          colorScheme="blue"
          rhfControl={formProps.control as Control<any, any>}
          checkboxes={checkboxes}
        />
      )}
    </VStack>
  );
};

export default NationalHouseOptions;
