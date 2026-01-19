# Knowns Project

This project uses **Knowns** for task and documentation management with built-in Claude Code skills.

## Available Skills

Use `/dahanh.<skill>` to invoke workflows:

| Skill | Description |
|-------|-------------|
| `/dahanh.init` | Initialize session - read docs, understand context |
| `/dahanh.task <id>` | Full task workflow - research, plan, implement |
| `/dahanh.task.brainstorm` | Explore solutions before implementation |
| `/dahanh.task.reopen` | Reopen completed task, add requirements |
| `/dahanh.task.extract` | Extract patterns from task to docs |
| `/dahanh.doc` | Work with documentation - view, create, update |
| `/dahanh.commit` | Commit with proper format |
| `/dahanh.research` | Research codebase before coding |

## Getting Started

```bash
# Start a new session
/dahanh.init

# Work on a task
/dahanh.task <task-id>

# Quick commands
dahanh task list --plain
dahanh doc list --plain
dahanh search "query" --plain
```

## Key Principles

1. **Read docs first** - Understand before implementing
2. **Plan before coding** - Wait for approval
3. **Track time** - Always use timer
4. **Ask when blocked** - Don't guess
