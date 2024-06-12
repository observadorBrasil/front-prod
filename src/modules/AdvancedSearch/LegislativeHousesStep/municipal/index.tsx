import { VStack } from "@chakra-ui/react";
import { Control, UseFormReturn } from "react-hook-form";
import { LegislativeHousesStepInput } from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import { HouseInterface } from "@observatorio-brasil/atores/src/api/services/houses/interfaces/house.interface";
import CheckboxGroup from "@observatorio-brasil/atores/src/components/RHF/CheckboxGroup";

interface Props {
  formProps: UseFormReturn<LegislativeHousesStepInput, any>;
  houses: HouseInterface[];
}

const MunicipalHouseOptions = (props: Props) => {
  const { formProps, houses } = props;

  const checkboxes = houses
    .filter((h) => h.houseType.description === "Municipal")
    .map((h) => ({
      name: `municipal.house-${h.id}`,
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

export default MunicipalHouseOptions;
