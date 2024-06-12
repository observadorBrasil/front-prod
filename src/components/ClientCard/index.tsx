import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  StackProps,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ClientInterface } from "@observatorio-brasil/atores/src/api/services/clients/interfaces/client.interface";
import Link from "../Link";
import { Card, CardBody, CardFooter, Image } from "@chakra-ui/react";
import { useState } from "react";
import { deleteClient } from "@observatorio-brasil/atores/src/api/services/clients";
import { ConfirmModal } from "../Modal/ConfirmModal";
import { useRouter } from "next/router";

interface ClientCardProps {
  client: ClientInterface;
  refresh: () => Promise<void>;
}

const ClientCard = ({ client, refresh }: ClientCardProps & StackProps) => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteClient(client.id);
      if (res.data) {
        refresh();
        onClose();
        toast({
          status: "success",
          description: "Cliente excluída com sucesso!",
        });
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`clientes/${client.id}/editar`);
  };

  return (
    <>
      <Card maxW="sm" align="center" justify="center">
        <Link href={`/clientes/${client?.id}/pastas`}>
          <CardBody>
            <Image
              src={client?.logoUrl}
              alt={`Logo cliente ${client?.id}`}
              borderRadius="lg"
              objectFit={"contain"}
              minH={"200px"}
              maxH={"200px"}
            />
            <Stack mt="6" spacing="3" justify="center">
              <Heading size="sm" textAlign={"center"}>
                {client?.name}
              </Heading>
            </Stack>
          </CardBody>
        </Link>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="ghost"
              colorScheme="blue"
              _hover={{ bg: "red", color: "white" }}
              onClick={onOpen}
              isLoading={loading}
            >
              Excluir
            </Button>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleEdit}
              isLoading={loading}
            >
              Editar
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Excluir cliente"}
        message={"Deseja realmente continuar?"}
        action={handleDelete}
      />
    </>
  );
};

export default ClientCard;
