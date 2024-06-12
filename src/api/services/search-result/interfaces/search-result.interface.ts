import { Search, SearchResult, SearchResultStatus } from "@prisma/client";
import { PropositionInterface } from "../../propositions/interfaces/proposition.interface";

export interface SearchResultInterface extends SearchResult {
  search: Pick<Search, "name">;
  proposition: PropositionInterface;
  searchResultStatus: SearchResultStatus;
}
