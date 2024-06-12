import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { HStack, StackProps, Text } from "@chakra-ui/react";
import theme from "../../../theme";

interface Props {
  name?: string;
  url: string;
  containerProps?: StackProps;
}

const SingleFileBubble = (props: Props) => {
  const { name, containerProps, url } = props;
  return (
    <HStack
      border={"1px solid"}
      borderColor={"primary"}
      borderRadius={20}
      pl={4}
      pr={4}
      pt={1}
      pb={1}
      {...containerProps}
    >
      <Text
        fontWeight={"semibold"}
        onClick={() => window.open(url, "_blank", "noreffer")}
        cursor={"pointer"}
        _hover={{
          textDecoration: "undeline",
        }}
      >
        {name}
      </Text>
      <CloseOutlined
        style={{ borderColor: theme.colors.primary, fontSize: 20 }}
      />
    </HStack>
  );
};

export default SingleFileBubble;
