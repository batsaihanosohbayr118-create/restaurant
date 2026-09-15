"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!name || !email || !password) {
    return { success: false as const, error: "All fields are required." };
  }
  if (password.length < 8) {
    return { success: false as const, error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false as const, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return { success: true as const };
}
