import { NextResponse } from "next/server";
import { ALLOWED_TYPES, MAX_SIZE, extFromType, newUploadId, uploads } from "@/lib/store";

export const runtime = "nodejs";

// Аналог GET /file/v1/upload-url из боевой среды:
// принимает метаданные файла, возвращает «presigned»-ссылку + поля для multipart-формы.
export async function POST(req: Request) {
  let body: { name?: string; size?: number; contentType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, size, contentType } = body;
  if (!name || typeof size !== "number" || !contentType) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }
  if (size > MAX_SIZE) {
    return NextResponse.json({ error: "too_large", maxBytes: MAX_SIZE }, { status: 413 });
  }

  const id = newUploadId();
  const ym = new Date().toISOString().slice(0, 7).replace("-", "/");
  const key = `uploads/${ym}/${id}.${extFromType(contentType)}`;

  uploads.set(id, {
    id,
    name,
    size,
    contentType,
    key,
    status: "initiated",
    receivedBytes: 0,
  });

  return NextResponse.json({
    url: `/api/upload/put/${id}`,
    file_id: id,
    fields: {
      key,
    },
  });
}
