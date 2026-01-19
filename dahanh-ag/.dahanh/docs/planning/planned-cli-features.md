---
title: Planned CLI Features
createdAt: '2025-12-31T11:33:41.325Z'
updatedAt: '2026-01-03T22:12:48.770Z'
description: Planned features for Dạ Hành AG CLI enhancements
tags:
  - planning
  - features
  - roadmap
---
# Planned CLI Features

Roadmap for Dạ Hành AG CLI enhancements to improve AI agent compatibility and data integrity.

## ✅ IMPLEMENTED

### Text Manipulation Commands (Task #46)

* `dahanh doc search-in "name" "query"` - Search within doc

* `dahanh doc replace "name" "old" "new"` - Replace text

* `dahanh doc replace-section "name" "## Header" "content"` - Replace section

### Validate & Repair Commands (Task #47)

* `dahanh doc validate "name"` / `dahanh doc repair "name"`

* `dahanh task validate <id>` / `dahanh task repair <id>`

* Graceful skip + warning for corrupted files

### File Input Options (Task #45)

* `dahanh doc edit "name" --content-file ./file.md`

* `dahanh doc edit "name" --append-file ./file.md`

### Condensed Guidelines (Task #44)

* Created gemini-agent-guidelines.md for smaller context windows

### Doc List Path Filter

* `dahanh doc list "guides/"` - Filter by folder

### Agents Sync Command

* `dahanh agents sync` - Quick sync of instruction files

* `dahanh agents sync --all` - Include all files

## PLANNED (Future)

### --stdin option

Read from stdin for piping.

```bash
cat content.md | dahanh doc edit "name" -c --stdin
```

### doc diff / doc history

Show changes and history (requires git).

```bash
dahanh doc diff "name"
dahanh doc history "name" --limit 10
```

### validate-all / repair-all

Batch validation and repair.

```bash
dahanh validate-all
dahanh repair-all
```

### export/import

Export/import for backup or migration.

```bash
dahanh export --output backup.json
dahanh import backup.json
```

### Template System (v0.3+)

* 2x2 matrix: type (cli/mcp) × variant (general/gemini)

* `dahanh agents sync --gemini` - Compact variant

* `dahanh agents sync --type mcp` - MCP guidelines

* Interactive mode with type/variant selection

* Templates in `src/templates/{cli,mcp}/{general,gemini}.md`

#36

gemini-agent-guidelines

@task-37
