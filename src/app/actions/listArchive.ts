"use server";

import { prisma } from "@/lib/prisma";

export async function getArchives() {
  try {
    const archives = await prisma.archive.findMany({
      orderBy: { created_at: "desc" },
      include: {
        participants: {
          include: {
            person: true,
          },
        },
      },
    });

    const fullArchives = archives.map((archive) => {
      const participants = archive.participants.map((p) => p.person);
      const reciters = participants.filter((p) => p.role === "reciter");
      const speakers = participants.filter((p) => p.role === "speaker");

      return {
        ...archive,
        reciters,
        speakers,
        participants: undefined, // حذف فیلد participants برای تمیزی پاسخ
      };
    });

    return { success: true, data: fullArchives };
  } catch (error) {
    return { success: false, error: "خطایی در دریافت آرشیوها رخ داد" };
  }
}
