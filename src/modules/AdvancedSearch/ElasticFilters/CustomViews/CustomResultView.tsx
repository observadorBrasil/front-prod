import React from "react";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import columns from "../DataTable/columns";
import { SearchThemisIndex } from "../types";
import { Center, CircularProgress } from "@chakra-ui/react";

interface CustomResultViewProps {
  results: SearchThemisIndex[];
  isLoading?: boolean;
}

export const CustomResultView = ({
  results,
  isLoading,
}: CustomResultViewProps) => {
  if (isLoading)
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  return (
    <DataTable
      size="sm"
      data={results}
      columns={columns}
      pageSize={results.length}
      noDataPlaceholder={"Sem resultados relevantes"}
    />
  );
};
