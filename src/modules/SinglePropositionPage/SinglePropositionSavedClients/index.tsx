import { HStack, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import columns from "./Datatable/columns";
import { useCallback, useEffect, useState } from "react";
import {
  PropositionFolderActions,
  selectPropositionFolder,
} from "@observatorio-brasil/atores/src/store/slices/proposition/proposition-folder";
import { selectProposition } from "@observatorio-brasil/atores/src/store/slices/proposition";
import {
  useAppDispatch,
  useAppSelector,
} from "@observatorio-brasil/atores/src/store/hooks";
import { ClientInterface } from "@observatorio-brasil/atores/src/api/services/clients/interfaces/client.interface";
import { PropositionFolderInterface } from "@observatorio-brasil/atores/src/api/services/proposition-folders/interfaces/proposition-folder.interface";
import ContentBox from "@observatorio-brasil/atores/src/components/ContentBox";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import Button from "@observatorio-brasil/atores/src/components/Button";
import DataTable from "@observatorio-brasil/atores/src/components/DataTable/DataTable";
import { searchClientByName } from "@observatorio-brasil/atores/src/api/services/clients";
import { getFoldersByClientId } from "@observatorio-brasil/atores/src/api/services/folders";
import { useDebounce } from "@observatorio-brasil/atores/src/hooks/useDebounce";
import { FolderInterface } from "@observatorio-brasil/atores/src/api/services/folders/interfaces/folder.interface";

interface Props {
  propositionId: number;
  propositionFolders: PropositionFolderInterface[];
}

interface PropositionClientFolderFormInput {
  client: string;
  folder: string;
  clientId: number | null;
  folderId: number | null;
}

export const SinglePropositionSavedClients = (props: Props) => {
  const { propositionFolders, propositionId } = props;
  const dispatch = useAppDispatch();
  const propositionFolderState = useAppSelector(selectPropositionFolder);
  const propositionState = useAppSelector(selectProposition);

  const { handleSubmit, register, watch, setValue } =
    useForm<PropositionClientFolderFormInput>();

  const clientSearch = watch("client");
  const clientIdWatch = watch("clientId");
  const debouncedClientSearch = useDebounce(clientSearch);

  const [clientSuggestions, setClientSuggestions] = useState<ClientInterface[]>(
    []
  );
  const [folderSuggestions, setFolderSuggestions] = useState<FolderInterface[]>(
    []
  );

  const onChangeFolderVisibility = (
    propositionFolderId: number,
    isChecked: boolean
  ) => {
    dispatch(
      PropositionFolderActions.requestUpdatePropositionFolder({
        propositionFolderId,
        data: { visible: isChecked },
      })
    );
  };

  const onPropositionFolderDelete = (propositionFolderId: number) => {
    dispatch(
      PropositionFolderActions.requestRemovePropositionFolderById({
        propositionFolderId,
      })
    );
  };

  const handleClientsSearchChange = useCallback(async () => {
    const newClientSuggestions = await searchClientByName(
      debouncedClientSearch
    );
    if (newClientSuggestions.data) {
      setClientSuggestions(newClientSuggestions.data);
    }
  }, [debouncedClientSearch]);

  const handleGetFolders = useCallback(async () => {
    if (clientIdWatch) {
      const { data: folders } = await getFoldersByClientId(clientIdWatch);
      if (folders) {
        setFolderSuggestions(folders);
        return;
      }
    }
    setFolderSuggestions([]);
  }, [clientIdWatch]);

  const handleFormSubmit = async (formValues: any) => {
    const { folderId } = formValues;
    if (propositionFolderState.loading) return;
    dispatch(
      PropositionFolderActions.requestCreatePropositionFolder({
        folderId,
        propositionId,
      })
    );
  };

  useEffect(() => {
    handleClientsSearchChange();
  }, [debouncedClientSearch, handleClientsSearchChange]);

  useEffect(() => {
    handleGetFolders();
  }, [clientIdWatch, handleGetFolders]);

  return (
    <ContentBox>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify={{ base: "flex-start", md: "space-between" }}
          gap={8}
          marginBottom={4}
        >
          <TextInput
            label="Cliente"
            id={"client"}
            type={"text"}
            rhfregister={register("client")}
            containerProps={{
              color: "black",
              paddingTop: { base: 0, md: 6 },
              paddingBottom: { base: 0, md: 6 },
              w: { base: "100%", md: "25%" },
            }}
            suggestions={{
              options: () =>
                (clientSuggestions || [])
                  .map((c) => c.name)
                  .sort((a, b) => a.localeCompare(b)),
              onOptionClick: (v) => {
                const client = clientSuggestions.find(
                  (cl) => cl.name === v || cl.nickName === v
                );
                if (client) {
                  setValue("client", client.name);
                  setValue("clientId", client.id);
                  setValue("folderId", null);
                }
              },
            }}
          />
          <TextInput
            label="Pastas"
            id={"folder"}
            type={"text"}
            rhfregister={register("folder", {})}
            containerProps={{
              color: "black",
              paddingTop: { base: 0, md: 6 },
              paddingBottom: { base: 0, md: 6 },
              w: { base: "100%", md: "25%" },
              style: {
                marginTop: 0,
              },
            }}
            suggestions={{
              options: () =>
                (folderSuggestions || [])
                  .map((f) => f.name)
                  .sort((a, b) => a.localeCompare(b)),
              onOptionClick: (v) => {
                const folder = folderSuggestions.find((f) => f.name === v);
                if (folder) {
                  setValue("folder", folder.name);
                  setValue("folderId", folder.id);
                }
              },
            }}
          />
          <Button
            w={{ base: "100%", md: "15%" }}
            type="submit"
            variant="primary"
            isLoading={
              propositionFolderState.loading ||
              propositionState.loading ||
              propositionState.metaDataLoading
            }
          >
            Adicionar
          </Button>
        </Stack>
        <HStack wrap={"wrap"} justify={"flex-start"}>
          <DataTable
            columns={columns(
              onChangeFolderVisibility,
              onPropositionFolderDelete
            )}
            data={propositionFolders}
            noDataPlaceholder={"Sem clientes relacionados."}
          />
        </HStack>
      </Form>
    </ContentBox>
  );
};

export default SinglePropositionSavedClients;
