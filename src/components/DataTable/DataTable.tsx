import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from "@chakra-ui/react";
import {
  ColumnDef,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Pagination } from "./Pagination";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data>[];
  color?: string;
  striped?: boolean;
  size?: "sm" | "md" | "lg";
  noShadow?: boolean;
  noDataPlaceholder?: string;
  m?: string;
  pagination?: boolean;
  pageSize?: number;
  globalFilter?: {
    filterFn: FilterFnOption<Data>;
    filterState: unknown;
  };
};

export default function DataTable<Data extends object>({
  data,
  columns,
  color,
  striped,
  size,
  noShadow,
  noDataPlaceholder = "Sem dados",
  m,
  pagination,
  pageSize,
  globalFilter,
}: DataTableProps<Data>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableFilters: globalFilter !== undefined,
    enableGlobalFilter: globalFilter !== undefined,
    globalFilterFn: globalFilter ? globalFilter.filterFn : undefined,
    state: {
      globalFilter: globalFilter ? globalFilter.filterState : undefined,
    },
  });

  useEffect(() => {
    if (pagination || pageSize) {
      table.setPageSize(pageSize ? pageSize : 10);
    }
  }, [pageSize, pagination, table]);

  return (
    <TableContainer
      style={{
        margin: m,
        borderRadius: "10px",
        boxShadow: noShadow
          ? "none"
          : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        width: "100%",
      }}
    >
      {data?.length === 0 && <Center h="100px">{noDataPlaceholder}</Center>}

      {data?.length > 0 && (
        <Table
          colorScheme={color ? color : "black"}
          variant={striped ? "striped" : "simple"}
          size={size ? size : "md"}
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    style={(header as any).column.columnDef?.meta?.headerStyle}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {pagination && <Pagination table={table} color={color} />}
    </TableContainer>
  );
}
