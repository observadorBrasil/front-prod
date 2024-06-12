import React from "react";
import { Divider, HStack, VStack } from "@chakra-ui/react";
import { Step } from "./interfaces";
import SingleStep from "./SingleStep";

interface Props {
  steps: Step[];
  currentStep: number;
}

const Stepper = (props: Props) => {
  const { steps, currentStep } = props;

  steps.sort((s1, s2) => s1.order - s2.order);
  const selectedStep = steps.find((s) => s.order === currentStep);
  const stepComponent = selectedStep?.component(selectedStep);
  return (
    <VStack w={"full"}>
      <HStack
        w={"full"}
        flex={1}
        align={"center"}
        justify={"space-between"}
        position={"relative"}
      >
        {steps.map((s) => (
          <SingleStep
            step={s}
            isBeforeCurrentStep={s.order <= currentStep}
            key={`${s.label}_${s.order}`}
          />
        ))}
        <Divider
          position={"absolute"}
          left={0}
          w={"full"}
          borderColor={"primary"}
          borderWidth={"1px"}
          opacity={1}
          zIndex={1}
          top={"16%"}
        />
      </HStack>
      <VStack
        pt={"2%"}
        pb={"2%"}
        w={"full"}
        align={"center"}
        justify={"flex-start"}
      >
        {stepComponent}
      </VStack>
    </VStack>
  );
};

export default Stepper;
