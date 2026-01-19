---
title: Git Tracking Modes
createdAt: '2026-01-05T16:59:24.389Z'
updatedAt: '2026-01-05T16:59:38.013Z'
description: Documentation for git-tracked vs git-ignored modes
tags:
  - feature
  - git
---
## Overview

Dạ Hành AG supports two git tracking modes, selected during project initialization with `dahanh init`.

## Modes

### git-tracked (Default)

**Use Case:** Teams, shared project context

All `.dahanh/` files are tracked in git:
- Tasks, docs, and config shared with team
- Full version history for changes
- Code review can include task updates

```bash
# After init, commit everything
git add .dahanh/
git commit -m "Add project knowledge base"
```

### git-ignored

**Use Case:** Personal use, individual tracking

Only documentation is tracked. Dạ Hành AG auto-updates `.gitignore`:

```gitignore
# dahanh (ignore all except docs)
.dahanh/*
!.dahanh/docs/
!.dahanh/docs/**
```

**Benefits:**
- Personal task tracking without cluttering team repo
- Docs still shareable with team
- No merge conflicts on task files

## Switching Modes

To switch modes after initialization:

1. Edit `.dahanh/config.json` and change `gitTrackingMode`
2. Update `.gitignore` accordingly:
   - For `git-ignored`: Add the ignore pattern above
   - For `git-tracked`: Remove the ignore pattern

## Related

- @doc/guides/user-guide - Getting started
- @doc/patterns/storage-pattern - File storage details
