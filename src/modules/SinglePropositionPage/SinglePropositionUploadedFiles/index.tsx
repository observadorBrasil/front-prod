import Form from "../../../components/RHF/Form";
import { useForm } from "react-hook-form";
import ContentBox from "../../../components/ContentBox";
import { useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import SingleFileBubble from "./SingleFileBubble";
import { PropositionFileInterface } from "../../../api/services/propositions/interfaces/proposition-file.interface";
import FileUploader from "@observatorio-brasil/atores/src/components/RHF/FileUploader";

interface Props {
  propositionFiles: PropositionFileInterface[];
}

const SinglePropositionUploadedFiles = (props: Props) => {
  const { propositionFiles } = props;
  const { handleSubmit, register, watch } = useForm();

  const files = watch("files") as FileList | undefined;
  useEffect(() => {
    // console.log("F: ", files);
  }, [files]);

  return (
    <ContentBox title={"Upload de Arquivo"}>
      <Form onSubmit={handleSubmit((v) => console.log(v))}>
        <FileUploader
          buttonLabel={"Adicionar"}
          rhfregister={register("files")}
          containerProps={{
            w: { base: "100%", md: "40%" },
            marginTop: 4,
          }}
          multiple
          fileWatch={files}
        />
      </Form>
      <HStack pt={12} w={"full"} align={"center"} justify={"flex-start"}>
        {propositionFiles.map((f) => {
          return f.files.map((file) => (
            <SingleFileBubble
              key={`file_${file.id}`}
              name={file.name}
              url={file.url}
            />
          ));
        })}
        {files &&
          Array.from({ length: files.length }, (_, idx) => idx).map((idx) => {
            const file = files.item(idx);
            return (
              <SingleFileBubble
                key={`uploadedFiles_${file?.name}`}
                name={file?.name}
                url={"/"}
              />
            );
          })}
      </HStack>
    </ContentBox>
  );
};

export default SinglePropositionUploadedFiles;
