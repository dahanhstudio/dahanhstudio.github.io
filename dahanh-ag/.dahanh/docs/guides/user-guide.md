---
title: User Guide
createdAt: '2025-12-29T11:49:48.531Z'
updatedAt: '2026-01-12T11:43:37.177Z'
description: Comprehensive user documentation for Dạ Hành AG CLI and Web UI
tags:
  - docs
  - guide
  - user
---
# Dạ Hành AG User Guide

Complete guide for using Dạ Hành AG - a CLI-first knowledge layer and task management system for development teams.

---

## Getting Started

### Installation

```bash
# Install globally via npm
npm install -g dahanh

# Or via bun
bun add -g dahanh

# Or use npx (no installation)
npx dahanh <command>
```

### Initialize a Project

```bash
dahanh init [project-name]
```

#### Interactive Wizard

The wizard prompts for 4 settings:

```
🚀 Dạ Hành AG Project Setup Wizard
   Configure your project settings

? Project name › my-project
? Chế độ theo dõi Git › Git Tracked (recommended for teams)
? AI Guidelines type › CLI
? Select AI agent files › CLAUDE.md, AGENTS.md

✓ Project initialized: my-project
✓ Created: CLAUDE.md
✓ Created: AGENTS.md

Get started:
  dahanh task create "My first task"
```

#### Wizard Options

| Option | Choices | Description |
|--------|---------|-------------|
| **Project name** | text | Your project name |
| **Chế độ theo dõi Git** | `Git Tracked` / `Git Ignored` | Track all or only docs in git |
| **AI Guidelines type** | `CLI` / `MCP` | CLI commands or MCP tools |
| **AI agent files** | multiselect | Files to update |

#### MCP Mode

When selecting **MCP**, a `.mcp.json` file is auto-created for Claude Code:

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

#### Skip Wizard

```bash
dahanh init my-project --no-wizard
```

### Quick Start

```bash
dahanh task create "Setup project" -d "Initial setup"
dahanh task list
dahanh browser  # Open Web UI
```

---

## CLI Commands

### Task Commands

#### Create Task
```bash
dahanh task create "Title" [options]
```

| Option | Short | Description |
|--------|-------|-------------|
| `--description` | `-d` | Task description |
| `--ac` | | Acceptance criteria (repeatable) |
| `--labels` | `-l` | Comma-separated labels |
| `--priority` | | low / medium / high |
| `--parent` | `-p` | Parent task ID |

**Example:**
```bash
dahanh task create "Add login" -d "User login feature" --ac "Form works" --ac "JWT stored" -l "auth" --priority high
```

#### View Task
```bash
dahanh task <id> --plain
```

#### List Tasks
```bash
dahanh task list --plain
dahanh task list --status in-progress --plain
dahanh task list --tree --plain
```

#### Edit Task
```bash
dahanh task edit <id> -s in-progress
dahanh task edit <id> --check-ac 1
dahanh task edit <id> --append-notes "Progress update"
```

### Documentation Commands

#### Create Doc
```bash
dahanh doc create "Title" -d "Description" -t "tags" -f "folder"
```

#### View Doc
```bash
dahanh doc <path> --plain
```

#### Edit Doc
```bash
dahanh doc edit "name" -c "New content"
dahanh doc edit "name" -a "Appended content"
```

### Time Tracking

```bash
dahanh time start <task-id>  # Start timer
dahanh time stop             # Stop timer
dahanh time pause            # Pause
dahanh time resume           # Resume
dahanh time status           # Check status
dahanh time add <id> 2h      # Manual entry
dahanh time report           # Generate report
```

### Search

```bash
dahanh search "query" --plain
dahanh search "auth" --type task --plain
dahanh search "api" --type doc --plain
```

---

## Web UI

### Start

```bash
dahanh browser
```

Opens `http://localhost:6420` with:
- **Kanban** - Visual task board
- **Tasks** - Table view
- **Docs** - Documentation browser
- **Config** - Settings

### Features

- Drag and drop tasks between columns
- Real-time sync with CLI
- Timer controls in task details
- Keyboard shortcuts (`⌘K` for search)

---

## MCP Integration

### Quick Setup

```bash
# Setup both project and Claude Code
dahanh mcp setup

# Only create .mcp.json
dahanh mcp setup --project

# Only add to Claude Code
dahanh mcp setup --global
```

### Manual Setup (Claude Desktop)

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `create_task` | Tạo việc mới |
| `get_task` | Get task by ID |
| `update_task` | Update task |
| `list_tasks` | List tasks |
| `search_tasks` | Search tasks |
| `list_docs` | List documents |
| `get_doc` | Get document |
| `create_doc` | Create document |
| `update_doc` | Update document |
| `start_time` | Start timer |
| `stop_time` | Stop timer |
| `get_board` | Get kanban board |

### Plain Text Mode

Always use `--plain` for AI agents:
```bash
dahanh task <id> --plain
dahanh doc "path" --plain
```

---

## AI Guidelines

### View Guidelines

```bash
dahanh agents guideline           # Default
dahanh agents guideline --full    # All sections
dahanh agents guideline --compact # Core + mistakes
```

### Sync to Files

```bash
dahanh agents sync                # CLAUDE.md, AGENTS.md
dahanh agents sync --all          # All files
dahanh agents sync --type mcp     # MCP version
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Not initialized" | Run `dahanh init` |
| "Task not found" | Check ID with `dahanh task list --plain` |
| "Timer already running" | Run `dahanh time stop` first |
| Web UI won't start | Try `dahanh browser --port 6421` |

### Help

```bash
dahanh --help
dahanh task --help
```
