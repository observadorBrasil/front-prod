import React from "react";
import { LinkOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "@prisma/client";
import { formatDate } from "@observatorio-brasil/atores/src/utils/date";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  SearchActions,
  selectSearch,
} from "@observatorio-brasil/atores/src/store/slices/search";
import Link from "next/link";

export const useSearchColumns = () => {
  const dispatch = useAppDispatch();
  const { loading, currentUpdatingSearchId } = useAppSelector(selectSearch);

  const columns: ColumnDef<Search>[] = [
    {
      header: "Filtro",
      accessorKey: "name",
    },
    {
      header: "Descrição",
      cell: (v) => {
        const { description } = v.row.original;

        return <div style={{ whiteSpace: "normal" }}>{description}</div>;
      },
    },
    {
      header: "Criado em",
      accessorFn: (row) => formatDate(row.createdAt.toString()),
    },
    {
      header: "Resultados",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (v) => {
        const { id } = v.row.original;

        return (
          <Link
            href={`/monitoramento/resultados/${id}`}
            style={{ textAlign: "center" }}
          >
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <LinkOutlined style={{ fontSize: 22 }} />
            </div>
          </Link>
        );
      },
    },
    {
      header: "Editar",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (v) => {
        const { id } = v.row.original;

        return (
          <Link
            href={`/monitoramento/${id}/editar`}
            style={{ textAlign: "center" }}
          >
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <EditOutlined style={{ fontSize: 22 }} />
            </div>
          </Link>
        );
      },
    },
    {
      header: "Excluir",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (v) => {
        const { id } = v.row.original;
        return currentUpdatingSearchId === id ? (
          <div style={{ textAlign: "center" }}>
            <Loading />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <DeleteOutlined
              style={{ fontSize: 22 }}
              onClick={() => dispatch(SearchActions.requestSearchDelete(id))}
            />
          </div>
        );
      },
    },
  ];
  return columns;
};
