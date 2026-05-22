import { ImageUploader } from "@/features/image-uploader";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Загрузка изображений</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Тестовое задание. JPG, PNG, WEBP, до 10 МБ. Параллельно загружается не больше трёх файлов.
        </p>
      </header>

      <ImageUploader />
    </main>
  );
}
