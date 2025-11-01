# Directory Structure Guide

Clear organization for skill development with the skilz guidelines repository.

## The Three-Repository Pattern

### 1. Skilz Repository (Guidelines)

**Purpose**: Guidelines, templates, tools, and best practices

**Location**: `~/projects/skilz/` (or wherever you clone it)

**Structure**:
```
skilz/                                    # Guidelines repo
├── .claude/
│   ├── skills/
│   │   └── skill-builder/                # ✅ The meta-skill
│   └── prompts/                          # Helpful prompts
├── templates/                            # Patterns to copy
├── examples/                             # Educational examples
├── docs/                                 # Documentation
├── tools/                                # Validation tools
├── README.md
├── SETUP.md
├── CONTRIBUTING.md
└── package.json
```

**What belongs here**:
- ✅ skill-builder (the meta-skill)
- ✅ Templates (generic patterns)
- ✅ Examples (educational)
- ✅ Documentation
- ✅ Tools

**What does NOT belong**:
- ❌ Specific skills (SQL analyzers, etc.)
- ❌ Project-specific skills
- ❌ Personal skills

### 2. Project Repository (Your Apps)

**Purpose**: Your application with project-specific skills

**Location**: `~/projects/your-app/`

**Structure**:
```
your-app/                                 # Your project
├── .claude/
│   └── skills/                           # ✅ Project skills
│       ├── deployment-workflow/          # Deploy this app
│       ├── api-tester/                   # Test this app's API
│       └── database-migrator/            # Migrate this app's DB
├── src/                                  # Your code
├── tests/
├── package.json
└── README.md
```

**What belongs here**:
- ✅ Skills specific to THIS project
- ✅ Deployment workflows
- ✅ Project conventions
- ✅ Team standards for this app

**When to use**:
- Skill is specific to this project
- Team members need it when working on this repo
- Not useful outside this project context

### 3. Personal Skills Directory (Global)

**Purpose**: Skills you use across ALL projects

**Location**: `~/.claude/skills/`

**Structure**:
```
~/.claude/
└── skills/                               # ✅ Personal skills
    ├── code-reviewer/                    # Review any code
    ├── commit-helper/                    # Write good commits
    ├── refactoring-assistant/            # General refactoring
    └── documentation-writer/             # Write docs
```

**What belongs here**:
- ✅ General-purpose skills
- ✅ Skills you use in multiple projects
- ✅ Personal productivity skills
- ✅ Skills not tied to specific projects

**When to use**:
- Skill is useful in ANY project
- You want it available everywhere
- It's personal (not team-shared)

## Additional Patterns

### Pattern 4: Team Skills Repository

**Purpose**: Skills shared across your team

```
company-skills/                           # Team repo
├── .claude/skills/
│   ├── api-patterns/                     # Company API standards
│   ├── security-reviewer/                # Security requirements
│   └── deploy-standards/                 # Deployment process
└── README.md
```

**Setup**:
```bash
# Create team repo
mkdir company-skills
cd company-skills
git init

# Team clones and works here
git clone <repo-url> ~/team/company-skills
cd ~/team/company-skills
# Skills auto-load
```

### Pattern 5: Standalone Skill Repository

**Purpose**: Publish a skill for others

```
awesome-sql-analyzer/                     # Standalone repo
├── .claude/skills/
│   └── awesome-sql-analyzer/
│       ├── SKILL.md
│       ├── examples/
│       └── scripts/
├── README.md                             # How to use
├── LICENSE
└── package.json
```

**Distribution**:
```bash
# Others install it
git clone https://github.com/you/awesome-sql-analyzer
cd awesome-sql-analyzer
# Skills available when in this directory
```

## Visual Organization

```
Your Filesystem:

~/
├── projects/
│   ├── skilz/                            # 📚 Guidelines (clone once)
│   │   └── .claude/skills/
│   │       └── skill-builder/            # The meta-skill
│   │
│   ├── my-app/                           # 🚀 Your project
│   │   └── .claude/skills/
│   │       ├── app-deployer/             # ✅ Project skill
│   │       └── api-tester/               # ✅ Project skill
│   │
│   ├── another-app/                      # 🚀 Another project
│   │   └── .claude/skills/
│   │       └── special-workflow/         # ✅ Project skill
│   │
│   └── team-skills/                      # 👥 Team shared
│       └── .claude/skills/
│           ├── company-api/              # ✅ Team skill
│           └── security-check/           # ✅ Team skill
│
└── .claude/
    └── skills/                           # 🏠 Personal (global)
        ├── code-reviewer/                # ✅ Personal skill
        └── commit-helper/                # ✅ Personal skill
```

## Decision Tree

When creating a skill, ask:

**Q1: Is this teaching HOW to build skills?**
- Yes → Goes in `skilz/` (likely improving skill-builder)
- No → Continue

**Q2: Is this specific to ONE project?**
- Yes → Goes in `project/.claude/skills/`
- No → Continue

**Q3: Do I use this across ALL my projects?**
- Yes → Goes in `~/.claude/skills/`
- No → Continue

**Q4: Does my team need this across projects?**
- Yes → Goes in `team-skills/.claude/skills/`
- No → Continue

**Q5: Am I publishing this for others?**
- Yes → Create `skill-name/` repo
- No → Re-evaluate above questions

## Common Scenarios

### Scenario: Building a SQL Analyzer

```bash
# ❌ Wrong: Creating in skilz
cd ~/projects/skilz
"Create a SQL analyzer skill"
# Results in: skilz/.claude/skills/sql-analyzer/ ❌

# ✅ Right: Creating in project
cd ~/projects/my-app
"Create a SQL analyzer skill for this project"
# Results in: my-app/.claude/skills/sql-analyzer/ ✅

# ✅ Also right: Personal skill
"Create a SQL analyzer skill in ~/.claude/skills/"
# Results in: ~/.claude/skills/sql-analyzer/ ✅
```

### Scenario: Improving the Skill Builder

```bash
# ✅ Right: Modifying guidelines
cd ~/projects/skilz
# Edit .claude/skills/skill-builder/SKILL.md
# Add new pattern to templates/
# Commit to skilz repo ✅
```

### Scenario: Team Deployment Workflow

```bash
# ✅ Right: Team shared skill
cd ~/projects/team-skills
"Create deployment workflow skill"
# Results in: team-skills/.claude/skills/deploy-workflow/ ✅

# Team uses it:
git clone <team-skills-repo>
cd team-skills
# Skill auto-loads for everyone
```

## Git Organization

### Skilz Repository (Push to GitHub)

```bash
cd ~/projects/skilz
git remote add origin <your-fork-url>

# Commit only:
# - Guidelines improvements
# - New templates (patterns)
# - Documentation updates
# - Tool enhancements

git push origin main
```

### Project Repositories (Each Has Own Skills)

```bash
cd ~/projects/my-app
git remote add origin <my-app-repo-url>

# Commit:
# - Project skills in .claude/skills/
# - Project code
# - Project docs

git push origin main
```

### Personal Skills (Not in Git)

```bash
# ~/.claude/skills/ is typically NOT in git
# These are personal to you

# Optional: Create personal repo
cd ~/.claude/skills
git init
git add .
git commit -m "My personal skills"
```

## Validation Checklist

Before committing anywhere:

```bash
# ✅ Check: Am I in the right directory?
pwd
# Should match where skill should go

# ✅ Check: Does path make sense?
# Guidelines → ~/projects/skilz/
# Project → ~/projects/my-app/.claude/skills/
# Personal → ~/.claude/skills/

# ✅ Validate the skill
node ~/projects/skilz/tools/validate-skill.js <skill-path>

# ✅ Check git status
git status
# Are you committing to the right repo?

# ✅ Commit
git add .claude/skills/my-skill
git commit -m "Add: my-skill for [purpose]"
```

## Quick Reference

| Skill Type | Location | Git Repo | Example |
|------------|----------|----------|---------|
| **Guideline/Template** | `skilz/` | skilz repo | skill-builder |
| **Project-specific** | `project/.claude/skills/` | project repo | my-app deployment |
| **Personal (global)** | `~/.claude/skills/` | optional personal | code reviewer |
| **Team-shared** | `team-skills/.claude/skills/` | team repo | company API patterns |
| **Published standalone** | `skill-repo/.claude/skills/` | public repo | awesome-sql-analyzer |

## Summary

**Golden Rule**:
- `skilz/` = Guidelines and tools (HOW to build)
- `everywhere else` = Actual skills (WHAT you built)

**Always ask**:
"Is this teaching HOW or IS this a skill?"
- Teaching HOW → skilz repo
- IS a skill → your project/personal/team repo

**When in doubt**:
Navigate to where you want to USE the skill, then create it there.
