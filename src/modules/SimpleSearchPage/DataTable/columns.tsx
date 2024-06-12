import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PropositionInterface } from "@observatorio-brasil/atores/src/api/services/propositions/interfaces/proposition.interface";
import CommonClientsColumn from "../CommonClientsColumn";

const columns: ColumnDef<PropositionInterface>[] = [
  {
    header: "Tipo",
    accessorFn: (row) => row.propositionType.description,
  },
  { header: "Numero", accessorKey: "number" },
  { header: "Ano", accessorKey: "year" },
  {
    header: "Clientes",
    cell: (props) => {
      const { original } = props.row;
      const clients = original.folders.flatMap((x) => x.folder.client);
      return <CommonClientsColumn onAdd={() => null} clients={clients} />;
    },
  },
];

export default columns;
