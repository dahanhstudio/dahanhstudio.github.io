# Task Execution

## Step 1: Take Task

```bash
dahanh task edit <id> -s in-progress -a @me
dahanh time start <id>    # REQUIRED!
```

---

## Step 2: Research

```bash
# Read task and follow ALL refs
dahanh task <id> --plain
# @doc/xxx → dahanh doc "xxx" --plain
# @task-YY → dahanh task YY --plain

# Search related docs
dahanh search "keyword" --type doc --plain

# Check similar done tasks
dahanh search "keyword" --type task --status done --plain
```

---

## Step 3: Plan (BEFORE coding!)

```bash
dahanh task edit <id> --plan $'1. Research (see @doc/xxx)
2. Implement
3. Test
4. Document'
```

**⚠️ Share plan with user. WAIT for approval before coding.**

---

## Step 4: Implement

```bash
# Check AC only AFTER work is done
dahanh task edit <id> --check-ac 1
dahanh task edit <id> --append-notes "✓ Done: feature X"
```

---

## Scope Changes

If new requirements emerge during work:

```bash
# Small: Add to current task
dahanh task edit <id> --ac "New requirement"
dahanh task edit <id> --append-notes "⚠️ Scope updated: reason"

# Large: Ask user first, then create follow-up
dahanh task create "Follow-up: feature" -d "From task <id>"
```

**⚠️ Don't silently expand scope. Ask user first.**

---

## Key Rules

1. **Plan before code** - Capture approach first
2. **Wait for approval** - Don't start without OK
3. **Check AC after work** - Not before
4. **Ask on scope changes** - Don't expand silently
