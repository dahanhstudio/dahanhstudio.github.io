---
title: Dạ Hành AG CLI Guide
createdAt: '2025-12-26T19:43:25.470Z'
updatedAt: '2026-01-15T09:54:09.403Z'
description: Complete guide for using Dạ Hành AG CLI
tags:
  - guide
  - cli
  - tutorial
---
# Dạ Hành AG CLI Guide

Dạ Hành AG is a CLI tool for managing tasks, documentation, and time tracking for development teams.

## Installation

```bash
# Install globally via npm
npm install -g dahanh

# Or via bun
bun add -g dahanh

# Or use npx (no installation)
npx dahanh <command>
```

## Initialize Project

```bash
dahanh init [project-name]
```

### Interactive Wizard

When running without a name, the wizard prompts for:

```
🚀 Dạ Hành AG Project Setup Wizard
   Configure your project settings

? Project name › my-project
? Chế độ theo dõi Git › Git Tracked (recommended for teams)
? AI Guidelines type › CLI / MCP
? Select AI agent files › CLAUDE.md, AGENTS.md
```

**Example session:**
```
$ dahanh init

🚀 Dạ Hành AG Project Setup Wizard
   Configure your project settings

? Project name › my-app
? Chế độ theo dõi Git › Git Tracked (recommended for teams)
? AI Guidelines type › MCP
? Select AI agent files › CLAUDE.md, AGENTS.md

✓ Created .mcp.json for Claude Code MCP auto-discovery
✓ Project initialized: my-app
✓ Created: CLAUDE.md
✓ Created: AGENTS.md

Get started:
  dahanh task create "My first task"
```

### Wizard Options

| Option | Description |
|--------|-------------|
| **Project name** | Name of your project |
| **Chế độ theo dõi Git** | `git-tracked` (team) or `git-ignored` (personal) |
| **AI Guidelines type** | `CLI` (commands) or `MCP` (MCP tools) |
| **AI agent files** | Files to update with guidelines |

### Quick Init (Non-Interactive)

```bash
dahanh init my-project --no-wizard
```

### MCP Auto-Setup

When selecting **MCP** in the wizard, a `.mcp.json` file is automatically created:

```json
{
  "mcpServers": {
    "dahanh": {
      "command": "npx",
      "args": ["-y", "dahanh", "mcp"]
    }
  }
}
```

This enables Claude Code to auto-discover the MCP server.

---

## MCP Setup

### Quick Setup

```bash
# Setup both project (.mcp.json) and Claude Code globally
dahanh mcp setup

# Only create .mcp.json in project
dahanh mcp setup --project

# Only add to Claude Code globally
dahanh mcp setup --global
```

### Manual MCP Server Start

```bash
dahanh mcp           # Start MCP server
dahanh mcp --verbose # With debug logging
dahanh mcp --info    # Show config instructions
```

---

## Quản lý Task

### Create Task

```bash
dahanh task create "Title" -d "Description" --ac "Criterion 1" --ac "Criterion 2"
```

**Options:**
- `-d, --description` - Task description
- `--ac` - Acceptance criteria (repeatable)
- `-l, --labels` - Labels (comma-separated)
- `--priority` - low | medium | high
- `-p, --parent` - Parent task ID

### View Task

```bash
dahanh task <id> --plain       # Shorthand
dahanh task view <id> --plain  # Full command
```

### List Tasks

```bash
dahanh task list --plain
dahanh task list --status in-progress --plain
dahanh task list --tree --plain
```

### Edit Task

```bash
# Metadata
dahanh task edit <id> -t "New title"
dahanh task edit <id> -s in-progress

# Acceptance Criteria
dahanh task edit <id> --ac "New criterion"
dahanh task edit <id> --check-ac 1
dahanh task edit <id> --uncheck-ac 1

# Plan & Notes  
dahanh task edit <id> --plan "1. Step 1
2. Step 2"
dahanh task edit <id> --notes "Summary"
dahanh task edit <id> --append-notes "Progress"
```

---

## Documentation

### Create Doc

```bash
dahanh doc create "Title" -d "Description" -t "tags" -f "folder/path"
```

### View Doc

```bash
dahanh doc <path> --plain           # Shorthand
dahanh doc view "folder/doc" --plain
```

### Edit Doc

```bash
dahanh doc edit "doc-name" -c "New content"
dahanh doc edit "doc-name" -a "Appended content"
```

### List Docs

```bash
dahanh doc list --plain
dahanh doc list --tag guide --plain
```

---

## Theo dõi thời gian

### Timer

```bash
dahanh time start <task-id>
dahanh time stop
dahanh time pause
dahanh time resume
dahanh time status
```

### Manual Entry

```bash
dahanh time add <task-id> 2h -n "Note"
```

### Reports

```bash
dahanh time report --from "2025-12-01" --to "2025-12-31"
```

---

## Search

```bash
dahanh search "query" --plain
dahanh search "auth" --type task --plain
dahanh search "patterns" --type doc --plain
```

---

## Reference System

| Type | Format | Example |
|------|--------|---------|
| Task | `@task-<id>` | `@task-42` |
| Doc | `@doc/<path>` | `@doc/patterns/module` |

---

## Status & Priority

| Status | Description |
|--------|-------------|
| `todo` | Not started |
| `in-progress` | Currently working |
| `in-review` | In code review |
| `blocked` | Waiting on dependency |
| `done` | Completed |

| Priority | Description |
|----------|-------------|
| `low` | Nice-to-have |
| `medium` | Normal (default) |
| `high` | Urgent |

---

## AI Agent Instructions

### View Guidelines

```bash
dahanh agents guideline           # Default guidelines
dahanh agents guideline --full    # All sections
dahanh agents guideline --compact # Core rules only
```

### Sync to Files

```bash
dahanh agents sync                # CLAUDE.md, AGENTS.md
dahanh agents sync --all          # All supported files
dahanh agents sync --type mcp     # MCP guidelines
```

### Large Documents

For large documents, use the 3-step workflow:

```bash
# Step 1: Check size
dahanh doc <path> --info --plain

# Step 2: Get TOC (if >2000 tokens)
dahanh doc <path> --toc --plain

# Step 3: Read section
dahanh doc <path> --section "2" --plain
```
