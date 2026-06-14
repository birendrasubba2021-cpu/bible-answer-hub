# Bible Answer Hub — Image folders

Each **article** and **question** gets its **own folder** named after its URL slug.
Photos never mix between topics.

## Articles

```
public/images/articles/
  who-was-abraham-in-the-bible/
    hero.jpg          ← featured banner (admin: Featured image path)
    01-intro.jpg      ← inline in article body
    02-covenant.jpg
  who-was-moses/
    hero.jpg
    01-burning-bush.jpg
```

**Admin paths** (start with `/images/`, not `public/`):

- Featured: `/images/articles/who-was-abraham-in-the-bible/hero.jpg`
- Inline: `![Caption](/images/articles/who-was-abraham-in-the-bible/01-intro.jpg)`

## Questions

```
public/images/questions/
  what-is-the-trinity/
    hero.jpg          ← card + answer page banner
  what-is-speaking-in-tongues/
    hero.jpg
```

**Admin path:** `/images/questions/what-is-the-trinity/hero.jpg`

## After adding files

```bash
git add public/images/
git commit -m "Add images for [article or question name]."
git push
```

## Naming tips

| File | Use |
|------|-----|
| `hero.jpg` | Main photo (required if you use a featured image) |
| `01-…`, `02-…` | Extra photos in order inside long articles |
| Use the **slug** from the URL, not the full title |

Slug example: *Who Was Abraham?* → `who-was-abraham-in-the-bible`
