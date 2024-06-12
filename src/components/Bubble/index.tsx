import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const Bubble = (props: Props & FlexProps) => {
  const { children } = props;
  return (
    <Flex
      flexDirection={"row"}
      justify={"center"}
      align={"center"}
      backgroundColor={"primary"}
      borderRadius={20}
      h={"100%"}
      pl={4}
      pr={4}
      style={{ marginInlineStart: 0 }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Bubble;
