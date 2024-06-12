import { PropositionFolder } from "@prisma/client";
import { FolderInterface } from "../../folders/interfaces/folder.interface";
import { PropositionInterface } from "../../propositions/interfaces/proposition.interface";

export interface PropositionFolderInterface extends PropositionFolder {
  folder: FolderInterface;
  proposition: PropositionInterface;
}
