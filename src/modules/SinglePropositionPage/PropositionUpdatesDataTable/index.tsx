import { Flex } from "@chakra-ui/react";
import DataTable from "../../../components/DataTable/DataTable";

interface Props {
  data: any;
}

const PropositionUpdatesDataTable = (props: Props) => {
  const { data } = props;
  const columns = [
    { header: "Situação", accessorKey: "status" },
    { header: "Situação", accessorKey: "author" },
    { header: "Adicionado em", accessorKey: "addedAt" },
    { header: "Apresentado em", accessorKey: "presentedAt" },
    { header: "Última Atualização", accessorKey: "lastUpdatedAt" },
  ];

  return (
    <Flex
      w={"full"}
      align={"center"}
      justify={"flex-start"}
      pt={"2%"}
      pb={"4%"}
      direction={"row"}
    >
      <DataTable columns={columns} data={data} />
    </Flex>
  );
};

export default PropositionUpdatesDataTable;
