---
title: AI Agent Tips
createdAt: '2025-12-31T11:25:59.296Z'
updatedAt: '2026-01-15T09:57:24.323Z'
description: Tips and workarounds for AI agents using Dạ Hành AG CLI
tags:
  - ai
  - guidelines
  - tips
---
# AI Agent Tips

Tips and workarounds for AI agents using Dạ Hành AG CLI across different platforms and models.

## Getting Started

Before working on any task, get the guidelines:

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

## Modular Guidelines Structure

Guidelines are organized into focused sections:

| Section | Description |
|---------|-------------|
| **Core Rules** | Golden rules, must-follow principles |
| **Commands Reference** | CLI/MCP commands quick reference |
| **Workflow Creation** | Task creation workflow |
| **Workflow Execution** | Task execution workflow |
| **Workflow Completion** | Task completion workflow |
| **Common Mistakes** | Anti-patterns and DO vs DON'T |

## Windows Command Line Limit

### Problem

Windows has ~8191 character limit for command line. Long content with `dahanh doc edit -c "..."` will fail.

### Workaround 1: Append in chunks

Instead of one long command, split content and append:

```bash
# 1. Create or reset with short content
dahanh doc edit "doc-name" -c "## Overview

Short intro here."

# 2. Append each section separately
dahanh doc edit "doc-name" -a "## Section 1

Content for section 1..."
dahanh doc edit "doc-name" -a "## Section 2

Content for section 2..."
```

Each append adds a newline automatically.

### Workaround 2: Use file-based options

```bash
# Replace content with file contents
dahanh doc edit "doc-name" --content-file ./new-content.md

# Append file contents
dahanh doc edit "doc-name" --append-file ./additional-section.md
```

## Common Flag Confusion

### `-a` vs `--ac`

**CRITICAL**: The `-a` flag means different things in different commands!

| Command | `-a` means | To add acceptance criteria |
|---------|------------|---------------------------|
| `task create` | Assignee | Use `--ac` |
| `task edit` | Assignee | Use `--ac` |
| `doc edit` | Append content | N/A |

**Wrong:**
```bash
# This sets ASSIGNEE, not acceptance criteria!
dahanh task edit 42 -a "User can login"
```

**Correct:**
```bash
# Use --ac for acceptance criteria
dahanh task edit 42 --ac "User can login"

# Use -a for assignee
dahanh task edit 42 -a @me
```

## Multi-line Input

### Bash / Zsh

```bash
dahanh task edit 42 --plan $'1. Step one
2. Step two
3. Step three'
```

### PowerShell

```powershell
dahanh task edit 42 --plan "1. Step one`n2. Step two`n3. Step three"
```

### Using heredoc (for long content)

```bash
dahanh task edit 42 --plan "$(cat <<EOF
1. Research existing patterns
2. Design solution
3. Implement
4. Write tests
5. Update documentation
EOF
)"
```

## MCP vs CLI Guidelines

Both CLI and MCP now use the same **unified modular guidelines**. The `--cli` and `--mcp` flags are legacy and return the same content.

For MCP:
```
mcp__dahanh__get_guideline({})    # Full guidelines
```

## Reading Large Documents

For large documents (>2000 tokens), use the 3-step workflow:

```bash
# Step 1: Check size first
dahanh doc <path> --info --plain
# Shows: chars, tokens, headings, recommendation

# Step 2: Get table of contents (if >2000 tokens)
dahanh doc <path> --toc --plain

# Step 3: Read specific section
dahanh doc <path> --section "2" --plain
# Or by title: --section "Installation"
```

### MCP Equivalent

```json
// Step 1: Check size
{ "path": "<path>", "info": true }

// Step 2: Get TOC
{ "path": "<path>", "toc": true }

// Step 3: Read section
{ "path": "<path>", "section": "2" }
```

### When to Use

| Tokens | Action |
|--------|--------|
| <2000 | Read directly with `--plain` |
| >2000 | Use `--info` → `--toc` → `--section` |
| Edit | Use `--section` with `-c` to replace only one section |
