# Simple Magazine Content Editing

Content is managed in just two JSON files:

- `data/articles.json` — every article and its full article content.
- `data/magazines.json` — every magazine issue, issue description, highlights, and magazine-page content.

## Inline article image

Add an object inside an article's `content` array wherever the image should appear:

```json
{
  "type": "image",
  "src": "/images/articles/my-image.jpg",
  "alt": "Description of the image",
  "caption": "Optional image caption"
}
```

Place the image file under `public/images/articles/` and use its public path, for example `/images/articles/my-image.jpg`. Article content supports `paragraph`, `heading`, `quote`, and `image` blocks.

## Magazine page content

Each magazine object in `data/magazines.json` supports a `content` array using the same block types. Put inline images under `public/images/covers/` or another folder under `public/images/`, and set `src` to the public path. The magazine cover remains configured separately in `coverImage`.

Keep JSON valid: use double quotes, commas between fields/items, and no trailing comma after the last item.
