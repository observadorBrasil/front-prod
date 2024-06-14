import React from "react";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Button from "../../../../src/components/Button";
import { Loading } from "../../../../src/components/Loading";
import Form from "../../../../src/components/RHF/Form";
import TextInput from "../../../../src/components/RHF/TextInput";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../src/store/hooks";
import {
  PropositionActions,
  selectProposition,
} from "../../../../src/store/slices/proposition";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropositionInterface } from "../../../api/services/propositions/interfaces/proposition.interface";
import SideBySideContentBox from "../../../components/SideBySideContentBox";
import ContentBox from "../../../components/ContentBox";

interface Props {
  proposition: PropositionInterface;
}

export const SinglePropositionOverview = (props: Props) => {
  const { proposition } = props;

  const propositionState = useAppSelector(selectProposition);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      comissions: proposition.comissions ? proposition.comissions : "",
      comissions2: proposition.comissions ? proposition.comissions : "",
      regime: proposition.regime ? proposition.regime : "",
      regime2: proposition.regime ? proposition.regime : "",
    },
  });

  const sortedTramitacoes = proposition.tramitacoes
    ? [...proposition.tramitacoes].sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
    : [];

  useEffect(() => {
    setValue(
      "comissions",
      props.proposition.comissions ? props.proposition.comissions : ""
    );
    setValue(
      "comissions2",
      props.proposition.comissions ? props.proposition.comissions : ""
    );
    setValue(
      "regime",
      props.proposition.regime ? props.proposition.regime : ""
    );
    setValue(
      "regime2",
      props.proposition.regime ? props.proposition.regime : ""
    );
  }, [props.proposition, setValue]);

  const comissions1 = watch("comissions");
  const comissions2 = watch("comissions2");
  useEffect(() => {
    if (comissions1 !== comissions2) setValue("comissions2", comissions1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comissions1, setValue]);
  useEffect(() => {
    if (comissions1 !== comissions2) setValue("comissions", comissions2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comissions2, setValue]);

  const regime1 = watch("regime");
  const regime2 = watch("regime2");
  useEffect(() => {
    if (regime1 !== regime2) setValue("regime2", regime1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regime1, setValue]);
  useEffect(() => {
    if (regime1 !== regime2) setValue("regime", regime2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regime2, setValue]);

  const handleFormSubmisson = async (v: any) => {
    if (propositionState.metaDataLoading) return;

    dispatch(
      PropositionActions.requestPatchProposition({
        propositionId: proposition.id,
        data: {
          comissions: v.comissions,
          regime: v.regime,
        },
      })
    );
  };

  return (
    <ContentBox title={"Resumo"} collapsable>
      <SideBySideContentBox
        containerProps={{
          mt: 4,
          color: "black",
          direction: { base: "column", md: "row" },
        }}
        sideChildrenContainerProps={{ w: { base: "100%", md: "50%" } }}
        sideChildren={
          <VStack
            align={"flex-end"}
            display={{ base: "none", md: "flex" }}
            justify={"space-between"}
            gap={4}
            fontWeight={"bold"}
            w={"100%"}
            height={"100%"}
          >
            <Text>Casa Legislativa</Text>
            <Text>Autoria</Text>
            <Text>Data apresentação</Text>
            <Text>Situação</Text>
            <Text pt={4}>Regime de Tramitação</Text>
            <Text pt={4}>Comissões</Text>
            <Text>Adicionado em</Text>
            <Text>Última atualização de base</Text>
            <Text>Data última tramitação</Text>
          </VStack>
        }
        mainChildrenContainerProps={{
          borderLeft: { base: "none", md: "1px solid" },
          paddingLeft: { base: 0, md: 16 },
        }}
      >
        <Form onSubmit={handleSubmit(handleFormSubmisson)}>
          <VStack
            align={"flex-start"}
            justify={"space-between"}
            gap={4}
            w={"100%"}
            height={"100%"}
            display={{ base: "none", md: "flex" }}
          >
            <Text>{proposition.house.description}</Text>
            <Text>
              {proposition.author ? proposition.author : "Não Informado"}
            </Text>
            <Text>
              {new Date(proposition.presentationDate).toLocaleDateString(
                "pt-BR"
              )}
            </Text>
            <Text>
              {proposition.situation
                ? proposition.situation.description
                : "Não Informado"}
            </Text>
            <TextInput
              rhfregister={register("regime")}
              id={"regime"}
              label={""}
              type={"text"}
              containerProps={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
            <TextInput
              rhfregister={register("comissions")}
              id={"comissions"}
              label={""}
              type={"text"}
              containerProps={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
            <Text>
              {new Date(proposition.createdAt).toLocaleDateString("pt-BR")}
            </Text>
            <Text>
              {new Date(proposition.updatedAt).toLocaleDateString("pt-BR")}
            </Text>
            <Text>
              {sortedTramitacoes.length > 0
                ? new Date(sortedTramitacoes[0].createdAt!).toLocaleDateString(
                    "pt-BR"
                  )
                : "Não Informado"}
            </Text>

            <Button type="submit" variant="primary">
              {propositionState.metaDataLoading ? (
                <Loading />
              ) : (
                <Text>Salvar</Text>
              )}
            </Button>
          </VStack>
          <VStack
            align={"flex-start"}
            justify={"space-between"}
            gap={4}
            w={"100%"}
            height={"100%"}
            display={{ base: "flex", md: "none" }}
          >
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Casa Legislativa:
              </Text>{" "}
              <Text textAlign={"left"}> {proposition.house.description}</Text>
            </HStack>
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Autoria:
              </Text>{" "}
              <Text textAlign={"left"}> {proposition.author}</Text>
            </HStack>
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Data apresentação:
              </Text>{" "}
              <Text textAlign={"left"}>
                {" "}
                {new Date(proposition.presentationDate).toLocaleDateString(
                  "pt-BR"
                )}
              </Text>
            </HStack>
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Situação:
              </Text>{" "}
              <Text textAlign={"left"}>
                {" "}
                {proposition.situation
                  ? proposition.situation.description
                  : "Não Informado"}
              </Text>
            </HStack>
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Regime de Tramitação:
              </Text>{" "}
              <TextInput
                rhfregister={register("regime2")}
                id={"regime2"}
                label={""}
                type={"text"}
                containerProps={{
                  pt: 0,
                  pb: 0,
                }}
              />
            </HStack>
            {proposition.comissions && (
              <HStack w={"full"}>
                <Text width={"40%"} fontWeight={"bold"}>
                  Comissões:
                </Text>{" "}
                <TextInput
                  rhfregister={register("comissions2")}
                  id={"comissions2"}
                  label={""}
                  type={"text"}
                  containerProps={{
                    pt: 0,
                    pb: 0,
                  }}
                />
              </HStack>
            )}
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Adicionado em:
              </Text>{" "}
              <Text textAlign={"left"}>
                {" "}
                {new Date(proposition.createdAt).toLocaleDateString("pt-BR")}
              </Text>
            </HStack>

            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Última atualização de base:
              </Text>{" "}
              <Text textAlign={"left"}>
                {" "}
                {new Date(proposition.updatedAt).toLocaleDateString("pt-BR")}
              </Text>
            </HStack>
            <HStack w={"full"}>
              <Text width={"40%"} fontWeight={"bold"}>
                Data última tramitação:
              </Text>{" "}
              <Text textAlign={"left"}>
                {" "}
                {sortedTramitacoes.length > 0
                ? new Date(sortedTramitacoes[0].createdAt!).toLocaleDateString(
                    "pt-BR"
                  )
                : "Não Informado"}
              </Text>
            </HStack>
            <Button w={"full"} type="submit" variant="primary">
              {propositionState.metaDataLoading ? (
                <Loading />
              ) : (
                <Text>Salvar</Text>
              )}
            </Button>
          </VStack>
        </Form>
      </SideBySideContentBox>
    </ContentBox>
  );
};
