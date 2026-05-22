import { NextResponse } from "next/server";
import { uploads } from "@/lib/store";

export const runtime = "nodejs";

// Аналог POST /file/v1/confirm-upload — фиксирует загрузку по file_id.
export async function POST(req: Request) {
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { id } = body;
  if (!id) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const rec = uploads.get(id);
  if (!rec) return NextResponse.json({ error: "unknown_upload" }, { status: 404 });
  if (rec.status === "initiated") {
    return NextResponse.json({ error: "not_uploaded" }, { status: 409 });
  }

  rec.status = "confirmed";
  uploads.set(rec.id, rec);

  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({ ok: true });
}
