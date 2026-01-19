# Context Optimization

Optimize your context usage to work more efficiently within token limits.

---

## Output Format

```bash
# ❌ Verbose output
dahanh task 42 --json

# ✅ Compact output (always use --plain)
dahanh task 42 --plain
```

---

## Search Before Read

```bash
# ❌ Reading all docs to find info
dahanh doc "doc1" --plain
dahanh doc "doc2" --plain
dahanh doc "doc3" --plain

# ✅ Search first, then read only relevant docs
dahanh search "authentication" --type doc --plain
dahanh doc "security-patterns" --plain  # Only the relevant one
```

---

## Selective File Reading

```bash
# ❌ Reading entire large file
Read file (2000+ lines)

# ✅ Read specific sections
Read file with offset=100 limit=50
```

---

## Reading Documents (--smart)

**ALWAYS use `--smart` when reading documents.** It automatically handles both small and large docs:

```bash
# ❌ Reading without --smart (may get truncated large doc)
dahanh doc readme --plain

# ✅ Always use --smart
dahanh doc readme --plain --smart
# Small doc → returns full content
# Large doc → returns stats + TOC

# ✅ If doc is large, read specific section:
dahanh doc readme --plain --section 3
```

**`--smart` behavior:**

- **≤2000 tokens**: Returns full content automatically
- **>2000 tokens**: Returns stats + TOC, then use `--section <number>`

---

## Compact Notes

```bash
# ❌ Verbose notes
dahanh task edit 42 --append-notes "I have successfully completed the implementation of the authentication middleware which validates JWT tokens and handles refresh logic..."

# ✅ Compact notes
dahanh task edit 42 --append-notes "✓ Auth middleware + JWT validation done"
```

---

## Avoid Redundant Operations

| Don't                            | Do Instead                  |
| -------------------------------- | --------------------------- |
| Re-read files already in context | Reference from memory       |
| List tasks/docs multiple times   | List once, remember results |
| Quote entire file contents       | Summarize key points        |
| Repeat full error messages       | Reference error briefly     |

---

## Efficient Workflow

| Phase          | Context-Efficient Approach     |
| -------------- | ------------------------------ |
| **Research**   | Search → Read only matches     |
| **Planning**   | Brief plan, not detailed prose |
| **Coding**     | Read only files being modified |
| **Notes**      | Bullet points, not paragraphs  |
| **Completion** | Summary, not full log          |

---

## Quick Rules

1. **Always `--plain`** - Never use `--json` unless specifically needed
2. **Always `--smart`** - Use `--smart` when reading docs (auto-handles size)
3. **Search first** - Don't read all docs hoping to find info
4. **Read selectively** - Use offset/limit for large files
5. **Write concise** - Compact notes, not essays
6. **Don't repeat** - Reference context already loaded
7. **Summarize** - Key points, not full quotes
