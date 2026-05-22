import { NextResponse } from "next/server";
import { uploads } from "@/lib/store";

export const runtime = "nodejs";

// Искусственная задержка чтения, чтобы прогресс PUT действительно был виден.
const MIN_TOTAL_MS = 400;
const MAX_TOTAL_MS = 1800;

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const rec = uploads.get(params.id);
  if (!rec) {
    return NextResponse.json({ error: "unknown_upload" }, { status: 404 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  // «Размазываем» приём байт по времени, пропорционально размеру.
  const target = Math.min(
    MAX_TOTAL_MS,
    Math.max(MIN_TOTAL_MS, Math.round((file.size / (1024 * 1024)) * 700))
  );
  await new Promise((r) => setTimeout(r, target));

  const buf = Buffer.from(await file.arrayBuffer());
  rec.receivedBytes = buf.length;
  rec.status = "uploaded";
  rec.data = buf;
  uploads.set(rec.id, rec);

  return NextResponse.json({ ok: true });
}
