---
name: dahanh.task.reopen
description: Use when reopening a completed task to add new requirements, fix issues, or extend functionality
---

# Reopening Tasks

Reopen completed tasks properly with time tracking and requirement documentation.

**Announce at start:** "I'm using the dahanh.task.reopen skill to reopen task [ID]."

**Core principle:** DOCUMENT WHY THE TASK IS REOPENED.

## The Process

### Step 1: View Current Task State

```bash
dahanh task $ARGUMENTS --plain
```

Verify:
- Task is currently `done`
- Understand what was implemented
- Review implementation notes

### Step 2: Reopen and Start Timer

```bash
# Set back to in-progress
dahanh task edit $ARGUMENTS -s in-progress

# Start timer (REQUIRED)
dahanh time start $ARGUMENTS
```

### Step 3: Document Reopen Reason

```bash
dahanh task edit $ARGUMENTS --append-notes "🔄 Reopened: <reason>"
```

**Common reasons:**
- User requested changes
- Bug found in implementation
- New requirements added
- Missed acceptance criteria

### Step 4: Add New Requirements

```bash
# Add new acceptance criteria
dahanh task edit $ARGUMENTS --ac "New requirement 1"
dahanh task edit $ARGUMENTS --ac "Fix: issue description"
```

### Step 5: Update Plan (if needed)

```bash
dahanh task edit $ARGUMENTS --plan $'Previous plan + new steps:
1. Original step (done)
2. Original step (done)
3. NEW: Address new requirement
4. NEW: Fix reported issue'
```

**Present updated plan and WAIT for approval.**

### Step 6: Implement and Complete

Follow normal task completion flow:

```bash
# Check new ACs as completed
dahanh task edit $ARGUMENTS --check-ac <new-index>
dahanh task edit $ARGUMENTS --append-notes "✓ Done: new requirement"

# Stop timer
dahanh time stop

# Mark done again
dahanh task edit $ARGUMENTS -s done
```

## When to Reopen vs Create New Task

| Reopen Existing | Create New Task |
|-----------------|-----------------|
| Small fix/change | Major new feature |
| Related to original work | Unrelated work |
| Same context needed | Different context |
| Quick addition | Significant scope |

**Rule of thumb:** If it takes < 30 mins and relates to original task, reopen. Otherwise, create new task with reference.

## Creating Follow-up Task Instead

```bash
dahanh task create "Follow-up: <description>" \
  -d "Related to @task-$ARGUMENTS" \
  --ac "New requirement"
```

## Remember

- Always document reopen reason
- Start timer when reopening
- Add new AC for traceability
- Stop timer when done
- Consider if new task is more appropriate
