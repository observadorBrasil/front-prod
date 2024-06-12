import { HStack, Text } from "@chakra-ui/react";
import { NotaTecnica } from "@prisma/client";
import Button from "../../../components/Button";
import Form from "../../../components/RHF/Form";
import TextInput from "../../../components/RHF/TextInput";
import PrioritySelect from "../../../components/Select/PrioritySelect";
import { useForm } from "react-hook-form";
import TextAreaInput from "@observatorio-brasil/atores/src/components/RHF/TextAreaInput";
import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  selectTechnicalNote,
  TechnicalNoteActions,
} from "@observatorio-brasil/atores/src/store/slices/nota-tecnica";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";

interface Props {
  techincalNote: NotaTecnica;
}

export const SingleTechincalNote = (props: Props) => {
  const { techincalNote } = props;
  const dispatch = useAppDispatch();
  const technicalNoteState = useAppSelector(selectTechnicalNote);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      owner: techincalNote.owner,
      priority: techincalNote.priority,
      object: techincalNote.object,
      recipient: techincalNote.recipient,
      onusProbability: techincalNote.onusProbability,
      bonusProbability: techincalNote.bonusProbability,
    },
  });

  useEffect(() => {
    setValue("owner", techincalNote.owner);
    setValue("priority", techincalNote.priority);
    setValue("object", techincalNote.object);
    setValue("recipient", techincalNote.recipient);
    setValue("onusProbability", techincalNote.onusProbability);
    setValue("bonusProbability", techincalNote.bonusProbability);
  }, [techincalNote, setValue]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleFormSubmit = (v: any) => {
    if (
      !technicalNoteState.loading ||
      technicalNoteState.updatedTechnicalNoteId !== techincalNote.id
    ) {
      dispatch(
        TechnicalNoteActions.requestTechnicalNoteUpdate({
          technicalNoteId: techincalNote.id,
          data: { ...v },
        })
      );
    }
  };

  const handleTechnicalNoteRemoval = () => {
    if (
      !technicalNoteState.loading ||
      technicalNoteState.removingTechnicalNoteId !== techincalNote.id
    ) {
      dispatch(
        TechnicalNoteActions.requestTechnicalNoteRemoval({
          technicalNoteId: techincalNote.id,
        })
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "black",
        width: "100%",
        paddingBottom: "4%",
        paddingTop: "4%",
      }}
    >
      <Text>
        Data de emissão:{" "}
        {new Date(techincalNote.issueDate).toLocaleDateString("pt-BR")}
      </Text>
      <HStack w={"full"} align={"center"} justify={"flex-start"}>
        <Text>Responsável:</Text>
        <TextInput
          id={"owner"}
          type={"text"}
          rhfregister={register("owner")}
          containerProps={{ w: "full" }}
        />
      </HStack>
      <PrioritySelect
        label={"Prioridade:"}
        rhfregister={register("priority")}
      />

      <HStack
        cursor={"pointer"}
        onClick={() => setIsExpanded(!isExpanded)}
        marginTop={6}
      >
        <Text>Ver {isExpanded ? "menos" : "mais"}</Text>
        <DownOutlined
          style={{
            fontSize: 18,
            rotate: !isExpanded ? "0deg" : "180deg",
            marginLeft: 8,
          }}
        />
      </HStack>
      {isExpanded && (
        <>
          <TextAreaInput
            id={"object"}
            rhfregister={register("object")}
            label={"Objeto:"}
            containerProps={{
              pt: 6,
            }}
            inputProps={{
              borderRight: "1px solid",
              borderLeft: "1px solid",
              borderTop: "1px solid",
              borderRadius: 10,
              p: 2,
            }}
          />

          <TextAreaInput
            id={"recipient"}
            rhfregister={register("recipient")}
            label={"Destinatário:"}
            containerProps={{
              pt: 6,
            }}
            inputProps={{
              borderRight: "1px solid",
              borderLeft: "1px solid",
              borderTop: "1px solid",
              borderRadius: 10,
              p: 2,
            }}
          />

          <TextAreaInput
            id={"onusProbability"}
            rhfregister={register("onusProbability")}
            label={"Probabilidade de Ônus:"}
            containerProps={{
              pt: 6,
            }}
            inputProps={{
              borderRight: "1px solid",
              borderLeft: "1px solid",
              borderTop: "1px solid",
              borderRadius: 10,
              p: 2,
            }}
          />

          <TextAreaInput
            id={"bonusProbability"}
            rhfregister={register("bonusProbability")}
            label={"Probabilidade de Bônus:"}
            containerProps={{
              pt: 6,
            }}
            inputProps={{
              borderRight: "1px solid",
              borderLeft: "1px solid",
              borderTop: "1px solid",
              borderRadius: 10,
              p: 2,
            }}
          />
        </>
      )}

      <HStack pt={6} w={"full"} align={"center"} justify={"flex-start"}>
        <Button
          onClick={handleTechnicalNoteRemoval}
          variant={"secondary"}
          w={{ base: "50%", md: "15%" }}
        >
          {technicalNoteState.loading &&
          technicalNoteState.removingTechnicalNoteId === techincalNote.id ? (
            <Loading />
          ) : (
            "Remover"
          )}
        </Button>
        <Button type="submit" variant="primary" w={{ base: "50%", md: "15%" }}>
          {technicalNoteState.loading &&
          technicalNoteState.updatedTechnicalNoteId === techincalNote.id ? (
            <Loading />
          ) : (
            "Salvar"
          )}
        </Button>
      </HStack>
    </Form>
  );
};
