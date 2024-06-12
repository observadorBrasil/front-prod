import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  FormActions,
  ScheduledFilter,
  selectAdvancedSearchForm,
} from "@observatorio-brasil/atores/src/store/slices/forms/advancedSearchForm";
import { useForm } from "react-hook-form";
import { StepButton } from "../AdvancedSearchFiltersStep/StepButton";

const NewFilterStep = () => {
  const dispatch = useAppDispatch();
  const { scheduledFilter } = useAppSelector(selectAdvancedSearchForm);

  const formProps = useForm<ScheduledFilter>({
    values: scheduledFilter,
  });
  const { handleSubmit, register } = formProps;

  const onSubmit = (data: ScheduledFilter) => {
    dispatch(FormActions.setScheduledFilter(data));
  };

  return (
    <VStack
      w={"full"}
      align={"flex-start"}
      justifyContent={"space-between"}
      borderRadius={"10px"}
      boxShadow={"0px 0px 7px rgba(0, 0, 0, 0.25)"}
      px={"4%"}
    >
      <Text fontWeight={"semibold"} pt={"4%"}>
        Use essas informações para identificação posterior do filtro monitorado
      </Text>
      <TextInput
        id={"name"}
        label={"Nome"}
        type={"text"}
        rhfregister={register("name")}
        containerProps={{
          width: { base: "100%", md: "50%" },
        }}
      />
      <TextInput
        id={"description"}
        label={"Descrição"}
        type={"text"}
        rhfregister={register("description")}
        containerProps={{
          width: { base: "100%", md: "100%" },
        }}
      />
      <HStack py={"2%"} justifyContent={"flex-end"} w={"full"}>
        <StepButton handleSubmit={handleSubmit(onSubmit)} />
      </HStack>
    </VStack>
  );
};

export default NewFilterStep;
