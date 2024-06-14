import React, { useEffect, useState } from "react";
import ContentBox from "../../../components/ContentBox";
import { NotaTecnica } from "@prisma/client";
import { SingleTechincalNote } from "./SingleTechincalNote";
import {
  HStack,
  Select,
  SelectField,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Button from "../../../../src/components/Button";
import Form from "../../../../src/components/RHF/Form";
import TextInput from "../../../../src/components/RHF/TextInput";
import { useForm } from "react-hook-form";
import PrioritySelect from "../../../../src/components/Select/PrioritySelect";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  selectTechnicalNote,
  TechnicalNoteActions,
} from "../../../../src/store/slices/nota-tecnica";
import { Loading } from "../../../../src/components/Loading";

interface Props {
  technicalNotes: NotaTecnica[];
  propositionId: number;
}

interface FormValues {
  issueDate: string | Date;
  owner: string;
  recipient: string;
  object: string;
  onusProbability: string;
  bonusProbability: string;
  priority: string;
}

const SinglePropositionTechnicalNotes = (props: Props) => {
  const { technicalNotes, propositionId } = props;
  const technicalNoteState = useAppSelector(selectTechnicalNote);
  const dispatch = useAppDispatch();

  const [isNewTechnicalNoteFormVisible, setIsNewTechnicalNoteFormVisible] =
    useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormValues>({});

  const handleFormSubmit = (v: FormValues) => {
    dispatch(
      TechnicalNoteActions.requestTechnicalNoteCreation({
        data: {
          ...v,
          issueDate: new Date(v.issueDate),
          proposition: { connect: { id: propositionId } },
        },
      })
    );
  };

  useEffect(() => {
    if (!technicalNoteState.error && technicalNotes.length > 0) {
      setIsNewTechnicalNoteFormVisible(false);
    }
  }, [technicalNoteState.error, technicalNotes.length]);

  return (
    <ContentBox
      title={
        <HStack w={"full"} align={"center"} gap={2}>
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Notas técnicas
          </Text>
          {!isNewTechnicalNoteFormVisible && (
            <PlusCircleOutlined
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={() => setIsNewTechnicalNoteFormVisible(true)}
            />
          )}
        </HStack>
      }
      collapsable
    >
      {isNewTechnicalNoteFormVisible && (
        <Form
          onSubmit={handleSubmit(handleFormSubmit)}
          style={{ width: "100%" }}
        >
          <VStack
            align={"flex-start"}
            justify={"space-between"}
            borderBottomWidth={1}
            borderBottomColor={"black"}
            paddingBottom={6}
            marginTop={4}
          >
            <TextInput
              id="issueDate"
              rhfregister={register("issueDate", { required: true })}
              type={"date"}
              required
              label={"Data de emissão"}
              containerProps={{
                paddingTop: 2,
                paddingBottom: 4,
                w: { base: "100%", md: "45%" },
              }}
            />
            <Stack
              direction={{ base: "column", md: "row" }}
              align={"center"}
              justify={"space-between"}
              w={"full"}
            >
              <TextInput
                id="owner"
                rhfregister={register("owner", { required: true })}
                required
                type={"text"}
                label={"Responsável"}
                containerProps={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  w: { base: "100%", md: "45%" },
                }}
              />
              <TextInput
                id="recipient"
                rhfregister={register("recipient", { required: true })}
                required
                type={"text"}
                label={"Destinatário"}
                containerProps={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  w: { base: "100%", md: "45%" },
                }}
              />
            </Stack>
            <TextInput
              id="object"
              rhfregister={register("object", { required: true })}
              required
              type={"text"}
              label={"Objeto"}
              containerProps={{
                paddingTop: 2,
                paddingBottom: 2,
                w: { base: "100%" },
              }}
            />
            <Stack
              direction={{ base: "column", md: "row" }}
              align={"center"}
              justify={"space-between"}
              w={"full"}
            >
              <TextInput
                id="onusProbability"
                rhfregister={register("onusProbability", { required: true })}
                required
                type={"text"}
                label={"Probabilidade de Ônus"}
                containerProps={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  w: { base: "100%", md: "45%" },
                }}
              />
              <TextInput
                id="bonusProbability"
                rhfregister={register("bonusProbability", { required: true })}
                required
                type={"text"}
                label={"Probabilidade de Bônus"}
                containerProps={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  w: { base: "100%", md: "45%" },
                }}
              />
            </Stack>
            <PrioritySelect
              w={{ base: "100%", md: "45%" }}
              label={"Prioridade"}
              rhfregister={register("priority", { required: true })}
              containerProps={{ flexDirection: "column" }}
            />
            <Stack
              w={"full"}
              align={"center"}
              justify={"space-between"}
              direction={{ base: "column", md: "row" }}
              paddingTop={6}
            >
              <Button
                onClick={() =>
                  technicalNoteState.loading
                    ? null
                    : setIsNewTechnicalNoteFormVisible(false)
                }
                variant="secondary"
                w={{ base: "100%", md: "45%" }}
              >
                Cancelar
              </Button>
              <Button
                w={{ base: "100%", md: "45%" }}
                variant="primary"
                type="submit"
              >
                {technicalNoteState.loading &&
                !technicalNoteState.updatedTechnicalNoteId ? (
                  <Loading />
                ) : (
                  "Salvar"
                )}
              </Button>
            </Stack>
          </VStack>
        </Form>
      )}
      {technicalNotes.map((tc) => (
        <SingleTechincalNote key={`tc_${tc.id}`} techincalNote={tc} />
      ))}
    </ContentBox>
  );
};

export default SinglePropositionTechnicalNotes;
