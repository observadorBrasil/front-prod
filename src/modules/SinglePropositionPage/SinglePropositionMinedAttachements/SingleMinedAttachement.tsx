import { CaretDownOutlined, LinkOutlined } from "@ant-design/icons";
import { HStack, Text } from "@chakra-ui/react";
import Link from "../../../components/Link";
import theme from "../../../theme";

interface Props {
  attachment: { name: string; url: string };
}

const SingleMinedAttachment = (props: Props) => {
  const { attachment } = props;
  return (
    <HStack
      border={"1px solid"}
      borderRadius={10}
      pt={1}
      pb={1}
      pl={2}
      pr={2}
      align={"center"}
      justify={"space-between"}
      w={"full"}
      mt={4}
    >
      <HStack align={"center"} justify={"flex-start"} w={"75%"}>
        <Text fontWeight={"semibold"}>Assunto:</Text>
        <Text>{attachment.name}</Text>
      </HStack>
      <HStack flex={1} align={"center"} justify={"flex-start"}>
        <Text fontWeight={"semibold"}>Editar</Text>
        <CaretDownOutlined
          style={{ fontSize: 20, borderColor: theme.colors.primary }}
        />
      </HStack>
      <HStack flex={1} align={"center"} justify={"flex-start"}>
        <Link
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          flex={1}
          href={attachment.url}
        >
          <Text fontWeight={"semibold"}>Visualizar</Text>
          <LinkOutlined
            style={{
              fontSize: 20,
              borderColor: theme.colors.primary,
              marginLeft: 8,
            }}
          />
        </Link>
      </HStack>
    </HStack>
  );
};

export default SingleMinedAttachment;
