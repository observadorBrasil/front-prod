import React, { useEffect, useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { HStack, Checkbox, CheckboxGroup, Text, VStack, Button } from "@chakra-ui/react";
import { HouseInterface } from "../../../../../src/api/services/houses/interfaces/house.interface";
import Bubble from "../../../../../src/components/Bubble";
import {
  HouseOption,
  LegislativeHousesStepInput,
} from "../../../../../src/store/slices/forms/advancedSearchForm";
import theme from "../../../../../src/theme";
import { UseFormReturn } from "react-hook-form";

interface StateHouseOptionsProps {
  formProps: UseFormReturn<LegislativeHousesStepInput, any>;
  houses: HouseInterface[];
}

const StateHouseOptions = ({ formProps, houses }: StateHouseOptionsProps) => {
  const { register, watch, setValue } = formProps;

  const initialOptions = watch("state.houses");
  const [selectedOptions, setSelectedOptions] = useState<HouseOption[]>(
    initialOptions || []
  );

  const options: HouseOption[] = houses
    .filter((h) => h.houseType.description === "Estadual")
    .map((h) => ({
      id: h.id,
      value: h.description,
      label: h.description,
    }));

  useEffect(() => {
    setValue("state.houses", selectedOptions);
    const houseIds = selectedOptions.map((o) => o.id);
    setValue("state.houseIds", houseIds);
  }, [selectedOptions, setValue]);

  const handleCheckboxChange = (checkedValues: any[]) => {
    const newSelectedOptions = options.filter((o) =>
      checkedValues.includes(o.value)
    );
    setSelectedOptions(newSelectedOptions);
  };

  const selectAll = () => {
    setSelectedOptions(options);
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  const removeKeyword = (id: number) => {
    const newSelectedOptions = selectedOptions.filter((o) => o.id !== id);
    setSelectedOptions(newSelectedOptions);
  };
  
  return (
    <VStack w={"full"} align={"flex-start"} justify={"space-between"} px={"5%"}>
      <HStack
        minWidth={"150px"}
        w={{ base: "100%", md: "40%" }}
        align={"center"}
      >
        <Text color={"black"}>Estado</Text>
      </HStack>
      <HStack>
        <Button onClick={selectAll}>Selecionar Todos</Button>
        <Button onClick={clearSelection}>Limpar Seleção</Button>
      </HStack>
      <CheckboxGroup
        value={selectedOptions.map((o) => o.value)}
        onChange={handleCheckboxChange}
      >
        {options.map((o) => (
          <Checkbox key={o.id} value={o.value}>
            {o.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
      {selectedOptions.length > 0 && (
        <HStack
          w="100%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          flexDirection={"row"}
          gap={4}
          flexWrap={"wrap"}
        >
          {selectedOptions.map((o, idx) => (
            <Bubble
              backgroundColor={"secondary"}
              borderColor={"primary"}
              border={"1px solid"}
              key={`keyword_${idx}`}
              gap={4}
              minW={"100px"}
            >
              <Text color={"black"}>{o.value}</Text>
              <CloseOutlined onClick={() => removeKeyword(o.id)} size={8} />
            </Bubble>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default StateHouseOptions;
