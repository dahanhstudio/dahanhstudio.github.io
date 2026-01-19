---
title: Claude Code Skills
createdAt: '2026-01-17T06:06:37.006Z'
updatedAt: '2026-01-17T06:15:17.546Z'
description: Pattern for creating and managing Claude Code skills in Dạ Hành AG CLI
tags:
  - pattern
  - claude-code
  - skills
---
## Overview

Dạ Hành AG CLI integrates with Claude Code skills - workflow templates that can be invoked via `/dahanh.<skill>` commands.

## Skill Structure

```
src/templates/skills/
├── index.ts                    # Export all skills
├── dahanh.task/
│   └── SKILL.md               # Skill content with frontmatter
├── dahanh.task.brainstorm/
│   └── SKILL.md
├── dahanh.doc/
│   └── SKILL.md
└── ...
```

## Naming Convention

- **Folder name**: `dahanh.<domain>` or `dahanh.<domain>.<action>`
- **Examples**: `dahanh.task`, `dahanh.task.brainstorm`, `dahanh.doc`
- **Dot notation** creates clear hierarchy in Claude Code UI

## SKILL.md Format

```yaml
---
name: dahanh.task
description: Execute Dạ Hành AG task workflow
---

# Instructions

...skill content...
```

## Available Skills (8 total)

| Skill | Description |
|-------|-------------|
| `dahanh.task` | Full task workflow (view, take, plan, implement, complete) |
| `dahanh.task.brainstorm` | Brainstorm and create new tasks |
| `dahanh.task.reopen` | Reopen completed task to add requirements |
| `dahanh.task.extract` | Extract knowledge from completed tasks to docs |
| `dahanh.doc` | Create and update documentation |
| `dahanh.commit` | Generate commit message and commit changes |
| `dahanh.init` | Initialize session (read docs, list tasks) |
| `dahanh.research` | Research mode - explore without modifying |

## Sync Commands

```bash
dahanh sync                   # Sync all (skills + agents)
dahanh sync skills            # Sync skills only
dahanh sync skills --force    # Force overwrite
dahanh sync agent             # Sync agent files only
dahanh sync agent --type mcp  # Use MCP guidelines
dahanh sync agent --all       # Include Gemini, Copilot
```

## Implementation Details

### index.ts Pattern

```typescript
import dahanhTaskMd from "./dahanh.task/SKILL.md";

function createSkill(content: string, folderName: string): Skill {
  const { name, description } = parseSkillFrontmatter(content);
  return { name, folderName, description, content };
}

export const SKILL_TASK = createSkill(dahanhTaskMd, "dahanh.task");
```

### Sync Function

Skills are synced to `.claude/skills/<folder-name>/SKILL.md` in the project.

### Commander.js Subcommand Options

When parent command has subcommands, add `.enablePositionalOptions()` for options to be parsed correctly:

```typescript
export const syncCommand = new Command("sync")
  .enablePositionalOptions()  // Required for subcommand options
  .option("-f, --force", "Force overwrite")
  .action(...)
```

## Source Tasks

- @task-4sv3rh - Add skill sync command and change naming to dot notation
- @task-pdyd2e - Add dahanh.task.reopen and dahanh.task.extract skills
- @task-pqyhuh - Merge overlapping skills (13 → 8)
- @task-x4d1yw - Restructure sync commands
