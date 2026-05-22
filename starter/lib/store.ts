
type UploadRecord = {
  id: string;
  name: string;
  size: number;
  contentType: string;
  key: string;
  status: "initiated" | "uploaded" | "confirmed";
  receivedBytes: number;
  data?: Buffer;
};

declare global {
  // eslint-disable-next-line no-var
  var __uploadStore: Map<string, UploadRecord> | undefined;
}

export const uploads: Map<string, UploadRecord> =
  globalThis.__uploadStore ?? (globalThis.__uploadStore = new Map());

export const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
export const MAX_SIZE = 10 * 1024 * 1024;

export function newUploadId(): string {
  return "u_" + Math.random().toString(36).slice(2, 10);
}

export function extFromType(t: string): string {
  if (t === "image/jpeg") return "jpg";
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  return "bin";
}
