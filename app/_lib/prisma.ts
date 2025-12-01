import { PrismaClient } from "@prisma/client";

// Extende o tipo global para incluir cachedPrisma
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined;
}

// Cria instância de PrismaClient
const prisma = global.cachedPrisma || new PrismaClient();

// Em desenvolvimento, reutiliza instância para evitar múltiplas conexões
if (process.env.NODE_ENV !== "production") {
  global.cachedPrisma = prisma;
}

export const db = prisma;
