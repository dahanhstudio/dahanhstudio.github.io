# Knowns Project

This project uses **Knowns CLI** for task and documentation management.

## Before Starting

Run this command to get usage guidelines:

```bash
knowns agents guideline
```

You MUST call this at session start and follow every rule it outputs.

## Context-Specific Guidelines

Get guidelines for specific workflow stages:

```bash
# Full guidelines (all sections)
knowns agents guideline --full

# Compact (core rules + common mistakes)
knowns agents guideline --compact

# By workflow stage
knowns agents guideline --stage creation    # Creating tasks
knowns agents guideline --stage execution   # Implementing tasks
knowns agents guideline --stage completion  # Completing tasks

# Individual sections
knowns agents guideline --core       # Core rules only
knowns agents guideline --commands   # Commands reference
knowns agents guideline --mistakes   # Common mistakes
```

## Quick Commands

```bash
dahanh task list --plain        # List tasks
dahanh task <id> --plain        # View task
dahanh doc list --plain         # List docs
dahanh doc "<path>" --plain     # View doc
dahanh search "query" --plain   # Search
```

**Important:** Always read the guidelines before working on tasks.
