import { Client } from "@prisma/client";
import { FolderInterface } from "../../folders/interfaces/folder.interface";

export interface ClientInterface extends Client {
  folders: FolderInterface[];
}
