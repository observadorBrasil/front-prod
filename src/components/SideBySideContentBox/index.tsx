import { HStack, Stack, StackProps, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  sideChildren: ReactNode | ReactNode[];
  sideChildrenContainerProps?: StackProps;
  mainChildrenContainerProps?: StackProps;
  children: ReactNode | ReactNode[];
  containerProps?: StackProps;
}

const SideBySideContentBox = (props: Props) => {
  return (
    <Stack
      w={"full"}
      boxShadow={"0px 0px 8px rgba(0, 0, 0, 0.25)"}
      borderRadius={10}
      p={4}
      align={"flex-start"}
      direction={"row"}
      {...props.containerProps}
    >
      <VStack
        justify={"space-between"}
        align={"flex-start"}
        w={"20%"}
        p={4}
        {...props.sideChildrenContainerProps}
      >
        {props.sideChildren}
      </VStack>
      <VStack
        p={4}
        pl={16}
        w={"full"}
        justify={"flex-start"}
        align={"flex-start"}
        borderLeft={"1px solid"}
        borderColor={"primary"}
        {...props.mainChildrenContainerProps}
      >
        {props.children}
      </VStack>
    </Stack>
  );
};

export default SideBySideContentBox;
