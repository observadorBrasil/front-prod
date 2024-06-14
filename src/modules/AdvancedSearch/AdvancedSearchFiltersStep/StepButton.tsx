import React from "react";
import { Button, Text } from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  FormActions,
  selectAdvancedSearchForm,
} from "../../../../src/store/slices/forms/advancedSearchForm";

interface StepButtonProps {
  handleSubmit?: any;
  buttonText?: string;
  shouldIncrement?: boolean;
}

export const StepButton = ({
  handleSubmit,
  buttonText = "Avançar",
  shouldIncrement = true,
}: StepButtonProps) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectAdvancedSearchForm);

  const incrementStep = async () =>
    dispatch(FormActions.setStep(formState.step + 1));

  const handleClick = async () => {
    try {
      if (handleSubmit) await handleSubmit();
      if (shouldIncrement) await incrementStep();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      type="submit"
      onClick={handleClick}
      backgroundColor={"primary"}
      w={{ base: "100%", md: "20%" }}
    >
      <Text fontSize={"md"} fontWeight={"light"} color={"secondary"}>
        {buttonText}
      </Text>
    </Button>
  );
};
