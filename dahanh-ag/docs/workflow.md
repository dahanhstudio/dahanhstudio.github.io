# Task Workflow Guide

Complete guide for managing tasks from creation to completion.

## Overview

```
Create → Take → Plan → Implement → Complete
```

## Step 1: Create Task

Create a task with clear acceptance criteria:

```bash
dahanh task create "Add user authentication" \
  -d "Implement JWT auth following @doc/patterns/auth" \
  --ac "User can login with email/password" \
  --ac "JWT token is returned on success" \
  --ac "Invalid credentials return 401" \
  --ac "Unit tests cover all scenarios" \
  --priority high \
  -l "feature,auth"
```

### Writing Good Acceptance Criteria

**Do:** Write outcome-oriented, testable criteria.

| Bad (Implementation details) | Good (Outcomes) |
|------------------------------|-----------------|
| Add function handleLogin() | User can login and receive JWT |
| Use bcrypt for hashing | Passwords are securely hashed |
| Add try-catch blocks | Errors return appropriate HTTP codes |

## Step 2: Take Task

Assign the task to yourself and set status:

```bash
dahanh task edit <id> -s in-progress -a @me
```

## Step 3: Start Timer

Begin tracking time:

```bash
dahanh time start <id>
```

## Step 4: Research Context

Before planning, gather context from documentation:

```bash
# Search for related docs
dahanh search "authentication" --type doc --plain

# Read relevant documentation
dahanh doc "patterns/auth" --plain
dahanh doc "api-guidelines" --plain

# Check similar completed tasks
dahanh search "auth" --type task --status done --plain
```

## Step 5: Create Implementation Plan

Add a plan to the task:

```bash
dahanh task edit <id> --plan $'1. Review auth patterns in @doc/patterns/auth
2. Design token structure (access + refresh)
3. Implement login endpoint
4. Implement token refresh endpoint
5. Add middleware for protected routes
6. Write unit tests (aim for 90%+ coverage)
7. Update API documentation'
```

**Important:** Share the plan with your team/AI and wait for approval before coding.

## Step 6: Implement

Work through your plan, checking criteria as you complete them:

```bash
# Check first criterion
dahanh task edit <id> --check-ac 1
dahanh task edit <id> --append-notes "Implemented login endpoint"

# Check second criterion
dahanh task edit <id> --check-ac 2
dahanh task edit <id> --append-notes "JWT token generation working"

# Continue for all criteria...
```

## Step 7: Add Implementation Notes

When complete, add comprehensive notes (useful for PR description):

```bash
dahanh task edit <id> --notes $'## Summary
Implemented JWT authentication with access and refresh tokens.

## Changes
- Added POST /auth/login endpoint
- Added POST /auth/refresh endpoint
- Created auth middleware for protected routes
- Added password hashing with bcrypt

## Security
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Passwords hashed with bcrypt (12 rounds)

## Tests
- 15 unit tests added
- Coverage: 94%

## Documentation
- Updated API.md with auth endpoints'
```

## Step 8: Stop Timer and Complete

```bash
dahanh time stop
dahanh task edit <id> -s done
```

---

## Definition of Done

A task is **Done** only when ALL criteria are met:

### Via CLI

- [ ] All acceptance criteria checked
- [ ] Implementation notes added
- [ ] Timer stopped
- [ ] Status set to done

### Via Code

- [ ] All tests pass
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No regressions

---

## Working with Subtasks

Create subtasks for complex work:

```bash
# Parent task
dahanh task create "Build user dashboard" --priority high

# Subtasks
dahanh task create "Design dashboard layout" --parent 42
dahanh task create "Implement user stats API" --parent 42
dahanh task create "Build dashboard components" --parent 42
dahanh task create "Add real-time updates" --parent 42
```

View as tree:

```bash
dahanh task list --tree --plain
```

---

## Handling Blocked Tasks

When blocked by external dependencies:

```bash
dahanh task edit <id> -s blocked
dahanh task edit <id> --append-notes "Blocked: Waiting for API spec from backend team"
```

When unblocked:

```bash
dahanh task edit <id> -s in-progress
dahanh task edit <id> --append-notes "Unblocked: API spec received"
```

---

## Quick Reference

```bash
# Full workflow in one view
dahanh task edit <id> -s in-progress -a @me  # Take
dahanh time start <id>                        # Timer
dahanh task edit <id> --plan "..."            # Plan
dahanh task edit <id> --check-ac 1            # Check
dahanh task edit <id> --append-notes "..."    # Progress
dahanh time stop                              # Stop timer
dahanh task edit <id> -s done                 # Complete
```
