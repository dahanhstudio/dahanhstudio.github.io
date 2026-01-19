---
title: AI Agent Quick Reference
createdAt: '2025-12-31T11:45:09.512Z'
updatedAt: '2026-01-11T08:59:19.311Z'
description: Condensed guidelines for Gemini 2.5 Flash AI agents
tags:
  - ai
  - guidelines
  - gemini
---
# AI Agent Quick Reference

Quick reference for AI agents using Dạ Hành AG CLI/MCP.

## First Step

Get the guidelines:

```bash
# CLI - Full guidelines (default)
dahanh agents guideline

# CLI - Compact (core + mistakes only)
dahanh agents guideline --compact

# CLI - Stage-specific
dahanh agents guideline --stage execution

# MCP
mcp__dahanh__get_guideline({})
```

## Modular Guidelines

| Section | CLI Flag | Description |
|---------|----------|-------------|
| Core Rules | `--core` | Must-follow principles |
| Commands | `--commands` | CLI/MCP reference |
| Workflow Creation | `--stage creation` | Creating tasks |
| Workflow Execution | `--stage execution` | Implementing |
| Workflow Completion | `--stage completion` | Finishing tasks |
| Common Mistakes | `--mistakes` | Anti-patterns |

## Critical Rules

| Rule | Description |
|------|-------------|
| **Never Edit .md** | Use CLI/MCP tools only |
| **Docs First** | Read docs BEFORE coding |
| **Time Tracking** | Always start/stop timer |
| **--plain Flag** | Only for view/list/search |
| **--ac not -a** | Use `--ac` for acceptance criteria |

## Flag Confusion Warning

| Flag | In `task create/edit` | In `doc edit` |
|------|----------------------|---------------|
| `-a` | Assignee | Append content |
| `--ac` | Acceptance criteria | N/A |

```bash
# ✅ Correct - add acceptance criteria
dahanh task edit 42 --ac "User can login"

# ❌ Wrong - this sets assignee!
dahanh task edit 42 -a "User can login"
```

## Quick Commands

### Tasks

```bash
dahanh task <id> --plain              # View
dahanh task list --plain              # List
dahanh task edit <id> -s in-progress  # Update status
dahanh task edit <id> --ac "Criterion" # Add AC
dahanh task edit <id> --check-ac 1    # Check AC
dahanh time start <id>                # Start timer
dahanh time stop                      # Stop timer
```

### Docs

```bash
dahanh doc list --plain               # List
dahanh doc "path" --plain             # View
dahanh search "query" --plain         # Search
```

## Task ID Format

Use raw ID only:

```bash
# ✅ Correct
dahanh task create "Title" --parent 48
dahanh task create "Title" --parent qkh5ne

# ❌ Wrong
dahanh task create "Title" --parent task-48
```

## Status Values

`todo` | `in-progress` | `in-review` | `blocked` | `done`

## Priority Values

`low` | `medium` | `high`
