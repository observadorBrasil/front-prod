import { Folder } from "@prisma/client";
import { ClientInterface } from "../../clients/interfaces/client.interface";
import { PropositionFolderInterface } from "../../proposition-folders/interfaces/proposition-folder.interface";

export interface FolderInterface extends Folder {
  client: ClientInterface;
  propositions: PropositionFolderInterface[];
}
