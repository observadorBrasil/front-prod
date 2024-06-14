import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnDef } from "@tanstack/react-table";
import { UserInterface } from "../../../../src/api/services/user/interfaces/user.interface";
import { Loading } from "../../../../src/components/Loading";
import { store } from "../../../../src/store";
import { useAppSelector } from "../../../../src/store/hooks";
import {
  selectUser,
  UserActions,
} from "../../../../src/store/slices/user";

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
