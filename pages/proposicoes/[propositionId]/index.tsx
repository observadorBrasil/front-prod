import React, { useCallback, useEffect, useState } from "react";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import PageWrapper from "../../../src/components/PageWrapper";
import ContentBox from "../../../src/components/ContentBox";
import EditableTextArea from "../../../src/components/RHF/EditableTextArea";
import SinglePropositionDetailsSection from "../../../src/modules/SinglePropositionPage/SinglePropositionDetailsSection";
import SinglePropositionSavedClients from "../../../src/modules/SinglePropositionPage/SinglePropositionSavedClients";
import SinglePropositionProceedingsHistory from "../../../src/modules/SinglePropositionPage/SinglePropositionProceedingsHistory";
import { useForm } from "react-hook-form";
import Form from "../../../src/components/RHF/Form";
import SinglePropositionTechnicalNotes from "../../../src/modules/SinglePropositionPage/SinglePropositionTechnicalNote";
import SinglePropositionUploadedFiles from "../../../src/modules/SinglePropositionPage/SinglePropositionUploadedFiles";
import { LinkOutlined } from "@ant-design/icons";
import { getSinglePropositionPageServerSideProps } from "../../../src/modules/SinglePropositionPage/getServerSideProps";
import { PropositionInterface } from "../../../src/api/services/propositions/interfaces/proposition.interface";
import { SinglePropositionOverview } from "../../../src/modules/SinglePropositionPage/SinglePropositionOverview";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import {
  PropositionActions,
  selectProposition,
} from "../../../src/store/slices/proposition";
import Link from "@observatorio-brasil/atores/src/components/Link";
import PrioritySelect from "@observatorio-brasil/atores/src/components/Select/PrioritySelect";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import Button from "@observatorio-brasil/atores/src/components/Button";
import { useRouter } from "next/router";
import { Prisma } from "@prisma/client";

export const getServerSideProps = getSinglePropositionPageServerSideProps;

interface SinglePropositionPageProps {
  ssrProposition: PropositionInterface;
}

export default function SinglePropositionPage({
  ssrProposition,
}: SinglePropositionPageProps) {
  const dispatch = useAppDispatch();
  const propositionData = useAppSelector(selectProposition);
  const router = useRouter();
  const proposition =
    propositionData.data?.id === ssrProposition.id
      ? propositionData.data
      : ssrProposition;

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      ementa: proposition.ementa,
    },
  });

  useEffect(() => {
    setValue("ementa", proposition.ementa);
  }, [proposition, setValue]);

  useEffect(() => {
    dispatch(PropositionActions.setPropositionData(ssrProposition));
  }, [dispatch, ssrProposition]);

  const {
    handleSubmit: handlePropositionMetaDataSubmit,
    register: propositionMetadataRegister,
  } = useForm({
    defaultValues: {
      significance: proposition.significance || "medium",
      approvalProbability: proposition.approvalProbability || 0,
    },
  });

  const onPropositionMetadataSubmit = (v: Prisma.PropositionUpdateInput) => {
    if (proposition.id) {
      dispatch(
        PropositionActions.requestPatchProposition({
          propositionId: proposition.id,
          data: {
            significance: v.significance,
            approvalProbability: v.approvalProbability,
          },
        })
      );
    }
    return;
  };

  const goBack = () => {
    router.back();
    setTimeout(() => {
      router.push(window.location.href);
    }, 100);
  };

  return (
    // Go Back para Busca Avançada feita na gamby
    <PageWrapper presentGoBack restricted
      overrideGoBack={goBack}
    >
      <Stack
        direction={{ base: "column" }}
        align={{ base: "flex-start" }}
        justify={"space-between"}
        w={"full"}
      >
        <Link w={"100%"} href={proposition.link || "#"}>
          <HStack w={"full"} align={"center"} gap={1} cursor={"pointer"}>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              {`${proposition.propositionType.description} ${proposition.number}/${proposition.year}`}
            </Text>
            <LinkOutlined style={{ fontSize: 22 }} />
          </HStack>
        </Link>
        <Form
          onSubmit={handlePropositionMetaDataSubmit(
            onPropositionMetadataSubmit
          )}
        >
          <Stack
            w={{ base: "100%" }}
            direction={{ base: "column", md: "row" }}
            justify={{ base: "flex-start" }}
            align={{ base: "center", sm: "flex-start", md: "center" }}
            gap={{ base: 2, md: 8 }}
            mt={4}
            mb={{ base: 6, md: 0 }}
          >
            {/* <HStack gap={2}>
              <Text color={"black"} fontWeight={"normal"} fontSize={"lg"}>
                Significância:
              </Text>
              <VStack gap={0} alignItems={"center"} justify={"flex-start"}>
                <PrioritySelect
                  rhfregister={propositionMetadataRegister("significance")}
                  id={"significance"}
                />
              </VStack>
            </HStack>
            <HStack>
              <Text color={"black"} fontWeight={"normal"} fontSize={"lg"}>
                Aprovação (%):
              </Text>
              <TextInput
                label={""}
                id={"approvalProbability"}
                rhfregister={propositionMetadataRegister(
                  "approvalProbability",
                  {
                    valueAsNumber: true,
                    validate: (value) => value >= 0 && value <= 100,
                  }
                )}
                type={"number"}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
                containerProps={{
                  pt: 0,
                  pb: 0,
                  width: "20%",
                }}
              />
            </HStack> */}
            <Button
              type="submit"
              variant="primary"
              w={{ base: "100%", md: "20%" }}
              isLoading={
                propositionData.loading || propositionData.metaDataLoading
              }
            >
              Salvar
            </Button>
          </Stack>
        </Form>
      </Stack>
      <VStack
        pt={"1%"}
        pb={"10%"}
        w={"full"}
        align={"flex-start"}
        justify={"space-between"}
        gap={12}
      >
        <SinglePropositionSavedClients
          propositionId={proposition.id}
          propositionFolders={proposition.folders}
        />

        <SinglePropositionOverview proposition={proposition} />

        <ContentBox>
          <Form onSubmit={handleSubmit((v) => console.log(v))}>
            <EditableTextArea
              label={"Ementa"}
              id={"ementa"}
              initialValue={proposition.ementa}
              rhfregister={register("ementa", {})}
            />
          </Form>
        </ContentBox>

        <SinglePropositionDetailsSection proposition={proposition} />

        <SinglePropositionProceedingsHistory
          proceedings={proposition.tramitacoes}
        />

        <SinglePropositionTechnicalNotes
          propositionId={proposition.id}
          technicalNotes={proposition.notasTecnicas}
        />

        <SinglePropositionUploadedFiles propositionFiles={proposition.files} />

        {/* <SinglePropositionMinedAttachements proposition={proposition} /> */}
      </VStack>
    </PageWrapper>
  );
}

