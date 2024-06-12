import { Box, Text, VStack } from "@chakra-ui/react";
import { Step } from "./interfaces";

interface Props {
  step: Step;
  isBeforeCurrentStep: boolean;
}

const SingleStep = (props: Props) => {
  const { step, isBeforeCurrentStep } = props;

  return (
    <VStack
      zIndex={2}
      align={"center"}
      flex={1}
      justifyContent={"space-between"}
    >
      <Box
        width={"20px"}
        height={"20px"}
        borderRadius={"50%"}
        backgroundColor={isBeforeCurrentStep ? "primary" : "white"}
        borderColor={"primary"}
        borderWidth={"1px"}
      />
      <Text>{step.label}</Text>
    </VStack>
  );
};

export default SingleStep;
