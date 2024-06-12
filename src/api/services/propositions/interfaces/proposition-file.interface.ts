import { File, FileType, PropositionFile } from "@prisma/client";

export interface PropositionFileInterface extends PropositionFile {
  fileType: FileType;
  files: File[];
}
