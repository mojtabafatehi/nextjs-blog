"use server";

import { prisma } from "@/lib/prisma";

type CreatePersonInput = {
  fullName: string;
  role: "reciter" | "speaker";
  avatarUrl: string;
};

export async function createPerson(data: CreatePersonInput) {
  try {
    const { fullName, role, avatarUrl } = data;

    if (!["speaker", "reciter"].includes(role)) {
      throw new Error("نقش نامعتبر است");
    }

    const newPerson = await prisma.person.create({
      data: {
        full_name: fullName,
        role,
        avatar_url: avatarUrl,
      },
    });

    return newPerson;
  } catch (error) {
    console.error("❌ خطا در createPerson:", error);
    throw new Error("خطایی در سرور رخ داد");
  }
}

export async function getPersons() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: { created_at: "desc" },
    });
    return { success: true, data: persons };
  } catch (error) {
    return { success: false, error: "خطایی در دریافت داده‌ها رخ داد" };
  }
}
