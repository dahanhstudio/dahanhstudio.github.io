# Task Completion

## Definition of Done

A task is **Done** when ALL of these are complete:

| Requirement | Command |
|-------------|---------|
| All AC checked | `dahanh task edit <id> --check-ac N` |
| Notes added | `dahanh task edit <id> --notes "Summary"` |
| Timer stopped | `dahanh time stop` |
| Status = done | `dahanh task edit <id> -s done` |
| Tests pass | Run test suite |

---

## Completion Steps

```bash
# 1. Verify all AC are checked
dahanh task <id> --plain

# 2. Add implementation notes
dahanh task edit <id> --notes $'## Summary
What was done and key decisions.'

# 3. Stop timer (REQUIRED!)
dahanh time stop

# 4. Mark done
dahanh task edit <id> -s done
```

---

## Post-Completion Changes

If user requests changes after task is done:

```bash
dahanh task edit <id> -s in-progress    # Reopen
dahanh time start <id>                   # Restart timer
dahanh task edit <id> --ac "Fix: description"
dahanh task edit <id> --append-notes "🔄 Reopened: reason"
# Complete work, then follow completion steps again
```

---

## Checklist

- [ ] All AC checked (`--check-ac`)
- [ ] Notes added (`--notes`)
- [ ] Timer stopped (`time stop`)
- [ ] Tests pass
- [ ] Status = done (`-s done`)
