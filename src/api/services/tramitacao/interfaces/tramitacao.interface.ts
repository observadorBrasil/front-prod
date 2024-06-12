import { Tramitacao } from "@prisma/client";
import { PropositionInterface } from "../../propositions/interfaces/proposition.interface";

export interface TramitacaoInterface extends Tramitacao {
  proposition: PropositionInterface;
}
