import { NextResponse } from "next/server";
import { uploads } from "@/lib/store";

export const runtime = "nodejs";

// Аналог S3 presigned PUT — принимает файл целиком в теле запроса.
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const rec = uploads.get(params.id);
  if (!rec) {
    return NextResponse.json({ error: "unknown_upload" }, { status: 404 });
  }

  const buf = Buffer.from(await req.arrayBuffer());
  rec.receivedBytes = buf.length;
  rec.status = "uploaded";
  rec.data = buf;
  uploads.set(rec.id, rec);

  return NextResponse.json({ ok: true });
}
