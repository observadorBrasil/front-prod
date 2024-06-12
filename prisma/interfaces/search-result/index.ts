import { Prisma } from "@prisma/client";

const selectedSearchResult = Prisma.validator<Prisma.SearchResultArgs>()({
  select: {
    id: true,
    createdAt: true,
    proposition: {
      select: {
        id: true,
        ementa: true,
        propositionType: true,
        house: true,
      },
    },
    searchResultStatus: true,
  },
});

export type SelectedSearchResult = Prisma.SearchResultGetPayload<
  typeof selectedSearchResult
>;
