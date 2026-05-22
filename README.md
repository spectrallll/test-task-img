# Тестовое: загрузка изображений

## Что есть

Заготовка на **Next.js + TypeScript + Tailwind** в `starter/`. Внутри — моковый API, который имитирует S3-подобный flow в три шага.

Работайте в `starter/features/image-uploader/` — там лежит пустой каркас `ImageUploader.tsx`. На странице он уже подключён.

## Запуск

```bash
cd starter
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Задача

Реализовать мульти-загрузку картинок:

1. `<input type="file" multiple>` (уже есть в каркасе) — выбор нескольких файлов.
2. Принимать только `.jpg`, `.jpeg`, `.png`, `.webp`. Остальное игнорировать.
3. Грузить **не более 3 файлов одновременно**, остальные ждут в очереди.
4. На время загрузки показывать любой лоадер (спиннер, заглушка, плейсхолдер — на ваш вкус).
5. После успешной загрузки отрисовать превью картинки в сетке ниже.

Карточку превью и её стиль придумайте сами — это часть задачи.

## API (моки)

Один файл проходит **три запроса**, как делают на «настоящих» S3-подобных сервисах:

### 1. `POST /api/upload/init`

Запросить ссылку для загрузки.

```jsonc
// request
{ "name": "photo.jpg", "size": 12345, "contentType": "image/jpeg" }

// response 200
{
  "url": "/api/upload/put/u_xxx",
  "file_id": "u_xxx",
  "key": "uploads/2026/05/u_xxx.jpg"
}
```

Ошибки: `400` — неподдерживаемый тип, `413` — больше 10 МБ.

### 2. `PUT {url}` (raw body, как S3 presigned PUT)

Залить файл по полученной ссылке. Тело — содержимое самого файла, заголовок `Content-Type` соответствует MIME файла.

### 3. `POST /api/upload/confirm`

```jsonc
// request
{ "id": "u_xxx" }
// response 200
{ "ok": true }
```

### 4. `GET /api/upload/preview/{id}`

Получить data-URL картинки для отрисовки.

```jsonc
// response 200
{ "previewUrl": "data:image/jpeg;base64,..." }
```
