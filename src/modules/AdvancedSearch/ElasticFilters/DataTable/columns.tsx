import React from "react";
import { Tooltip } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { SearchThemisIndex } from "../types";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import { formatDate } from "../../../../../src/utils/date";

const columns: ColumnDef<SearchThemisIndex>[] = [
  {
    header: "Visualizar",
    cell: (v) => {
      const { original } = v.row;

      return (
        <Link href={`/proposicoes/${original.id.raw}`}>
          <LinkOutlined style={{ fontSize: 22, width: "65%" }} />
        </Link>
      );
    },
  },
  {
    header: "Score",
    accessorFn: (row) => row?._meta?.rawHit._score.toFixed(2),
  },
  {
    header: "Tipo de Proposição",
    cell: (p) => {
      const { original } = p.row;
      if (original.propositiontype.raw) {
        const raw = original.propositiontype.raw.toString();
        if (raw.length > 20) {
          const txt = `${raw.substring(0, 19)}...`;
          return <Tooltip label={raw}>{txt}</Tooltip>;
        } else {
          return <p>{raw}</p>;
        }
      }
      return null;
    },
  },
  {
    header: "Número",
    accessorFn: (row) => row?.number?.raw,
  },
  {
    header: "Ano",
    accessorFn: (row) => row?.year?.raw,
  },

  {
    header: "Casa Legislativa",
    cell: (p) => {
      const { original } = p.row;
      if (original.housedescription.raw) {
        const raw = original.housedescription.raw.toString();
        if (raw.length > 20) {
          const txt = `${raw.substring(0, 19)}...`;
          return <Tooltip label={raw}>{txt}</Tooltip>;
        } else {
          return <p>{raw}</p>;
        }
      }
      return null;
    },
  },

  {
    header: "Autoria",
    cell: (p) => {
      const { original } = p.row;
      if (original.author.raw) {
        const raw = original.author.raw.toString();
        if (raw.length > 20) {
          const txt = `${raw.substring(0, 19)}...`;
          return <Tooltip label={raw}>{txt}</Tooltip>;
        } else {
          return <p>{raw}</p>;
        }
      }
      return null;
    },
  },
  {
    header: "Ementa",
    cell: (p) => {
      const { original } = p.row;
      if (original.ementa.raw) {
        const raw = original.ementa.raw.toString();

        if (raw.length > 20) {
          const txt = `${raw.substring(0, 19)}...`;
          return <Tooltip label={raw}>{txt}</Tooltip>;
        } else {
          return <p>{raw}</p>;
        }
      }
      return null;
    },
  },
  // {
  //   header: "Significância",
  //   accessorFn: (row) => row?.significance?.raw,
  // },
  {
    header: "Data de Apresentação",
    accessorFn: (row) => formatDate(row?.presentationdate?.raw as string),
  },
  // {
  //   header: "Ementa",
  //   accessorFn: (row) => row?.ementa?.raw,
  // },
  // {
  //   header: "Criado em",
  //   accessorFn: (row) => row?.createdat?.raw,
  // },

  // {
  //   header: "Atualizado em",
  //   accessorFn: (row) => row?.updatedat?.raw,
  // },
];

export default columns;
