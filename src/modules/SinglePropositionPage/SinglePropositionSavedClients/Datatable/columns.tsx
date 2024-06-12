import { CloseCircleOutlined } from "@ant-design/icons";
import { Switch } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { PropositionFolderInterface } from "../../../../api/services/proposition-folders/interfaces/proposition-folder.interface";

type onChangeClientVisibilityFn = (
  clientId: number,
  isChecked: boolean
) => void;

type onClientDeleteFn = (clientId: number) => void;

const columns = (
  onChangeFolderVisibility: onChangeClientVisibilityFn,
  onFolderDelete: onClientDeleteFn
): ColumnDef<PropositionFolderInterface>[] => [
  { header: "Cliente", accessorFn: (v) => v.folder.client.name },
  {
    header: "Visível",
    accessorFn: (v) => v.visible,
    cell: (v) => (
      <Switch
        isChecked={v.row.original.visible}
        onChange={(e) => {
          onChangeFolderVisibility(v.row.original.id, e.target.checked);
        }}
      />
    ),
  },
  {
    header: "Deletar",
    cell: (v) => (
      <CloseCircleOutlined
        style={{ fontSize: 20 }}
        onClick={() => onFolderDelete(v.row.original.id)}
      />
    ),
  },
];

export default columns;
