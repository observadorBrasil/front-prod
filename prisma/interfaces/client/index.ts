import { Prisma } from "@prisma/client";

const clientWithFolder = Prisma.validator<Prisma.ClientArgs>()({
  include: { folders: true },
});

export type ClientWithFolder = Prisma.ClientGetPayload<typeof clientWithFolder>;
