import {
  NotaTecnica,
  Project,
  Proposition,
  PropositionType,
  Situation,
  Theme,
} from "@prisma/client";
import { HouseInterface } from "../../houses/interfaces/house.interface";
import { TramitacaoInterface } from "../../tramitacao/interfaces/tramitacao.interface";
import { PropositionFileInterface } from "./proposition-file.interface";
import { PropositionFolderInterface } from "../../proposition-folders/interfaces/proposition-folder.interface";

export interface PropositionInterface extends Proposition {
  propositionType: PropositionType;
  presentationDate: Date;
  house: HouseInterface;
  folders: PropositionFolderInterface[];
  tramitacoes: TramitacaoInterface[];
  notasTecnicas: NotaTecnica[];
  files: PropositionFileInterface[];
  situation: Situation;
  theme: Theme;
  project: Project;
}
