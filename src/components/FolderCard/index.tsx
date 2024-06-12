import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import {
  Box,
  Button,
  HStack,
  ListItem,
  StackProps,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Folder } from "@prisma/client";
import { deleteFolder } from "@observatorio-brasil/atores/src/api/services/folders";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "../Link";
import { ConfirmModal } from "../Modal/ConfirmModal";

interface FolderCard {
  clientId: string;
  folder: Folder;
  refresh: () => Promise<void>;
}

const FolderCard = ({
  clientId,
  folder,
  refresh,
  ...props
}: FolderCard & StackProps) => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteFolder(folder.id);
      if (res.data) {
        refresh();
        toast({
          status: "success",
          description: "Pasta excluída com sucesso!",
        });
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/clientes/${folder.clientId}/pastas/${folder.id}/editar`);
  };

  return (
    <ListItem w={"100%"}>
      <Box
        boxShadow={"0px 0px 5px 2px rgba(0, 0, 0, 0.25)"}
        rounded={"md"}
        px={4}
        py={4}
      >
        <HStack w="full" align="center" spacing={2}>
          <Link
            href={`/clientes/${clientId}/pastas/${folder.id}/proposicoes`}
            w="full"
          >
            <HStack gap={6} w="full">
              <FolderOpenOutlined
                style={{
                  color: "black",
                  fontSize: "24px",
                }}
              />
              <VStack align={"flex-start"}>
                <Text as="b" fontSize="md">
                  {folder?.name}
                </Text>
                <Text fontSize="md">{folder?.description}</Text>
              </VStack>
            </HStack>
          </Link>

          <Button
            variant="ghost"
            _hover={{ bg: "red", color: "white" }}
            colorScheme="blue"
            onClick={onOpen}
            isLoading={loading}
          >
            <DeleteOutlined />
          </Button>
          <Button
            _hover={{ bg: "blue.200" }}
            colorScheme="blue"
            onClick={handleEdit}
            isLoading={loading}
          >
            <EditOutlined />
          </Button>
        </HStack>
      </Box>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Excluir pasta"}
        message={"Deseja realmente continuar?"}
        action={handleDelete}
      />
    </ListItem>
  );
};

export default FolderCard;
