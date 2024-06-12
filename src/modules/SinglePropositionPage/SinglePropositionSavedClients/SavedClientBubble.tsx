import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  children: ReactNode | ReactNode[];
}

const SavedClientBubble = (props: Props) => {
  const { children } = props;
  return (
    <Flex
      justify={"center"}
      align={"center"}
      backgroundColor={"primary"}
      borderRadius={20}
      h={"100%"}
      pl={4}
      pr={4}
    >
      {children}
    </Flex>
  );
};

export default SavedClientBubble;
