# AI Agent Workflow

Guide for AI assistants working with Dạ Hành AG.

## Core Principles

### 1. CLI-Only Operations

**NEVER edit .md files directly.** Always use CLI commands:

```bash
# Correct
dahanh task edit 42 --check-ac 1

# Wrong
# Editing .dahanh/tasks/task-42.md directly
```

### 2. Documentation-First

**ALWAYS read documentation BEFORE planning or coding:**

```bash
dahanh doc list --plain
dahanh doc "patterns/auth" --plain
```

### 3. Always Use --plain

**ALWAYS use `--plain` flag for AI-readable output:**

```bash
dahanh task 42 --plain
dahanh doc list --plain
dahanh search "auth" --plain
```

### 4. Large Document Handling

**For large documents (>2000 tokens), use 3-step workflow:**

```bash
# Step 1: Check size first
dahanh doc "README" --info --plain
# Output: Size: 42,461 chars (~12,132 tokens) | Headings: 83

# Step 2: Get table of contents (if >2000 tokens)
dahanh doc "README" --toc --plain

# Step 3: Read specific section only
dahanh doc "README" --section "2. Installation" --plain

# Edit specific section (no need to read entire doc!)
dahanh doc edit "README" --section "2" -c "New content"
```

This reduces context usage significantly.

## Session Initialization

When starting a new session:

```bash
# 1. List all documentation
dahanh doc list --plain

# 2. Read essential docs
dahanh doc "README" --plain
dahanh doc "ARCHITECTURE" --plain

# 3. Review current tasks
dahanh task list --plain
dahanh task list --status in-progress --plain
```

## Taking a Task

### Step 1: Read the task

```bash
dahanh task 42 --plain              # Shorthand
dahanh task view 42 --plain         # Full command
```

### Step 2: Follow ALL references

If the task contains `@doc/patterns/auth`:

```bash
dahanh doc "patterns/auth" --plain  # Shorthand
```

If it contains `@task-38`:

```bash
dahanh task 38 --plain              # Shorthand
```

### Step 3: Search for related docs

```bash
dahanh search "authentication" --type doc --plain
```

### Step 4: Check similar completed tasks

```bash
dahanh search "auth" --type task --status done --plain
```

### Step 5: Take the task

```bash
dahanh task edit 42 -s in-progress -a @me
dahanh time start 42
```

## Planning

### Create implementation plan

```bash
dahanh task edit 42 --plan $'1. Review @doc/patterns/auth
2. Implement login endpoint
3. Add JWT token generation
4. Write unit tests
5. Update documentation'
```

**Important:** Share plan with user and WAIT for approval before coding.

## Implementing

### Check criteria as you complete them

```bash
dahanh task edit 42 --check-ac 1
dahanh task edit 42 --append-notes "Implemented login endpoint"

dahanh task edit 42 --check-ac 2
dahanh task edit 42 --append-notes "JWT generation working"
```

## Completing

### Add implementation notes

```bash
dahanh task edit 42 --notes $'## Summary
Implemented JWT authentication.

## Changes
- Added login endpoint
- Added token generation

## Tests
- 10 unit tests added'
```

### Stop timer and complete

```bash
dahanh time stop
dahanh task edit 42 -s done
```

## Reference Resolution

When you see references in task output:

| You see                  | Command to run                       |
| ------------------------ | ------------------------------------ |
| `@task-38`               | `dahanh task 38 --plain`             |
| `@doc/patterns/auth`     | `dahanh doc "patterns/auth" --plain` |

## Context Checklist

Before writing ANY code:

- [ ] Have I read all `@doc/...` references in the task?
- [ ] Have I checked all `@task-...` references?
- [ ] Have I searched for related documentation?
- [ ] Have I reviewed similar completed tasks?
- [ ] Do I understand the project's patterns?
- [ ] Have I shared my plan and received approval?

## Common Mistakes

| Wrong                          | Right                       |
| ------------------------------ | --------------------------- |
| Edit .md files directly        | Use `dahanh task edit`      |
| Skip reading docs              | Read ALL related docs first |
| Forget `--plain` flag          | Always use `--plain`        |
| Code before plan approval      | Wait for approval           |
| Mark done without all criteria | Check ALL criteria first    |

## Quick Reference

```bash
# Initialize context
dahanh doc list --plain
dahanh doc "README" --plain

# Take task
dahanh task 42 --plain
dahanh task edit 42 -s in-progress -a @me
dahanh time start 42

# Work
dahanh task edit 42 --plan "1. Step\n2. Step"
dahanh task edit 42 --check-ac 1
dahanh task edit 42 --append-notes "Progress"

# Complete
dahanh task edit 42 --notes "Summary"
dahanh time stop
dahanh task edit 42 -s done
```

## Guidelines System

Dạ Hành AG provides **modular guidelines** that AI agents can request at session start.

### Modular Structure

Guidelines are organized into focused sections:

| Section                 | Description                          |
| ----------------------- | ------------------------------------ |
| **Core Rules**          | Golden rules, must-follow principles |
| **Commands Reference**  | CLI/MCP commands quick reference     |
| **Workflow Creation**   | Task creation workflow               |
| **Workflow Execution**  | Task execution workflow              |
| **Workflow Completion** | Task completion workflow             |
| **Common Mistakes**     | Anti-patterns and DO vs DON'T        |

### Getting Guidelines

```bash
# Full guidelines (all sections) - default
dahanh agents guideline

# Compact (core rules + common mistakes only)
dahanh agents guideline --compact

# Stage-specific guidelines
dahanh agents guideline --stage creation    # When creating tasks
dahanh agents guideline --stage execution   # When implementing
dahanh agents guideline --stage completion  # When finishing

# Individual sections
dahanh agents guideline --core       # Core rules only
dahanh agents guideline --commands   # Commands reference
dahanh agents guideline --mistakes   # Common mistakes
```

### MCP Tool

```
mcp__dahanh__get_guideline({})                    # Full guidelines
mcp__dahanh__get_guideline({ type: "unified" })   # Full guidelines
mcp__dahanh__get_guideline({ type: "cli" })       # (Legacy) Same as unified
mcp__dahanh__get_guideline({ type: "mcp" })       # (Legacy) Same as unified
```

### Syncing Instruction Files

Update AI instruction files (CLAUDE.md, AGENTS.md, etc.):

```bash
# Interactive mode - select type, variant, files
dahanh agents

# Quick sync with full embedded guidelines (~26KB)
dahanh agents sync

# Sync with minimal instruction only (~1KB)
dahanh agents sync --minimal

# Sync all files (CLAUDE.md, AGENTS.md, GEMINI.md, Copilot)
dahanh agents sync --all
```

### Template Variants

| Variant                       | Size  | Description                                          |
| ----------------------------- | ----- | ---------------------------------------------------- |
| **general** (default)         | ~26KB | Full modular guidelines embedded in file             |
| **instruction** (`--minimal`) | ~1KB  | Minimal - tells AI to call `dahanh agents guideline` |

The **general** (full) variant is recommended because:

- AI has immediate access to all guidelines
- No extra command execution required
- Works reliably across all AI models
- Ensures consistent behavior from the start
