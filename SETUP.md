# Setting Up Skilz for Skill Development

This guide ensures your skills go in the **right place** and keeps the skilz repository clean as a guidelines-only repo.

## Understanding the Organization

```
📁 Your Projects Organization:

skilz/                           ← Guidelines repo (this one)
├── .claude/skills/
│   └── skill-builder/           ← The meta-skill that teaches Claude
├── templates/                   ← Patterns to copy from
├── examples/                    ← Educational examples
├── docs/                        ← Best practices guides
└── tools/                       ← Validation tools

your-project/                    ← Your actual project
├── .claude/skills/              ← Put your project skills HERE
│   ├── sql-analyzer/
│   ├── api-designer/
│   └── test-generator/
└── src/                         ← Your project code

~/.claude/skills/                ← Personal skills (global)
├── my-personal-helper/
└── code-reviewer/
```

## Quick Start: First Time Setup

### Step 1: Clone and Install Skilz

```bash
# Clone the guidelines repository
cd ~/projects  # or wherever you keep repos
git clone <your-skilz-repo-url> skilz
cd skilz
npm install
```

### Step 2: Understand What Skilz Does

Skilz is a **guidelines repository**. When you're in any project and ask Claude to create a skill:

1. Claude loads `.claude/skills/skill-builder/SKILL.md` from this skilz repo
2. Claude learns the best practices
3. Claude generates your skill in **your project**, not in skilz

### Step 3: Create Your First Skill (Right Way)

Navigate to **your actual project** (not the skilz repo):

```bash
cd ~/projects/my-app  # Your actual project

# Now ask Claude to create a skill
# Claude will put it in my-app/.claude/skills/, NOT in skilz/
```

**In Claude Code:**
```
You: Create a skill for analyzing API endpoints in this project

Claude: I'll create an API endpoint analyzer skill...
[Creates: my-app/.claude/skills/api-analyzer/SKILL.md]
```

## Organization Patterns

### Pattern 1: Project-Specific Skills

**When to use**: Skills specific to one project

```bash
your-project/
├── .claude/skills/
│   ├── project-deployer/      # Deployment workflow for this project
│   ├── test-generator/        # Tests following this project's patterns
│   └── api-documenter/        # API docs for this project
└── src/
    └── api/
```

**How to create:**
```bash
cd your-project  # ← Important: Be IN your project

# Ask Claude:
"Create a skill for deploying this project to production"

# Result: your-project/.claude/skills/project-deployer/SKILL.md ✅
```

### Pattern 2: Personal Skills (Global)

**When to use**: Skills you use across ALL projects

```bash
~/.claude/skills/
├── code-reviewer/             # Review code in any project
├── commit-helper/             # Write good commit messages
└── refactoring-assistant/     # General refactoring help
```

**How to create:**
```bash
# Ask Claude:
"Create a personal skill for reviewing code quality and save it to ~/.claude/skills/"

# Result: ~/.claude/skills/code-reviewer/SKILL.md ✅
```

### Pattern 3: Shared Team Skills

**When to use**: Skills your team shares across projects

```bash
team-skills/                    # Separate repo for team
├── .claude/skills/
│   ├── company-api-patterns/
│   ├── security-reviewer/
│   └── database-migrator/
└── README.md
```

**How to setup:**
```bash
# 1. Create a separate repo for team skills
mkdir team-skills
cd team-skills
git init

# 2. Create skills here
# Ask Claude: "Create a skill for our company's API patterns"
# Result: team-skills/.claude/skills/company-api-patterns/ ✅

# 3. Team members clone this repo
# Skills auto-load when they work in this directory
```

### Pattern 4: Standalone Skill Repo (For Sharing)

**When to use**: Publishing a skill for others to use

```bash
sql-performance-analyzer/       # Standalone repo
├── .claude/skills/
│   └── sql-performance-analyzer/
│       ├── SKILL.md
│       ├── examples/
│       └── scripts/
├── README.md
├── LICENSE
└── package.json
```

**How to create:**
```bash
mkdir sql-performance-analyzer
cd sql-performance-analyzer
git init

# Ask Claude:
"Create a skill for analyzing SQL query performance"

# Publish to GitHub for others to use
```

## Using the Skill Builder

### Method 1: Automatic (Recommended)

When you're in **any project** with `.claude/` directory:

```bash
cd your-project

# Just ask Claude to create a skill
# The skill-builder will guide Claude automatically
```

**Claude automatically:**
1. Loads skill-builder guidelines from skilz repo
2. Creates skill in `your-project/.claude/skills/`
3. Follows all best practices

### Method 2: Using Templates

Copy a template to your project:

```bash
cd your-project

# Copy template from skilz repo
cp -r ~/projects/skilz/templates/workflow-skill .claude/skills/my-workflow

# Edit the skill
code .claude/skills/my-workflow/SKILL.md

# Validate
~/projects/skilz/node_modules/.bin/validate-skill .claude/skills/my-workflow
```

### Method 3: Using Scaffold Tool

Interactive creation:

```bash
cd your-project

# Run scaffolding from skilz repo
node ~/projects/skilz/tools/scaffold-skill.js

# Follow prompts:
# - Skill name: my-skill
# - Template: workflow-skill
# - Location: .claude/skills/my-skill  ← Auto-suggests current project
```

## Common Workflows

### Workflow 1: Adding Skill to Current Project

```bash
# 1. Be in your project
cd ~/projects/my-app

# 2. Ask Claude
"Create a skill for testing React components following our patterns"

# 3. Verify location
ls .claude/skills/react-test-generator/
# ✅ SKILL.md is here

# 4. Validate
node ~/projects/skilz/tools/validate-skill.js .claude/skills/react-test-generator
```

### Workflow 2: Creating Personal Skill

```bash
# Ask Claude with specific location
"Create a skill for code review and save it to ~/.claude/skills/code-reviewer"

# Or manually specify after creation
mkdir -p ~/.claude/skills/code-reviewer
# Then ask Claude to create the skill there
```

### Workflow 3: Building Skill for Distribution

```bash
# 1. Create dedicated repo
mkdir ~/projects/awesome-skill
cd ~/projects/awesome-skill
git init

# 2. Create skill
"Create a skill for [your use case]"

# 3. Validate and package
node ~/projects/skilz/tools/validate-skill.js .claude/skills/awesome-skill

# 4. Create README for users
# 5. Publish to GitHub

# 6. Others can use it:
git clone https://github.com/you/awesome-skill
cd awesome-skill
# Skill auto-loads!
```

## Safety: Preventing Mistakes

### Preventing Accidental Commits to Skilz

The skilz repo has `.gitignore` configured to reject specific skills:

```gitignore
# .gitignore in skilz repo
.claude/skills/*/              # Ignore all skills
!.claude/skills/skill-builder/ # Except the meta-skill
```

If you accidentally create a skill in skilz:

```bash
cd ~/projects/skilz

# ❌ Wrong: Created skill here
ls .claude/skills/my-mistake/

# Git will ignore it
git status
# Won't show my-mistake/

# Move it to the right place
mv .claude/skills/my-mistake ~/projects/my-app/.claude/skills/
```

### Validation Checklist

Before committing skills anywhere:

```bash
# ❓ Am I in the right directory?
pwd
# Should be: ~/projects/my-app (your project)
# NOT: ~/projects/skilz (guidelines repo)

# ❓ Is this a guideline or a specific skill?
# Guidelines → skilz repo
# Specific skill → your project or separate repo

# ❓ Validate the skill
node ~/projects/skilz/tools/validate-skill.js .claude/skills/my-skill

# ✅ Commit to the RIGHT repo
git add .claude/skills/my-skill
git commit -m "Add: my-skill for [purpose]"
```

## Directory Structure Best Practices

### Your Project Structure

```bash
your-project/
├── .claude/
│   ├── skills/                    # Project-specific skills
│   │   ├── project-deployer/
│   │   ├── test-generator/
│   │   └── api-documenter/
│   └── prompts/                   # Optional: custom prompts
│       └── deploy.md
├── src/                           # Your code
├── tests/
└── README.md
```

### Personal Skills Structure

```bash
~/.claude/
└── skills/
    ├── code-reviewer/             # General code review
    ├── commit-helper/             # Good commits
    ├── refactoring-assistant/     # Refactoring
    └── documentation-writer/      # Documentation
```

### Team Skills Repository

```bash
company-claude-skills/             # Shared repo
├── .claude/skills/
│   ├── api-patterns/              # Company API standards
│   ├── security-checker/          # Security requirements
│   ├── database-migrator/         # DB patterns
│   └── deploy-workflow/           # Deployment process
├── docs/
│   ├── setup.md                   # How to use
│   └── contributing.md            # How to add skills
└── README.md
```

## Quick Reference

### ✅ Do This

```bash
# Create skills in your projects
cd ~/projects/my-app
"Create a skill for testing"
→ my-app/.claude/skills/test-generator/ ✅

# Create personal skills in home
"Create skill in ~/.claude/skills/code-reviewer"
→ ~/.claude/skills/code-reviewer/ ✅

# Use skilz templates as reference
cp ~/projects/skilz/templates/workflow-skill ~/projects/my-app/.claude/skills/my-workflow ✅

# Validate using skilz tools
node ~/projects/skilz/tools/validate-skill.js ./claude/skills/my-skill ✅
```

### ❌ Don't Do This

```bash
# Don't create specific skills in skilz repo
cd ~/projects/skilz
"Create a SQL analyzer skill"
→ skilz/.claude/skills/sql-analyzer/ ❌

# Don't commit specific skills to skilz
cd ~/projects/skilz
git add .claude/skills/my-skill/  ❌
# (git will ignore it anyway)

# Don't modify skill-builder unless improving guidelines
cd ~/projects/skilz
# Edit .claude/skills/skill-builder/SKILL.md ❌
# (only if you're contributing to guidelines)
```

## Integration with Claude Code

### How Claude Finds Skills

When you ask Claude to create a skill, Claude looks for skill-builder in:

1. Current project: `./claude/skills/skill-builder/`
2. Parent directories: `../.claude/skills/skill-builder/`
3. Personal skills: `~/.claude/skills/skill-builder/`

**Recommendation**: Keep skilz cloned somewhere and reference it:

```bash
# Option 1: Clone skilz as a sibling to your projects
~/projects/
├── skilz/                    # Guidelines repo
├── project-a/                # Your projects auto-find it
├── project-b/
└── project-c/

# Option 2: Symlink from home directory
ln -s ~/projects/skilz/.claude/skills/skill-builder ~/.claude/skills/skill-builder
```

## Troubleshooting

### "I created a skill in the wrong place"

```bash
# Move it to the right location
mv ~/projects/skilz/.claude/skills/wrong-place ~/projects/my-app/.claude/skills/right-place

# Or if in personal skills
mv ~/projects/skilz/.claude/skills/wrong-place ~/.claude/skills/right-place
```

### "Git shows my skill in skilz repo"

```bash
# This shouldn't happen due to .gitignore, but if it does:
cd ~/projects/skilz
git status

# If you see a skill that shouldn't be there:
# 1. Move it to correct location
# 2. Check .gitignore has:
#    .claude/skills/*/
#    !.claude/skills/skill-builder/
```

### "Validation fails"

```bash
# Run validation with full path
node ~/projects/skilz/tools/validate-skill.js /full/path/to/your/skill

# Common issues:
# - Name format: must be lowercase-with-hyphens
# - Description: max 1024 characters
# - File paths: use forward slashes
```

## Summary

**The Golden Rule**:
- **skilz repo** = Guidelines, templates, examples, tools
- **Your projects** = Actual skills you build and use

**Always ask yourself**:
"Is this teaching HOW to build skills (→ skilz) or IS this a skill itself (→ your project)?"

**Setup Checklist**:
- [ ] Clone skilz repo
- [ ] Understand it's for guidelines only
- [ ] Navigate to YOUR project before creating skills
- [ ] Validate skills using skilz tools
- [ ] Commit skills to YOUR project repo, not skilz

Now you're ready to build organized, well-structured skills! 🚀
