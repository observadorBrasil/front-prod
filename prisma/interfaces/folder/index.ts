import { Prisma } from "@prisma/client";

const folderWithClientAndPropositions = Prisma.validator<Prisma.FolderArgs>()({
  include: {
    client: true,
    propositions: {
      where: { visible: true },
      select: {
        id: true,
        proposition: {
          include: {
            house: true,
            propositionType: true,
          },
        },
      },
    },
  },
});

export type FolderWithClientAndPropositions = Prisma.FolderGetPayload<
  typeof folderWithClientAndPropositions
>;
