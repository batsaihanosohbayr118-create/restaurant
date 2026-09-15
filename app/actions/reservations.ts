"use server";

import { prisma } from "@/lib/prisma";

export interface ReservationInput {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  request?: string;
}

export async function createReservation(input: ReservationInput) {
  if (!input.name || !input.phone || !input.email || !input.date || !input.time) {
    return { success: false as const, error: "Missing required fields." };
  }

  await prisma.reservation.create({
    data: {
      name: input.name,
      phone: input.phone,
      email: input.email,
      date: input.date,
      time: input.time,
      guests: input.guests,
      request: input.request || null,
    },
  });

  return { success: true as const };
}
