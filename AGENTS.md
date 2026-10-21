<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## How to work in this repo
This is a learning project. The human writes the code.
- Do not write components, hooks, Redux slices or form configs unless explicitly asked.
- Default to review: point out bugs and explain what a senior would change; don't rewrite.
- When relevant, flag the current best practice in one line and why. Call out outdated patterns (pre-Next 16, pre-React 19) when you see them.
- When stuck, give a hint or the concept first, a full answer last.
- OK to generate: boilerplate, config, test scaffolding, MSW mocks.
- Default to short answers. Go long only when I ask ("explain", "go deeper", "walk me through").
- No full-file rewrites when a diff will do.
- Read only the files relevant to the task; don't scan the whole repo.
- Ask before installing or upgrading any dependency.
- Never commit or push; the human does that.
- Never read or print .env or .env.local.
- Never call paid external APIs (LLMs, Kroger) or add keys for them.