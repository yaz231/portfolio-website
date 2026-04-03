# Claude Instructions

## How to Orient Yourself in This Project

Before responding to ANY request, do the following in order:

1. **Read `.claude/docs/file-map.md`** — this is your index. It tells you exactly which file owns which feature, route, model, or function.
2. **Read `.claude/docs/architecture.md`** — understand the system design and data flow before suggesting changes.
3. **Do NOT ask the user to provide file contents** — you have GitHub access. Use the file-map to identify the exact file(s), then read them directly.

---

## Rules for Every Change

> **Before writing any code, update the docs first.**

When making any change:

1. Identify the affected files using `file-map.md`
2. Update `file-map.md` if you're adding, removing, or significantly changing a file's responsibility
3. Update `architecture.md` if the change affects data flow, new dependencies, or system structure
4. Then make the code change

This keeps the docs accurate so future sessions are just as fast.

---

## Project Conventions

- **Languages**: Python, Next.js (TypeScript), Swift
- **Deployment**: Vercel (Next.js), GitHub as source of truth
- **Infra**: See `architecture.md` for per-project specifics

---

## What the User Expects From You

- **Never ask "can you share the file?"** — find it yourself via the file-map + GitHub connector
- **Never regurgitate full files** — tell the user what to change, where, and why
- **Be specific**: "In `src/app/api/auth/route.ts`, line ~42, change X to Y because Z"
- Keep responses concise. The user is technical and experienced.

---

## Bootstrapping a New Project

If `.claude/docs/` does not exist in this project yet, tell the user:

> "I don't see `.claude/docs/` in this repo. Run `python generate_claude_docs.py` from the project root to generate the initial file map, then come back."
