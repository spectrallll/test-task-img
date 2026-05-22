import { NextResponse } from "next/server";
import { uploads } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const rec = uploads.get(params.id);
  if (!rec) return NextResponse.json({ error: "unknown_upload" }, { status: 404 });
  if (rec.status !== "confirmed") {
    return NextResponse.json({ error: "not_confirmed" }, { status: 409 });
  }

  // small delay so "fetching preview…" state is visible
  await new Promise((r) => setTimeout(r, 200));

  if (rec.data && rec.data.length > 0) {
    const base64 = rec.data.toString("base64");
    return NextResponse.json({
      previewUrl: `data:${rec.contentType};base64,${base64}`,
    });
  }

  // fallback placeholder (shouldn't happen normally)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#888"/><text x="50%" y="50%" fill="#fff" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="14">${rec.name}</text></svg>`;
  const base64 = Buffer.from(svg).toString("base64");
  return NextResponse.json({ previewUrl: `data:image/svg+xml;base64,${base64}` });
}
