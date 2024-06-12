import React from "react";
import ContentBox from "../../../components/ContentBox";
import SingleMinedAttachment from "./SingleMinedAttachement";

interface Props {
  proposition: { minedAttachements: { name: string; url: string }[] };
}

const SinglePropositionMinedAttachements = (props: Props) => {
  const { proposition } = props;
  return (
    <ContentBox title={"Anexos minerados"}>
      {proposition.minedAttachements.map((ma) => (
        <SingleMinedAttachment
          key={`mined_attachment_${ma.name}`}
          attachment={ma}
        />
      ))}
    </ContentBox>
  );
};

export default SinglePropositionMinedAttachements;
