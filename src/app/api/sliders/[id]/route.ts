import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const id = params.id;

  await db.run("DELETE FROM sliders WHERE id = ?", id);
  return NextResponse.json({ message: "اسلاید با موفقیت حذف شد" });
}
