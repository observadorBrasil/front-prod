import { useCallback, useEffect, useState } from "react";
import { HStack, Text, VStack, Box, Select } from "@chakra-ui/react";
import ElasticFilters from "@observatorio-brasil/atores/src/modules/AdvancedSearch/ElasticFilters";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  FormActions,
  selectSimpleSearchForm,
} from "@observatorio-brasil/atores/src/store/slices/forms/simpleSearchForm";
import { useElasticSimpleConfig } from "@observatorio-brasil/atores/src/modules/AdvancedSearch/ElasticFilters/config/simple";
import { getHouses } from "@observatorio-brasil/atores/src/api/services/houses";
import {
  selectHouse,
  HouseActions,
} from "@observatorio-brasil/atores/src/store/slices/proposition/house";
import InputBubbles from "@observatorio-brasil/atores/src/components/RHF/InputBubbles";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import { useForm, useWatch } from "react-hook-form";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import { useDebounce } from "@observatorio-brasil/atores/src/hooks/useDebounce";

interface DebounceFilterProps {
  control: any;
}

function DebounceFilter({ control }: DebounceFilterProps) {
  const dispatch = useAppDispatch();

  const year = useWatch({
    control,
    name: "year",
  });

  const number = useWatch({
    control,
    name: "number",
  });

  const debouncedYear = useDebounce(year, 500);
  const debouncedNumber = useDebounce(number, 500);

  useEffect(() => {
    dispatch(FormActions.updateYear(debouncedYear));
  }, [debouncedYear, dispatch]);

  useEffect(() => {
    dispatch(FormActions.updateNumber(debouncedNumber));
  }, [debouncedNumber, dispatch]);

  return <></>;
}

interface SimplePageFormInput {
  number: string;
  year: number;
  house: string;
}

export default function SimpleSearchPage() {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectSimpleSearchForm);
  const { houses } = useAppSelector(selectHouse);

  const config = useElasticSimpleConfig(formState);

  const { houseIds } = formState.data;

  const { register, setValue, control } = useForm<SimplePageFormInput>();

  const houseValues = houses
    .filter((h) => houseIds.includes(h.id))
    .map((h) => ({ id: h.id, label: h.description }));

  const fetchHouses = useCallback(async () => {
    const results = await getHouses();
    if (results.data) {
      dispatch(HouseActions.setHouses(results.data));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchHouses();
    dispatch(FormActions.reset());
  }, [dispatch, fetchHouses]);

  const handleAddHouse = (id: number) => {
    const ids = [...houseIds, id];
    dispatch(FormActions.updateHouseIds(ids));
  };

  const handleRemoveHouse = (id: number, _: string) => {
    const ids = houseIds.filter((sid) => sid != id);
    dispatch(FormActions.updateHouseIds(ids));
  };

  return (
    <PageWrapper restricted>
      <HStack w={"full"} justify={"flex-start"} pb={6}>
        <Text fontWeight={"semibold"} fontSize={"2xl"}>
          Busca Simples
        </Text>
      </HStack>

      <Box w={"full"} rounded={"md"} px={8} py={8}>
        <VStack w={"full"} align={"flex-start"} gap={2}>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Filtrar por
          </Text>
          <HStack w={"full"} gap={12}>
            <TextInput
              id={"number"}
              label={"Número"}
              type={"text"}
              rhfregister={register("number")}
            />

            <TextInput
              id={"year"}
              label={"Ano"}
              type={"number"}
              rhfregister={register("year")}
            />

            <TextInput
              id={"house"}
              placeholder={"Selecione casas..."}
              label={"Casa"}
              type={"text"}
              rhfregister={register("house")}
              suggestions={{
                options: () =>
                  (houses || [])
                    .map((p) => p.description)
                    .sort((a, b) => a.localeCompare(b)),
                onOptionClick: (v) => {
                  setValue("house", "");
                  const house = houses.find((s) => s.description === v);
                  if (house) handleAddHouse(house.id);
                },
              }}
            />
            <InputBubbles
              values={houseValues}
              removeBubble={handleRemoveHouse}
            />
            <Select
              placeholder="Ordenar por"
              variant="flushed"
              w="450px"
              onChange={(e) => {
                dispatch(FormActions.updateSort(e.target.value));
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
        </VStack>
      </Box>
      <DebounceFilter control={control} />
      <ElasticFilters config={config} />
    </PageWrapper>
  );
}
