import React from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Table as ReactTable } from "@tanstack/react-table";

interface PaginationProps {
  table: ReactTable<any>;
  color?: string;
}
export function Pagination({ table, color }: PaginationProps) {
  const pagination = table.getState().pagination;
  const { pageSize, pageIndex } = pagination;

  const firstRowNumber = 1 + pageIndex * pageSize;
  const lastRowNumber = (pageIndex + 1) * pageSize;
  const dataSize = table.getCoreRowModel().rows.length;

  return (
    <Flex p={1} justifyContent="space-between">
      <Box>
        <Button
          variant="ghost"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          colorScheme={color}
        >
          {"<<"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          colorScheme={color}
        >
          {"<"}
        </Button>
      </Box>
      <Center>
        <Text fontSize={14} fontWeight="black">
          {`${firstRowNumber} - ${
            lastRowNumber > dataSize ? dataSize : lastRowNumber
          } de ${dataSize}`}
        </Text>
      </Center>

      <Box>
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          colorScheme={color}
        >
          {">"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          colorScheme={color}
        >
          {">>"}
        </Button>
      </Box>
    </Flex>
  );
}
