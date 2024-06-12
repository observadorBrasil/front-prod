import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Form from "../../../components/RHF/Form";
import TextInput from "../../../components/RHF/TextInput";
import { useForm } from "react-hook-form";
import theme from "../../../theme";
import TextAreaInput from "../../../components/RHF/TextAreaInput";
import Button from "../../../components/Button";
import { TramitacaoInterface } from "../../../api/services/tramitacao/interfaces/tramitacao.interface";
import EditableTextArea from "@observatorio-brasil/atores/src/components/RHF/EditableTextArea";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import {
  selectTramitacao,
  TramitacaoActions,
} from "@observatorio-brasil/atores/src/store/slices/tramitacao";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";

interface SingleProceedingProps {
  proceeding: TramitacaoInterface;
}

const SingleProceeding = ({ proceeding }: SingleProceedingProps) => {
  const [saveButtonVisible, setSaveButtonVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const tramitacaoState = useAppSelector(selectTramitacao);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      internalInfo: proceeding.internalInfo,
    },
  });

  useEffect(() => {
    setValue("internalInfo", proceeding.internalInfo);
  }, [proceeding, setValue]);

  const handleFormSubmission = (v: any) => {
    if (tramitacaoState.loading) return;

    dispatch(
      TramitacaoActions.requestTramitacaoUpdate({
        tramitacaoId: proceeding.id,
        data: {
          internalInfo: v.internalInfo,
        },
      })
    );
  };

  return (
    <VStack w="full" justify={"flex-start"} pt={4} gap={2}>
      <HStack w="full" align={"center"} justify={"flex-start"}>
        <Text
          color={"black"}
          fontWeight={"semibold"}
          w={{ base: "50%", md: "25%" }}
        >
          Data de tramitação:
        </Text>
        <Text pl={2} color={"black"} w={{ base: "45%", md: "65%" }}>
          {new Date(proceeding?.createdAt || "").toLocaleDateString("pt-BR")}
        </Text>
      </HStack>
      <HStack w="full" align={"center"} justify={"flex-start"}>
        <Text
          color={"black"}
          fontWeight={"semibold"}
          w={{ base: "50%", md: "25%" }}
        >
          Descrição:
        </Text>
        <Text pl={2} color={"black"} w={{ base: "45%", md: "65%" }}>
          {proceeding.description}
        </Text>
      </HStack>
      <HStack w="full" align={"flex-start"} justify={"flex-start"} pt={4}>
        <Form onSubmit={handleSubmit(handleFormSubmission)}>
          <EditableTextArea
            label={"Informação Interna:"}
            w={{ base: "100%", md: "100%" }}
            initialValue={proceeding?.internalInfo || ""}
            id={"internalInfo"}
            rhfregister={register("internalInfo", {})}
            labelProps={{
              color: "black",
              pl: 0,
            }}
            onEnable={(v) => setSaveButtonVisible(v)}
          />
          {saveButtonVisible && (
            <Button
              type="submit"
              variant="primary"
              mt={4}
              w={{ base: "100%", md: "30%" }}
            >
              {tramitacaoState.loading &&
              tramitacaoState.updatedTramitacaoId === proceeding.id ? (
                <Loading />
              ) : (
                "Salvar"
              )}
            </Button>
          )}
        </Form>
        {/* <TextAreaInput
          containerProps={{
            pl: 2,
            color: "black",
            w: { base: "45%", md: "65%" },
          }}
          inputProps={{
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderColor: "primary",
          }}
          id={"internalInfo"}
          rhfregister={register("internalInfo")}
        /> */}
        {/* {proceeding.internalInfo}
          <EditOutlined
            onClick={() => setDetailsFormVisibility(!openDetailsForm)}
            style={{
              color: theme.colors.primary,
              fontSize: 20,
              marginLeft: 12,
              cursor: "pointer",
            }}
          />*/}
        {/* </TextAreaInput> */}
      </HStack>
      {/* {openDetailsForm && (
        <Form onSubmit={handleSubmit((v) => console.log(v))}>
          <VStack>
            <HStack w={"full"} align={"baseline"} justify={"flex-start"}>
              <Text>Local:</Text>
              <TextInput
                id={"local"}
                type={"text"}
                rhfregister={register("local")}
                label={""}
                containerProps={{ w: "90%" }}
              />
            </HStack>
            <TextAreaInput
              id={"proceeding"}
              rhfregister={register("proceeding")}
              label={"Tramitação:"}
              inputProps={{
                borderRight: "1px solid",
                borderLeft: "1px solid",
                borderTop: "1px solid",
                borderRadius: 10,
                p: 2,
              }}
            />
          </VStack>
          <HStack
            pt={6}
            w={"full"}
            align={"center"}
            justify={{ base: "center", md: "flex-end" }}
          >
            <Button
              onClick={() => setDetailsFormVisibility(false)}
              variant={"secondary"}
              w={{ base: "50%", md: "15%" }}
            >
              Cancelar
            </Button>
            <Button
              w={{ base: "50%", md: "15%" }}
              type="submit"
              variant="primary"
            >
              Salvar
            </Button>
          </HStack>
        </Form>
      )} */}
    </VStack>
  );
};

export default SingleProceeding;
