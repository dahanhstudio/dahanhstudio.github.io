# Commands Reference

## task create

```bash
dahanh task create <title> [options]
```

| Flag            | Short | Purpose                           |
| --------------- | ----- | --------------------------------- |
| `--description` | `-d`  | Task description                  |
| `--ac`          |       | Acceptance criterion (repeatable) |
| `--labels`      | `-l`  | Comma-separated labels            |
| `--assignee`    | `-a`  | Assign to user ⚠️                 |
| `--priority`    |       | low/medium/high                   |
| `--status`      | `-s`  | Initial status                    |
| `--parent`      |       | Parent task ID (raw ID only!)     |

**⚠️ `-a` = assignee, NOT acceptance criteria! Use `--ac` for AC.**

---

## task edit

```bash
dahanh task edit <id> [options]
```

| Flag             | Short | Purpose                  |
| ---------------- | ----- | ------------------------ |
| `--title`        | `-t`  | Change title             |
| `--description`  | `-d`  | Change description       |
| `--status`       | `-s`  | Change status            |
| `--priority`     |       | Change priority          |
| `--labels`       | `-l`  | Set labels               |
| `--assignee`     | `-a`  | Assign user ⚠️           |
| `--parent`       |       | Move to parent           |
| `--ac`           |       | Add acceptance criterion |
| `--check-ac`     |       | Mark AC done (1-indexed) |
| `--uncheck-ac`   |       | Unmark AC (1-indexed)    |
| `--remove-ac`    |       | Delete AC (1-indexed)    |
| `--plan`         |       | Set implementation plan  |
| `--notes`        |       | Replace notes            |
| `--append-notes` |       | Add to notes             |

**⚠️ `-a` = assignee, NOT acceptance criteria! Use `--ac` for AC.**

---

## task view/list

```bash
dahanh task <id> --plain              # View single task
dahanh task list --plain              # List all
dahanh task list --status in-progress --plain
dahanh task list --assignee @me --plain
dahanh task list --tree --plain       # Tree hierarchy
```

---

## doc create

```bash
dahanh doc create <title> [options]
```

| Flag            | Short | Purpose              |
| --------------- | ----- | -------------------- |
| `--description` | `-d`  | Description          |
| `--tags`        | `-t`  | Comma-separated tags |
| `--folder`      | `-f`  | Folder path          |

### Document Structure Best Practice

When creating/editing docs, use clear heading structure for `--toc` and `--section` to work properly:

```markdown
# Main Title (H1 - only one)

## 1. Overview

Brief introduction...

## 2. Installation

Step-by-step guide...

## 3. Configuration

### 3.1 Basic Config

...

### 3.2 Advanced Config

...

## 4. API Reference

...
```

**Writing rules:**

- Use numbered headings (`## 1. Overview`) for easy `--section "1"` access
- Keep H1 for title only, use H2 for main sections
- Use H3 for subsections within H2
- Each section should be self-contained (readable without context)

**Reading workflow:**

```bash
# Always use --smart (handles both small and large docs automatically)
dahanh doc <path> --plain --smart

# If doc is large, --smart returns TOC, then read specific section:
dahanh doc <path> --plain --section "2"
```

---

## doc edit

```bash
dahanh doc edit <name> [options]
```

| Flag             | Short | Purpose                                   |
| ---------------- | ----- | ----------------------------------------- |
| `--title`        | `-t`  | Change title                              |
| `--description`  | `-d`  | Change description                        |
| `--tags`         |       | Set tags                                  |
| `--content`      | `-c`  | Replace content (or section if --section) |
| `--append`       | `-a`  | Append content ⚠️                         |
| `--section`      |       | Target section to replace (use with -c)   |
| `--content-file` |       | Content from file                         |
| `--append-file`  |       | Append from file                          |

**⚠️ In doc edit, `-a` = append content, NOT assignee!**

### Section Edit (Context-Efficient)

Replace only a specific section instead of entire document:

```bash
# Step 1: View TOC to find section
dahanh doc readme --toc --plain

# Step 2: Edit only that section
dahanh doc edit readme --section "2. Installation" -c "New content here..."
dahanh doc edit readme --section "2" -c "New content..."  # By number works too
```

This reduces context usage significantly - no need to read/write entire document.

---

## doc view/list

```bash
dahanh doc <path> --plain             # View single doc
dahanh doc list --plain               # List all
dahanh doc list --tag api --plain     # Filter by tag
```

### Reading Documents (--smart)

**ALWAYS use `--smart` when reading documents.** It automatically handles both small and large docs:

```bash
# Always use --smart (recommended)
dahanh doc <path> --plain --smart
```

**Behavior:**

- **Small doc (≤2000 tokens)**: Returns full content automatically
- **Large doc (>2000 tokens)**: Returns stats + TOC, then use `--section` to read specific parts

```bash
# Example with large doc:
dahanh doc readme --plain --smart
# Output: Size: ~12,132 tokens | TOC with numbered sections
# Hint: Use --section <number> to read specific section

# Then read specific section:
dahanh doc readme --plain --section 3
```

### Manual Control (--info, --toc, --section)

If you need manual control instead of `--smart`:

```bash
dahanh doc <path> --info --plain     # Check size/tokens
dahanh doc <path> --toc --plain      # View table of contents
dahanh doc <path> --section "3" --plain  # Read specific section
```

---

## time

```bash
dahanh time start <id>    # REQUIRED when taking task
dahanh time stop          # REQUIRED when completing
dahanh time pause
dahanh time resume
dahanh time status
dahanh time add <id> <duration> -n "Note" -d "2025-01-01"
```

---

## search

```bash
dahanh search "query" --plain
dahanh search "auth" --type task --plain
dahanh search "api" --type doc --plain
dahanh search "bug" --type task --status in-progress --priority high --plain
```

---

## Multi-line Input (Bash/Zsh)

```bash
dahanh task edit <id> --plan $'1. Step\n2. Step\n3. Step'
```
