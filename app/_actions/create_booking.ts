"use server";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
  serviceId: string;
  date: Date;
}

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions);
  if (!user) {
    throw new Error("Usuário não autenticado");
  }
  await db.booking.create({
    data: { ...params, userId: (user.user as SessionUser).id },
  });
  revalidatePath("/barbershops/[id]");
  revalidatePath("/bookings");
};
