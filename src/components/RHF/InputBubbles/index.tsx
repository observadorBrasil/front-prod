import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { HStack, Text } from "@chakra-ui/react";
import Bubble from "../../Bubble";

interface InputBubblesProps {
  values: { id: number; label: string }[];
  removeBubble: (id: number, label: string) => void;
}

function InputBubbles({ values = [], removeBubble }: InputBubblesProps) {
  return (
    <HStack
      w="100%"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      flexDirection={"row"}
      gap={4}
      flexWrap={"wrap"}
    >
      {values.map(({ id, label }) => (
        <Bubble
          backgroundColor={"secondary"}
          borderColor={"primary"}
          border={"1px solid"}
          key={`${id}_${label}`}
          gap={4}
          minW={"100px"}
        >
          <Text color={"black"}>{label}</Text>
          <CloseOutlined onClick={() => removeBubble(id, label)} size={8} />
        </Bubble>
      ))}
    </HStack>
  );
}

export default InputBubbles;
