#!/usr/bin/env python3
"""
generate_claude_docs.py

Run from the root of any project to generate/refresh .claude/docs/
Uses the Anthropic API to summarize each file and build a navigable file map.

Usage:
    python generate_claude_docs.py

Requirements:
    pip install anthropic
    export ANTHROPIC_API_KEY=your_key_here
"""

import os
import json
import subprocess
from pathlib import Path
import anthropic

# ── Configuration ─────────────────────────────────────────────────────────────

EXCLUDED_DIRS = {
    "node_modules", ".venv", "venv", "__pycache__", ".git",
    "build", "dist", ".next", ".turbo", "out", "coverage",
    ".pytest_cache", "*.egg-info", ".mypy_cache", "DerivedData",
    ".build",  # Swift
}

EXCLUDED_FILES = {
    ".env", ".env.local", ".env.production", ".env.development",
    ".DS_Store", "package-lock.json", "yarn.lock", "pnpm-lock.yaml",
    "Podfile.lock",
}

EXCLUDED_EXTENSIONS = {
    ".pyc", ".pyo", ".map", ".lock", ".png", ".jpg", ".jpeg",
    ".gif", ".svg", ".ico", ".woff", ".woff2", ".ttf", ".eot",
}

TEST_PATTERNS = {"test_", "_test.", ".test.", ".spec.", "__tests__"}

# File extensions we'll actually summarize
SUMMARIZABLE_EXTENSIONS = {
    ".py", ".ts", ".tsx", ".js", ".jsx", ".swift",
    ".sql", ".sh", ".yaml", ".yml", ".toml", ".json",
    ".md", ".env.example",
}

# Max file size to summarize (bytes) — skip giant files
MAX_FILE_SIZE = 50_000

OUTPUT_DIR = Path(".claude/docs")
FILE_MAP_PATH = OUTPUT_DIR / "file-map.md"
ARCHITECTURE_PATH = OUTPUT_DIR / "architecture.md"

client = anthropic.Anthropic()

# ── Helpers ───────────────────────────────────────────────────────────────────

def is_test_file(path: Path) -> bool:
    name = path.name.lower()
    return any(p in name for p in TEST_PATTERNS) or "__tests__" in str(path)


def should_skip(path: Path) -> bool:
    # Skip excluded dirs anywhere in path
    for part in path.parts:
        if part in EXCLUDED_DIRS or part.endswith(".egg-info"):
            return True
    if path.name in EXCLUDED_FILES:
        return True
    if path.suffix in EXCLUDED_EXTENSIONS:
        return True
    if is_test_file(path):
        return True
    if path.stat().st_size > MAX_FILE_SIZE:
        return True
    return False


def collect_files(root: Path) -> list[Path]:
    files = []
    for p in sorted(root.rglob("*")):
        if p.is_file() and p.suffix in SUMMARIZABLE_EXTENSIONS:
            try:
                rel = p.relative_to(root)
            except ValueError:
                continue
            if not should_skip(rel):
                files.append(p)
    return files


def read_file_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""


def summarize_file(rel_path: str, content: str) -> dict:
    """
    Ask Claude to summarize a single file.
    Returns a dict with keys: purpose, exports, dependencies, notes
    """
    prompt = f"""You are building a code navigation index for a developer project.

Analyze this file and return ONLY valid JSON with these keys:
- "purpose": one sentence describing what this file does
- "exports": list of key functions/classes/components/routes exported or defined (max 8, as strings)
- "dependencies": list of notable internal imports (other project files, not node_modules/stdlib) (as strings)
- "notes": any important patterns, gotchas, or context worth knowing (one sentence, or empty string)

File: {rel_path}

```
{content[:8000]}
```

Return only the JSON object, no markdown fences."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.content[0].text.strip()
    # Strip fences if model adds them anyway
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {
            "purpose": raw[:200],
            "exports": [],
            "dependencies": [],
            "notes": "",
        }


def detect_project_type(root: Path) -> str:
    indicators = []
    if (root / "package.json").exists():
        indicators.append("Next.js/Node")
    if list(root.glob("*.py")) or (root / "requirements.txt").exists() or (root / "pyproject.toml").exists():
        indicators.append("Python")
    if list(root.glob("*.swift")) or list(root.glob("**/*.xcodeproj")):
        indicators.append("Swift/iOS")
    return ", ".join(indicators) if indicators else "Unknown"


def get_git_remote(root: Path) -> str:
    try:
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            cwd=root, capture_output=True, text=True
        )
        return result.stdout.strip()
    except Exception:
        return "unknown"


def build_file_map(summaries: list[tuple[str, dict]]) -> str:
    lines = [
        "# File Map\n",
        "> Auto-generated by `generate_claude_docs.py`. Update this file when adding, removing, or refactoring files.\n",
        "",
    ]

    # Group by top-level directory
    groups: dict[str, list] = {}
    for rel_path, summary in summaries:
        parts = rel_path.split("/")
        group = parts[0] if len(parts) > 1 else "(root)"
        groups.setdefault(group, []).append((rel_path, summary))

    for group, items in sorted(groups.items()):
        lines.append(f"## `{group}/`\n")
        for rel_path, s in items:
            lines.append(f"### `{rel_path}`")
            lines.append(f"**Purpose**: {s.get('purpose', '')}")
            exports = s.get("exports", [])
            if exports:
                lines.append(f"**Key exports**: {', '.join(f'`{e}`' for e in exports)}")
            deps = s.get("dependencies", [])
            if deps:
                lines.append(f"**Depends on**: {', '.join(f'`{d}`' for d in deps)}")
            notes = s.get("notes", "")
            if notes:
                lines.append(f"**Notes**: {notes}")
            lines.append("")

    return "\n".join(lines)


def build_architecture_template(project_name: str, project_type: str, git_remote: str) -> str:
    return f"""# Architecture

> Partially auto-generated. Fill in sections marked with `<!-- TODO -->`.

## Project Overview

- **Name**: {project_name}
- **Type**: {project_type}
- **Repo**: {git_remote}

## Stack

<!-- TODO: fill in specifics -->
| Layer | Technology |
|-------|------------|
| Frontend | <!-- e.g. Next.js 14, App Router --> |
| Backend | <!-- e.g. FastAPI, Next.js API routes --> |
| Database | <!-- e.g. Supabase (Postgres) --> |
| Storage | <!-- e.g. Cloudflare R2 --> |
| Auth | <!-- e.g. Supabase Auth --> |
| Deployment | <!-- e.g. Vercel, Railway --> |

## Data Flow

<!-- TODO: describe the main request/response flow -->
```
User → [entry point] → [service/api] → [database] → response
```

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages and API routes |
| `src/components/` | Shared UI components |
| `src/lib/` | Utilities, clients, helpers |
| `src/types/` | TypeScript type definitions |

<!-- Add/remove rows to match your actual structure -->

## External Services & Env Vars

<!-- TODO: list services and the env var that configures each -->
| Service | Env Var | Purpose |
|---------|---------|---------|
| | | |

## Known Gotchas

<!-- Things that have tripped you up or are non-obvious -->
- <!-- e.g. "Auth middleware runs in edge runtime, can't use Node APIs" -->

## Change Log

<!-- Optional: brief log of major structural changes -->
| Date | Change |
|------|--------|
| {Path(".").resolve().name} init | Initial doc generation |
"""


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    root = Path(".").resolve()
    project_name = root.name
    project_type = detect_project_type(root)
    git_remote = get_git_remote(root)

    print(f"📁 Project: {project_name} ({project_type})")
    print(f"🔗 Remote:  {git_remote}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    files = collect_files(root)
    print(f"\n🔍 Found {len(files)} files to summarize\n")

    summaries = []
    for i, filepath in enumerate(files, 1):
        rel = str(filepath.relative_to(root))
        content = read_file_safe(filepath)
        if not content.strip():
            continue
        print(f"  [{i}/{len(files)}] {rel}")
        summary = summarize_file(rel, content)
        summaries.append((rel, summary))

    # Write file map
    file_map_md = build_file_map(summaries)
    FILE_MAP_PATH.write_text(file_map_md, encoding="utf-8")
    print(f"\n✅ Written: {FILE_MAP_PATH}")

    # Write architecture (only if it doesn't exist — don't overwrite manual edits)
    if not ARCHITECTURE_PATH.exists():
        arch_md = build_architecture_template(project_name, project_type, git_remote)
        ARCHITECTURE_PATH.write_text(arch_md, encoding="utf-8")
        print(f"✅ Written: {ARCHITECTURE_PATH} (template — fill in TODOs)")
    else:
        print(f"⏭️  Skipped: {ARCHITECTURE_PATH} already exists (manual edits preserved)")

    print("\n🎉 Done! Commit .claude/docs/ to your repo.\n")


if __name__ == "__main__":
    main()
