# Cấu hình

Customize Dạ Hành AG behavior with configuration options.

## Project Configuration

Located at `.dahanh/config.json`:

```json
{
  "project": "my-project",
  "version": "1.0.0"
}
```

### Options

| Key | Type | Description |
|-----|------|-------------|
| `project` | string | Project name |
| `version` | string | Config version |
| `defaultAssignee` | string | Default assignee for new tasks |
| `defaultPriority` | string | Default priority (`low`, `medium`, `high`) |
| `defaultLabels` | string[] | Default labels for new tasks |
| `timeFormat` | string | Time format (`12h` or `24h`) |
| `gitTrackingMode` | string | Chế độ theo dõi Git (`git-tracked` or `git-ignored`) |

## Project Structure

After `dahanh init`, your project contains:

```
.dahanh/
├── config.json       # Project configuration
├── tasks/            # Task markdown files
│   ├── task-1 - First Task.md
│   └── task-2 - Second Task.md
└── docs/             # Documentation
    ├── patterns/
    ├── architecture/
    └── guides/
```

### Task Files

Each task is a markdown file with frontmatter:

```markdown
---
id: "42"
title: "Add authentication"
status: "đang làm"
priority: "high"
assignee: "@john"
labels: ["feature", "auth"]
createdAt: "2025-01-15T10:00:00Z"
updatedAt: "2025-01-15T14:30:00Z"
---

## Description

Implement JWT authentication...

## Acceptance Criteria

- [x] User can login
- [ ] JWT token returned

## Implementation Plan

1. Research patterns
2. Implement

## Implementation Notes

Completed login endpoint.
```

### Document Files

Each document is a markdown file with frontmatter:

```markdown
---
title: "Auth Pattern"
description: "JWT authentication pattern"
tags: ["patterns", "security"]
createdAt: "2025-01-10T09:00:00Z"
updatedAt: "2025-01-12T16:00:00Z"
---

# Auth Pattern

This document describes our authentication pattern...
```

## Init Wizard

When running `dahanh init`, an interactive wizard guides you through setup:

```
🚀 Dạ Hành AG Project Setup Wizard
   Configure your project settings

? Project name: my-project
? Chế độ theo dõi Git: Git Tracked (recommended for teams)
? AI Guidelines type: CLI
? Select AI agent files to create/update:
  ◉ CLAUDE.md (Claude Code)
  ◉ AGENTS.md (Agent SDK)
```

| Option | Description |
|--------|-------------|
| **Project name** | Name stored in config.json |
| **Chế độ theo dõi Git** | `git-tracked` (default) or `git-ignored` |
| **AI Guidelines type** | `CLI` (commands) or `MCP` (tools) |
| **Agent files** | Which instruction files to create |

**When MCP is selected:**
- Creates `.mcp.json` for Claude Code auto-discovery

**Skip wizard:**
```bash
dahanh init my-project --no-wizard  # Use defaults
```

## Git Integration

Dạ Hành AG supports two git tracking modes, selected during `dahanh init`:

### Git Tracking Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `git-tracked` | All `.dahanh/` files tracked in git | Teams, shared context |
| `git-ignored` | Only docs tracked, tasks/config ignored | Personal use |

### Git-Tracked Mode (Default)

The entire `.dahanh/` folder is committed to git:

```bash
git add .dahanh/
git commit -m "Add project knowledge base"
```

**Benefits:**
- Share tasks and docs with team
- Version history for all changes
- Code review includes task updates

### Git-Ignored Mode

Only documentation is tracked. During init, Dạ Hành AG automatically adds to `.gitignore`:

```gitignore
# dahanh (ignore all except docs)
.dahanh/*
!.dahanh/docs/
!.dahanh/docs/**
```

**Benefits:**
- Personal task tracking without cluttering team repo
- Docs still shareable with team
- No merge conflicts on tasks

### .gitignore (Optional)

You may want to ignore certain files regardless of mode:

```gitignore
# Ignore time tracking state (optional)
.dahanh/.timer
```

## Configuration Commands

Manage project configuration via CLI:

```bash
# Get a config value
dahanh config get defaultAssignee --plain

# Set a config value
dahanh config set defaultAssignee "@john"

# List all config
dahanh config list
```

## AI Agent Guidelines

Dạ Hành AG provides on-demand guidelines and instruction file sync:

```bash
# Output guidelines to stdout (AI agents call this at session start)
dahanh agents guideline

# Interactive mode - select type, variant, and files
dahanh agents

# Quick sync with full embedded guidelines (~26KB)
dahanh agents sync

# Sync with minimal instruction only (~1KB)
dahanh agents sync --minimal

# Sync all files with MCP guidelines
dahanh agents sync --type mcp --all
```

**Supported files:**
- `CLAUDE.md` - For Claude Code (default)
- `AGENTS.md` - For Agent SDK (default)
- `GEMINI.md` - For Google Gemini
- `.github/copilot-instructions.md` - For GitHub Copilot

**Template variants:**
- `general` (default): Full guidelines embedded in file
- `instruction` (`--minimal`): Minimal - tells AI to call `dahanh agents guideline`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `KNOWNS_PORT` | Default port for `dahanh browser` |

## Defaults

| Setting | Default |
|---------|---------|
| Web UI port | 6420 |
| Task priority | medium |
| Task status | todo |
