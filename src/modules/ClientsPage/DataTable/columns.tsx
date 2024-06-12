import { ColumnDef } from "@tanstack/react-table";
import { CloseOutlined, LinkOutlined } from "@ant-design/icons";
import Link from "@observatorio-brasil/atores/src/components/Link";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import {
  PropositionFolderActions,
  selectPropositionFolder,
} from "@observatorio-brasil/atores/src/store/slices/proposition/proposition-folder";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import { FolderWithClientAndPropositions } from "@observatorio-brasil/atores/prisma/interfaces/folder";
import { formatDate } from "@observatorio-brasil/atores/src/utils/date";
import { Tooltip } from "@chakra-ui/react";

export const useClientPropositionsColumns = () => {
  const dispatch = useAppDispatch();
  const { loading, currentPropositionFolderId } = useAppSelector(
    selectPropositionFolder
  );

  const columns: ColumnDef<
    FolderWithClientAndPropositions["propositions"][0]
  >[] = [
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
      header: "Casa Legislativa",
      accessorFn: (row) => row.proposition.house.description,
    },
    {
      header: "Autoria",
      accessorFn: (row) => row.proposition.author,
    },
    {
      header: "Ementa",
      cell: (p) => {
        const { original } = p.row;
        const { ementa } = original.proposition;
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
      header: "Data de Apresentação",
      accessorFn: (row) =>
        formatDate(row.proposition.presentationDate.toString()),
    },
    {
      header: "Ver proposição",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (props) => {
        const { original } = props.row;
        return (
          <Link
            target={"_blank"}
            href={`/proposicoes/${original.proposition.id}`}
          >
            <div style={{ textAlign: "center" }}>
              <LinkOutlined style={{ fontSize: "24px" }} />
            </div>
          </Link>
        );
      },
    },
    {
      header: "Excluir da pasta",
      meta: {
        headerStyle: {
          textAlign: "center",
        },
      },
      cell: (props) => {
        const { id: propositionFolderId } = props.row.original;

        const handleClick = () => {
          if (loading) return null;
          dispatch(
            PropositionFolderActions.requestRemovePropositionFolderById({
              propositionFolderId,
            })
          );
        };

        return (
          <div
            onClick={handleClick}
            style={{
              textAlign: "center",
              marginRight: "auto",
              cursor: "pointer",
            }}
          >
            {currentPropositionFolderId === propositionFolderId && loading ? (
              <Loading />
            ) : (
              <CloseOutlined style={{ fontSize: "24px" }} />
            )}
          </div>
        );
      },
    },
  ];
  return columns;
};

export default useClientPropositionsColumns;
