import { Divider } from "@chakra-ui/react";
import React from "react";
import { TramitacaoInterface } from "../../../api/services/tramitacao/interfaces/tramitacao.interface";
import ContentBox from "../../../components/ContentBox";
import SingleProceeding from "./SingleProceeding";

interface SinglePropositionProceedingsHistoryProps {
  proceedings: TramitacaoInterface[];
}

const SinglePropositionProceedingsHistory = ({
  proceedings,
}: SinglePropositionProceedingsHistoryProps) => {
  const sortedProceedings = [...proceedings].sort(
    (a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  );
  return (
    <ContentBox title="Historico de tramitação" collapsable>
      {sortedProceedings.map((p, idx) => (
        <React.Fragment key={`singleproceeding_${p.id}`}>
          <SingleProceeding proceeding={p} />
          {idx !== proceedings.length - 1 && proceedings.length > 1 && (
            <Divider pt={4} borderColor={"primary"} />
          )}
        </React.Fragment>
      ))}
    </ContentBox>
  );
};

export default SinglePropositionProceedingsHistory;
