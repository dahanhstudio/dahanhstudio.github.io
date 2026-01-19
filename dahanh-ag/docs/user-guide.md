# Dạ Hành AG User Guide

Complete guide for using Dạ Hành AG - a CLI-first knowledge layer and task management system for development teams.

---

## Getting Started

### Installation

```bash
# Install globally via npm
npm install -g dahanh

# Or via npx (no installation)
npx dahanh <command>
```

### Initialize a Project

```bash
# In your project directory
dahanh init [project-name]
```

Running `dahanh init` starts an interactive wizard:

```
🚀 Dạ Hành AG Project Setup Wizard
   Configure your project settings

? Project name: my-project
? Chế độ theo dõi Git: Git Tracked (recommended for teams)
? AI Guidelines type: CLI
? Select AI agent files to create/update:
  ◉ CLAUDE.md (Claude Code)
  ◉ AGENTS.md (Agent SDK)
  ◯ GEMINI.md (Google Gemini)
  ◯ .github/copilot-instructions.md (GitHub Copilot)
```

**Wizard Options:**

| Option | Choices | Description |
|--------|---------|-------------|
| **Project name** | Text | Name for your project |
| **Chế độ theo dõi Git** | `git-tracked` / `git-ignored` | How tasks are tracked in git |
| **AI Guidelines type** | `CLI` / `MCP` | CLI commands or MCP tools format |
| **Agent files** | Multi-select | Which AI instruction files to create |

**What happens:**
- Creates `.dahanh/` directory with `tasks/`, `docs/`, `config.json`
- If **MCP** selected: Creates `.mcp.json` for Claude Code auto-discovery
- If **git-ignored** selected: Updates `.gitignore` to exclude tasks
- Creates selected AI instruction files (CLAUDE.md, AGENTS.md, etc.)

**Quick init (skip wizard):**

```bash
# Use defaults with custom name
dahanh init my-project --no-wizard

# Force reinitialize existing project
dahanh init --force
```

### Quick Start

```bash
# Create your first task
dahanh task create "Setup project" -d "Initial project setup"

# View all tasks
dahanh task list

# Start the Web UI
dahanh browser
```

---

## CLI Command Reference

### Task Commands

#### Create Task
```bash
dahanh task create "Title" [options]
```

**Options:**
| Option | Short | Description |
|--------|-------|-------------|
| `--description` | `-d` | Task description |
| `--ac` | | Acceptance criteria (repeatable) |
| `--labels` | `-l` | Comma-separated labels |
| `--priority` | | low \| medium \| high |
| `--parent` | `-p` | Parent task ID |
| `--assignee` | `-a` | Assign to user (@me, @username) |

**Examples:**
```bash
dahanh task create "Add login" -d "Implement user login" --ac "Login form works" --ac "JWT tokens stored" -l "auth,feature" --priority high
```

#### View Task
```bash
dahanh task <id> [--plain]           # Shorthand
dahanh task view <id> [--plain]      # Full command
```

- `--plain` - Plain text output (for AI agents)

#### List Tasks
```bash
dahanh task list [options]
```

**Options:**
| Option | Description |
|--------|-------------|
| `--status` | Filter by status |
| `--assignee` | Filter by assignee |
| `--priority` | Filter by priority |
| `--label` | Filter by label |
| `--tree` | Show hierarchy tree |
| `--plain` | Plain text output |

**Examples:**
```bash
dahanh task list --status in-progress --assignee @me
dahanh task list --tree --plain
```

#### Edit Task
```bash
dahanh task edit <id> [options]
```

**Options:**
| Option | Short | Description |
|--------|-------|-------------|
| `--title` | `-t` | Update title |
| `--description` | `-d` | Update description |
| `--status` | `-s` | Update status |
| `--priority` | | Update priority |
| `--assignee` | `-a` | Update assignee |
| `--ac` | | Add acceptance criterion |
| `--check-ac` | | Check AC by index (1-based) |
| `--uncheck-ac` | | Uncheck AC by index |
| `--remove-ac` | | Remove AC by index |
| `--plan` | | Set implementation plan |
| `--notes` | | Set implementation notes |
| `--append-notes` | | Append to notes |

**Examples:**
```bash
dahanh task edit 42 -s in-progress -a @me
dahanh task edit 42 --check-ac 1 --check-ac 2
dahanh task edit 42 --append-notes "✓ Feature implemented"
```

### Documentation Commands

#### Create Document
```bash
dahanh doc create "Title" [options]
```

**Options:**
| Option | Short | Description |
|--------|-------|-------------|
| `--description` | `-d` | Document description |
| `--tags` | `-t` | Comma-separated tags |
| `--folder` | `-f` | Folder path |

#### View Document
```bash
dahanh doc <path> [--plain]          # Shorthand
dahanh doc view "path/name" [--plain] # Full command
```

#### Edit Document
```bash
dahanh doc edit "name" [options]
```

**Options:**
| Option | Short | Description |
|--------|-------|-------------|
| `--title` | `-t` | Update title |
| `--tags` | | Update tags |
| `--content` | `-c` | Replace content |
| `--append` | `-a` | Append to content |

#### List Documents
```bash
dahanh doc list [--tag <tag>] [--plain]
```

### Time Tracking Commands

#### Start Timer
```bash
dahanh time start <task-id>
```

#### Stop Timer
```bash
dahanh time stop
```

#### Pause/Resume Timer
```bash
dahanh time pause
dahanh time resume
```

#### Check Timer Status
```bash
dahanh time status
```

#### Add Manual Entry
```bash
dahanh time add <task-id> <duration> [-n "note"] [-d "date"]
```

**Examples:**
```bash
dahanh time add 42 2h -n "Code review"
dahanh time add 42 30m -d "2025-12-25"
```

#### Generate Report
```bash
dahanh time report [options]
```

**Options:**
| Option | Description |
|--------|-------------|
| `--from` | Start date (YYYY-MM-DD) |
| `--to` | End date (YYYY-MM-DD) |
| `--by-label` | Group by labels |
| `--csv` | Export as CSV |

### Search Commands

```bash
dahanh search "query" [options]
```

**Options:**
| Option | Description |
|--------|-------------|
| `--type` | task \| doc |
| `--status` | Filter by status |
| `--priority` | Filter by priority |
| `--plain` | Plain text output |

---

## Web UI Guide

### Starting the Web UI

```bash
dahanh browser
```

This opens `http://localhost:6420` in your browser.

### Navigation

The sidebar provides access to:
- **Kanban** - Visual task board
- **Tasks** - Table view of all tasks
- **Docs** - Documentation browser
- **Config** - Project settings

### Kanban Board

The Kanban board displays tasks in columns by status:
- **Todo** - Tasks not yet started
- **In Progress** - Tasks being worked on
- **In Review** - Tasks in code review
- **Blocked** - Tasks waiting on dependencies
- **Done** - Completed tasks

**Features:**
- Drag and drop tasks between columns
- Click task card to view details
- "New Task" button to create tasks
- "Batch Archive" to clean up old done tasks

### Task Details

Click any task to open the detail panel:
- View/edit title, description
- Check acceptance criteria
- Change status, priority, assignee
- View/add implementation notes
- Track time with timer controls

### Real-time Sync

The Web UI syncs in real-time with CLI changes:
- Tasks updated via CLI appear instantly
- Multiple browser tabs stay synchronized
- SSE connection for live updates (auto-reconnects on sleep/wake)

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command search |
| `Esc` | Close dialogs |

---

## Theo dõi thời gian Guide

### Workflow

1. **Start work on a task:**
   ```bash
   dahanh task edit 42 -s in-progress -a @me
   dahanh time start 42
   ```

2. **Take a break:**
   ```bash
   dahanh time pause
   # ... break ...
   dahanh time resume
   ```

3. **Finish work:**
   ```bash
   dahanh time stop
   dahanh task edit 42 -s done
   ```

### Viewing Time Entries

```bash
# Check current timer
dahanh time status

# View time report for this month
dahanh time report --from "2025-12-01" --to "2025-12-31"

# Export to CSV
dahanh time report --csv > report.csv
```

### Manual Entries

For time worked without the timer:
```bash
dahanh time add 42 1h30m -n "Pair programming session"
```

---

## MCP Integration Guide (for AI Agents)

Dạ Hành AG includes a Model Context Protocol (MCP) server for AI integration.

### Setup with Claude Code (Recommended)

```bash
# Auto setup - creates .mcp.json and configures Claude Code
dahanh mcp setup

# Or during init, select "MCP" as AI Guidelines type
dahanh init
# ? AI Guidelines type: MCP
# ✓ Created .mcp.json for Claude Code MCP auto-discovery
```

### Manual Setup with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "dahanh": {
      "command": "npx",
      "args": ["dahanh", "mcp"]
    }
  }
}
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `get_task` | Get task details by ID |
| `list_tasks` | List tasks with filters |
| `create_task` | Tạo việc mới |
| `update_task` | Update task fields |
| `get_doc` | Get document content |
| `list_docs` | List all documents |
| `search` | Search tasks and docs |

### Plain Text Mode

Always use `--plain` flag when AI agents call CLI commands:
```bash
dahanh task 42 --plain
dahanh task list --plain
dahanh doc "README" --plain
```

### Reference System

Tasks and docs can reference each other:
- `@task-42` → Links to task 42
- `@doc/patterns/module` → Links to document

References maintain their simple format in all outputs.

### AI Guidelines Management

Get guidelines on-demand or sync instruction files:

```bash
# Output guidelines to stdout (AI agents call this at session start)
dahanh agents guideline

# Interactive mode - select type, variant, files
dahanh agents

# Quick sync (CLAUDE.md, AGENTS.md) with full guidelines
dahanh agents sync

# Sync all files
dahanh agents sync --all

# Sync with minimal instruction only
dahanh agents sync --minimal

# Use MCP tools format
dahanh agents sync --type mcp
```

**Template variants:**

| Variant | Size | Description |
|---------|------|-------------|
| general (default) | ~26KB | Full guidelines embedded in file |
| instruction (`--minimal`) | ~1KB | Minimal - tells AI to call `dahanh agents guideline` |

---

## Troubleshooting

### Common Issues

#### "Error: Not initialized"
Run `dahanh init` in your project directory first.

#### "Error: Task not found"
Check the task ID with `dahanh task list --plain`.

#### "Error: Timer already running"
Stop the current timer with `dahanh time stop` before starting a new one.

#### Web UI won't start
- Check if port 6420 is available
- Try `dahanh browser --port 6421`

#### Tasks not syncing
- Refresh the browser
- Check SSE connection in browser dev tools
- Wait for auto-reconnection if computer was asleep

### Getting Help

```bash
# View help for any command
dahanh --help
dahanh task --help
dahanh task create --help
```

### Debug Mode

For detailed logging:
```bash
DEBUG=dahanh:* dahanh <command>
```

### Report Issues

File issues at: https://github.com/dahanh-dev/dahanh/issues
