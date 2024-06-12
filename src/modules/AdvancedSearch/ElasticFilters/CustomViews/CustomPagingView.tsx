import { PagingInfoViewProps } from "@elastic/react-search-ui-views";
import React from "react";

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
