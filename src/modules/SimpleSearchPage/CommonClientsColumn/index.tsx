import { PlusCircleOutlined } from "@ant-design/icons";
import { HStack, Text } from "@chakra-ui/react";
import { Client } from "@prisma/client";
import SavedClientBubble from "../../../components/Bubble";
import theme from "../../../theme";

interface Props {
  onAdd: () => null;
  clients: Partial<Client>[];
}

const CommonClientsColumn = (props: Props) => {
  const { onAdd, clients } = props;

  return (
    <HStack w={"full"} align={"center"} justify={"flex-start"}>
      {clients.map((y) => (
        <SavedClientBubble key={`common_client_${y.id}`}>
          <Text color={"secondary"}>{y.name}</Text>
        </SavedClientBubble>
      ))}
      <PlusCircleOutlined
        onClick={onAdd}
        style={{
          borderColor: theme.colors.primary,
          fontSize: 20,
        }}
      />
    </HStack>
  );
};

export default CommonClientsColumn;
