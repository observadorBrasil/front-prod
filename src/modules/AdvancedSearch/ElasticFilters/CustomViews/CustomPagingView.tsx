import React from "react";
import { PagingInfoViewProps } from "@elastic/react-search-ui-views";

export const CustomPagingView = ({
  start,
  end,
  totalResults,
  searchTerm,
}: PagingInfoViewProps) => {
  return (
    <div className="paging-info">
      {`Mostrando ${start} - ${end} de ${totalResults}`}
    </div>
  );
};
