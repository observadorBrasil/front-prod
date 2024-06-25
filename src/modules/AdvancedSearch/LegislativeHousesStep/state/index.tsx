import React from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { HStack, Select, Text, VStack } from "@chakra-ui/react";
import { HouseInterface } from "../../../../../src/api/services/houses/interfaces/house.interface";
import Bubble from "../../../../../src/components/Bubble";
import {
  HouseOption,
  LegislativeHousesStepInput,
} from "../../../../../src/store/slices/forms/advancedSearchForm";
import theme from "../../../../../src/theme";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface StateHouseOptionsProps {
  formProps: UseFormReturn<LegislativeHousesStepInput, any>;
  houses: HouseInterface[];
}

const StateHouseOptions = ({ formProps, houses }: StateHouseOptionsProps) => {
  const { register, watch, setValue } = formProps;

  const currentTypedKeyword = watch("keyword");
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

  const addKeyword = () => {
    const option = options.find((o) => o.value === currentTypedKeyword);
    if (option === undefined) return;

    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    setValue("keyword", "");
  };

  const removeKeyword = (k: number) => {
    const kIdx = selectedOptions.findIndex((ck) => ck.id === k);
    if (kIdx >= 0) {
      const newKeywords = [...selectedOptions];
      newKeywords.splice(kIdx, 1);
      setSelectedOptions(newKeywords);
    }
  };

  return (
    <VStack w={"full"} align={"flex-start"} justify={"space-between"} px={"5%"}>
      <HStack
        minWidth={"150px"}
        w={{ base: "100%", md: "40%" }}
        align={"center"}
      >
        <Text color={"black"}>Estado</Text>
        <Select {...register("keyword")}>
          {options.map((o) => (
            <option key={o.id} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <PlusOutlined
          size={20}
          style={{
            cursor: "pointer",
            borderColor: theme.colors.primary,
            marginLeft: "4%",
          }}
          onClick={addKeyword}
        />
      </HStack>
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
