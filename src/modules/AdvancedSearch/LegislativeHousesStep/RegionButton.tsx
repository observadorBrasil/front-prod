import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  shouldHaveBorder?: boolean;
  isSelectedHouse: boolean;
  children: ReactNode | ReactNode[];
  onClick: () => void;
}

const RegionButton = (props: Props) => {
  return (
    <Button
      onClick={props.onClick}
      flex={1}
      backgroundColor={"transparent"}
      color={"secondary"}
      borderRightWidth={props.shouldHaveBorder ? "1px" : 0}
      borderColor={"secondary"}
      borderRadius={0}
      fontSize={"sm"}
      paddingInlineStart={0}
      paddingInlineEnd={0}
      height={"100%"}
      pt={"2px"}
      pb={"2px"}
      textDecoration={"underline"}
      textDecorationColor={props.isSelectedHouse ? "inherit" : "transparent"}
      cursor={"pointer"}
      _hover={{
        backgroundColor: "transparent",
        textDecorationColor: "inherit",
      }}
      _active={{
        backgroundColor: "transparent",
      }}
      transition={"text-decoration-color 0.2s ease-in"}
    >
      {props.children}
    </Button>
  );
};

export default RegionButton;
