# Core Rules

You MUST follow these rules. If you cannot follow any rule, stop and ask for guidance before proceeding.

---

## 🎯 The Golden Rule

**If you want to change ANYTHING in a task or doc, use CLI commands or MCP tools. NEVER edit .md files directly.**

Why? Direct file editing breaks metadata synchronization, Git tracking, and relationships.

---

## ⚠️ CRITICAL: The -a Flag Confusion

The `-a` flag means DIFFERENT things in different commands:

| Command | `-a` Means | NOT This! |
|---------|------------|-----------|
| `task create` | `--assignee` (assign user) | ~~acceptance criteria~~ |
| `task edit` | `--assignee` (assign user) | ~~acceptance criteria~~ |
| `doc edit` | `--append` (append content) | ~~assignee~~ |

### Acceptance Criteria: Use --ac

```bash
# ❌ WRONG: -a is assignee, NOT acceptance criteria!
dahanh task edit 35 -a "- [ ] Criterion"    # Sets assignee to garbage!
dahanh task create "Title" -a "Criterion"   # Sets assignee to garbage!

# ✅ CORRECT: Use --ac for acceptance criteria
dahanh task edit 35 --ac "Criterion one"
dahanh task edit 35 --ac "Criterion two"
dahanh task create "Title" --ac "Criterion one" --ac "Criterion two"
```

---

## Core Principles

| Rule | Description |
|------|-------------|
| **CLI/MCP Only** | Use commands for ALL operations. NEVER edit .md files directly |
| **Docs First** | Read project docs BEFORE planning or coding |
| **Time Tracking** | Always start timer when taking task, stop when done |
| **Plan Approval** | Share plan with user, WAIT for approval before coding |
| **Check AC After Work** | Only mark acceptance criteria done AFTER completing the work |

---

## The --plain Flag

**ONLY for view/list/search commands (NOT create/edit):**

```bash
# ✅ CORRECT
dahanh task <id> --plain
dahanh task list --plain
dahanh doc "path" --plain
dahanh doc list --plain
dahanh search "query" --plain

# ❌ WRONG (create/edit don't support --plain)
dahanh task create "Title" --plain       # ERROR!
dahanh task edit <id> -s done --plain    # ERROR!
dahanh doc create "Title" --plain        # ERROR!
dahanh doc edit "name" -c "..." --plain  # ERROR!
```

---

## Reference System

| Type | Format | Example |
|------|--------|---------|
| **Task ref** | `@task-<id>` | `@task-pdyd2e` |
| **Doc ref** | `@doc/<path>` | `@doc/patterns/auth` |

Follow refs recursively until complete context gathered.

---

## Task IDs

| Format | Example | Notes |
|--------|---------|-------|
| Sequential | `48`, `49` | Legacy numeric |
| Hierarchical | `48.1`, `48.2` | Legacy subtasks |
| Random | `qkh5ne` | Current (6-char) |

**CRITICAL:** Use raw ID for `--parent`:
```bash
# ✅ CORRECT
dahanh task create "Title" --parent 48

# ❌ WRONG
dahanh task create "Title" --parent task-48
```

---

## Status & Priority

| Status | When |
|--------|------|
| `todo` | Not started (default) |
| `in-progress` | Currently working |
| `in-review` | PR submitted |
| `blocked` | Waiting on dependency |
| `done` | All criteria met |

| Priority | Level |
|----------|-------|
| `low` | Nice-to-have |
| `medium` | Normal (default) |
| `high` | Urgent |
