import { HStack, Stack } from "@chakra-ui/react";
import Form from "../../../components/RHF/Form";
import { useForm } from "react-hook-form";
import EditableTextArea from "../../../components/RHF/EditableTextArea";
import ContentBox from "../../../components/ContentBox";
import Button from "../../../components/Button";
import { PropositionInterface } from "../../../api/services/propositions/interfaces/proposition.interface";
import { useEffect } from "react";

interface Props {
  proposition: PropositionInterface;
}

const SinglePropositionDetailsSection = (props: Props) => {
  const { proposition } = props;

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      "proceeding-step": proposition.situation.description,
      propositionText: proposition.proposition || "",
    },
  });

  useEffect(() => {
    setValue("propositionText", proposition.proposition);
    setValue("proceeding-step", proposition.situation.description);
  }, [proposition, setValue]);

  return (
    <ContentBox title={"Detalhes"} collapsable>
      <Form onSubmit={handleSubmit((v) => console.log(v))}>
        <Stack
          w={"full"}
          align={"flex-start"}
          justify={"space-between"}
          mt={6}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: "none" }}
        >
          <EditableTextArea
            label={"Situação atual"}
            w={{ base: "100%", md: "45%" }}
            initialValue={proposition.situation.description}
            id={"proceeding-step"}
            rhfregister={register("proceeding-step", {})}
          />
          <EditableTextArea
            label={"Texto"}
            w={{ base: "100%", md: "45%" }}
            id={"propositionText"}
            initialValue={proposition.proposition}
            rhfregister={register("propositionText", {})}
          />
        </Stack>
        <HStack w={"100%"} justify={"flex-end"} align={"center"} pt={8}>
          <Button
            w={{ base: "100%", md: "auto" }}
            variant="primary"
            type={"submit"}
            fontSize={"lg"}
          >
            Salvar
          </Button>
        </HStack>
      </Form>
    </ContentBox>
  );
};

export default SinglePropositionDetailsSection;
