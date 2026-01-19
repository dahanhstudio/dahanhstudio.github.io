---
name: dahanh.doc
description: Use when working with Knowns documentation - viewing, searching, creating, or updating docs
---

# Working with Documentation

Navigate, create, and update Knowns project documentation.

**Announce at start:** "I'm using the dahanh.doc skill to work with documentation."

**Core principle:** SEARCH BEFORE CREATING - avoid duplicates.

## Quick Reference

```bash
# List all docs
dahanh doc list --plain

# View doc (auto-handles large docs)
dahanh doc "<path>" --plain --smart

# Search docs
dahanh search "<query>" --type doc --plain

# Create doc
dahanh doc create "<title>" -d "<description>" -t "tags" -f "folder"

# Update doc
dahanh doc edit "<path>" -c "content"      # Replace
dahanh doc edit "<path>" -a "content"      # Append
dahanh doc edit "<path>" --section "2" -c "content"  # Section only
```

## Reading Documents

**Always use `--smart` flag:**

```bash
dahanh doc "<path>" --plain --smart
```

- Small doc (≤2000 tokens) → full content
- Large doc → stats + TOC, then use `--section`

## Creating Documents

### Step 1: Search First

```bash
dahanh search "<topic>" --type doc --plain
```

**Don't duplicate.** Update existing docs when possible.

### Step 2: Choose Location

| Doc Type | Location | Flag |
|----------|----------|------|
| Core (README, ARCH) | Root | No `-f` |
| Guide | `guides/` | `-f "guides"` |
| Pattern | `patterns/` | `-f "patterns"` |
| API doc | `api/` | `-f "api"` |

### Step 3: Create

```bash
dahanh doc create "<title>" \
  -d "<brief description>" \
  -t "tag1,tag2" \
  -f "folder"  # optional
```

### Step 4: Add Content

```bash
dahanh doc edit "<path>" -c "$(cat <<'EOF'
# Title

## 1. Overview
What this doc covers.

## 2. Details
Main content.

## 3. Examples
Practical examples.
EOF
)"
```

## Updating Documents

### View First

```bash
dahanh doc "<path>" --plain --smart
dahanh doc "<path>" --toc --plain  # For large docs
```

### Update Methods

| Method | Command | Use When |
|--------|---------|----------|
| Replace all | `-c "content"` | Rewriting entire doc |
| Append | `-a "content"` | Adding to end |
| Section edit | `--section "2" -c "content"` | Updating one section |

**Section edit is most efficient** - less context, safer.

```bash
# Update just section 3
dahanh doc edit "<path>" --section "3" -c "## 3. New Content

Updated section content..."
```

## Document Structure

Use numbered headings for `--section` to work:

```markdown
# Title (H1 - only one)

## 1. Overview
...

## 2. Installation
...

## 3. Configuration
...
```

## Remember

- Search before creating (avoid duplicates)
- Always use `--smart` when reading
- Use `--section` for targeted edits
- Use numbered headings
- Reference docs with `@doc/<path>`
