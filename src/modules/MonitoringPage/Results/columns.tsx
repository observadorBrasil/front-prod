import React from "react";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Tooltip } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../../src/utils/date";
import { SearchResultInterface } from "../../../../src/api/services/search-result/interfaces/search-result.interface";
import { Loading } from "../../../../src/components/Loading";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  SearchResultActions,
  selectSearchResult,
} from "../../../../src/store/slices/search-result";
import Link from "next/link";

const searchStatusColors = {
  Pendente: { color: "purple" },
  Visualizado: { color: "green" },
  Ignorado: { color: "red" },
};

type SearchStatusKeys = keyof typeof searchStatusColors;

export const useSearchResultsColumns = () => {
  const dispatch = useAppDispatch();
  const { loading, currentUpdatingSearchResultId } =
    useAppSelector(selectSearchResult);

  const columns: ColumnDef<SearchResultInterface>[] = [
    {
      header: "Status",
      cell: (v) => {
        const {
          searchResultStatus: { description },
        } = v.row.original;
        const value = description as SearchStatusKeys;
        return (
          <Badge colorScheme={searchStatusColors[value].color}>
            {description}
          </Badge>
        );
      },
    },
    {
      header: "Tipo",
      accessorFn: (row) => row.proposition.propositionType.description,
    },
    {
      header: "Número",
      accessorFn: (row) => row.proposition.number,
    },
    {
      header: "Ano",
      accessorFn: (row) => row.proposition.year,
    },
    {
      header: "Casa",
      accessorFn: (row) => row.proposition.house.description,
    },
    {
      header: "Autoria",
      accessorFn: (row) => row.proposition.author,
    },
    {
      header: "Ementa",
      cell: (p) => {
        const {
          proposition: { ementa },
        } = p.row.original;
        if (ementa) {
          const raw = ementa.toString();

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
      header: "Data de apresentação",
      accessorFn: (row) => formatDate(row.proposition.presentationDate.toString()),
    },
    {
      header: "Visualizar",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (v) => {
        const {
          id,
          proposition,
          searchResultStatus: { description },
        } = v.row.original;

        const handleClick = () => {
          if (description === "Visualizado") return;
          dispatch(
            SearchResultActions.requestUpdateSearchResult({
              status: "read",
              id,
            })
          );
        };

        return currentUpdatingSearchResultId === id ? (
          <div style={{ textAlign: "center" }}>
            <Loading />
          </div>
        ) : (
          <Link href={`/proposicoes/${proposition?.id}`}>
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <LinkOutlined style={{ fontSize: 22 }} onClick={handleClick} />
            </div>
          </Link>
        );
      },
    },
    {
      header: "Ignorar",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (v) => {
        const { id } = v.row.original;
        return currentUpdatingSearchResultId === id ? (
          <div style={{ textAlign: "center" }}>
            <Loading />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <DeleteOutlined
              style={{ fontSize: 22 }}
              onClick={() =>
                dispatch(
                  SearchResultActions.requestUpdateSearchResult({
                    status: "ignored",
                    id,
                  })
                )
              }
            />
          </div>
        );
      },
    },
  ];

  return columns;
};
