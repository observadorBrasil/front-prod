import { DeleteOutlined } from "@ant-design/icons";
import { ColumnDef } from "@tanstack/react-table";
import { UserInterface } from "@observatorio-brasil/atores/src/api/services/user/interfaces/user.interface";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";
import { store } from "@observatorio-brasil/atores/src/store";
import { useAppSelector } from "@observatorio-brasil/atores/src/store/hooks";
import {
  selectUser,
  UserActions,
} from "@observatorio-brasil/atores/src/store/slices/user";

const columns: ColumnDef<UserInterface, unknown>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Excluir",
    cell: (p) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const userState = useAppSelector(selectUser);
      const userId = p.row.original.id;
      return userState.currentDeletingUserId === userId && userState.loading ? (
        <Loading />
      ) : (
        <DeleteOutlined
          onClick={() =>
            store.dispatch(
              UserActions.requestUserDelete({ userId: p.row.original.id })
            )
          }
          style={{ fontSize: 22 }}
        />
      );
    },
  },
];

export default columns;
