import React from "react";
import {
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "@observatorio-brasil/atores/src/store/hooks";
import Button from "@observatorio-brasil/atores/src/components/Button";
import { csvHeaders } from "@observatorio-brasil/atores/src/modules/ClientsPage";
import { exportFolderPropositions } from "@observatorio-brasil/atores/src/api/services/propositions";
import { selectPropositionFolder } from "@observatorio-brasil/atores/src/store/slices/proposition/proposition-folder";
import useClientPropositionsColumns from "@observatorio-brasil/atores/src/modules/ClientsPage/DataTable/columns";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import {
  getFolderByIdsWithPropositions,
  patchFolder,
} from "@observatorio-brasil/atores/src/api/services/folders";
import { RenameModal } from "@observatorio-brasil/atores/src/components/Modal/RenameModal";
import { FormOutlined } from "@ant-design/icons";
import { FolderWithClientAndPropositions } from "@observatorio-brasil/atores/prisma/interfaces/folder";
import { exportCSVFile } from "@observatorio-brasil/atores/src/utils/csv";
import { Loading } from "@observatorio-brasil/atores/src/components/Loading";

export default function ClientPropositionsPage() {
  const router = useRouter();
  const toast = useToast();
  const { clientId, folderId } = router.query;
  const { currentPropositionFolderId } = useAppSelector(
    selectPropositionFolder
  );
  const columns = useClientPropositionsColumns();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [folder, setFolder] = useState<FolderWithClientAndPropositions>();
  const [exporting, setExporting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const results = await getFolderByIdsWithPropositions(
        folderId!.toString(),
        clientId!.toString()
      );
      if (results.data) {
        setFolder(results.data);
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    } finally {
      setIsLoading(false);
    }
  }, [clientId, folderId]);

  useEffect(() => {
    if (clientId && folderId) {
      getData();
    }
  }, [clientId, folderId, getData]);

  useEffect(() => {
    if (!currentPropositionFolderId && clientId && folderId) {
      getData();
    }
  }, [currentPropositionFolderId, clientId, folderId, getData]);

  const handleExport = async () => {
    try {
      setExporting(true);
      const id = folderId!.toString();
      const res = await exportFolderPropositions(+id);

      if (res.data) {
        const createDateString = new Date().toISOString();
        const filename = `${
          folder!.client.nickName
        }-proposicoes-${createDateString}`;
        const items = res.data;
        exportCSVFile(csvHeaders, items, filename, "|");
      }
    } finally {
      setExporting(false);
    }
  };

  const handleRename = async (value: string) => {
    try {
      const res = await patchFolder(folder!.id, { name: value });
      if (res.data) {
        getData();
        toast({
          status: "success",
          description: "Pasta renomeada com sucesso!",
        });
      }
    } catch (e: any) {
      toast({ status: "error", description: e?.message });
    }
  };

  return (
    <PageWrapper presentGoBack restricted>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack w={"full"} align={"flex-start"} justify={"flex-start"}>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              {`Pasta `}
              <Text
                as={"span"}
                fontSize={"2xl"}
                fontWeight={"semibold"}
                textDecoration={"underline"}
                _hover={{ cursor: "pointer" }}
                onClick={onOpen}
              >
                {`"${folder?.name}"`}
                <FormOutlined style={{ paddingLeft: "8px" }} />
              </Text>
            </Text>
            <Text fontSize={"2xl"} fontWeight={"semibold"}>
              {`de "${folder?.client?.nickName}"`}
            </Text>
          </VStack>
          <HStack w={"full"} align={"center"} justify={"flex-end"}>
            <Button
              variant="secondary"
              onClick={() => router.push(`/busca/simples`)}
            >
              Adicionar novas proposições
            </Button>
            <Button
              isLoading={exporting}
              variant="primary"
              onClick={handleExport}
            >
              Exportar proposições da pasta
            </Button>
          </HStack>
          <HStack pt={"2%"} w={"full"} align={"center"} justify={"flex-start"}>
            <DataTable
              size="sm"
              data={folder?.propositions || []}
              columns={columns}
              pagination={true}
            />
          </HStack>
        </>
      )}
      <RenameModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Renomear pasta"}
        initialValue={folder?.name || ""}
        handleRename={handleRename}
      />
    </PageWrapper>
  );
}
