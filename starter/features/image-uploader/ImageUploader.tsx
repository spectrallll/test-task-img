"use client";

import { useRef } from "react";

// Работайте в этой директории (`features/image-uploader`).
// Файл намеренно минимальный — структуру и подкомпоненты придумайте сами.
//
// На странице `app/page.tsx` уже отрисован `<ImageUploader />`.
// Mock-API лежит в `app/api/upload/*` — менять его не нужно.

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    // TODO: реализуйте загрузку.
    // Подсказки:
    // - принимать только jpg/jpeg/png/webp
    // - не более 3 параллельных загрузок, остальные ждут
    // - для каждого файла: POST /api/upload/init → POST /api/upload/put/:id (multipart)
    //   → POST /api/upload/confirm → GET /api/upload/preview/:id
    // - превью успешно загруженных рисуйте в блоке ниже
    console.log("selected files", files);
  };

  return (
    <div className="space-y-6">
      <div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
          className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      {/* Сюда выводите карточки/превью. Вёрстку и сам компонент карточки — на ваше усмотрение. */}
      <div
        data-testid="image-uploader-list"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      >
        {/* TODO: отрисовать загруженные / загружающиеся изображения */}
      </div>
    </div>
  );
};
