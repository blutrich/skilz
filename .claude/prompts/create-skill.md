# Create a New Skill (Properly Organized)

This prompt helps you create a skill in the RIGHT location.

## Important Context

You are currently in the **skilz guidelines repository**. This repo contains:
- Guidelines for building skills
- Templates and examples
- Validation tools

**DO NOT** create specific skills here!

## Where to Create Your Skill

### Option 1: Project-Specific Skill (Recommended)

Navigate to your actual project first:

```bash
cd ~/projects/my-app
```

Then ask Claude:
```
Create a skill for [your use case] in this project
```

Result: `my-app/.claude/skills/your-skill/` ✅

### Option 2: Personal Skill (All Projects)

Ask Claude with explicit path:
```
Create a skill for [your use case] and save it to ~/.claude/skills/skill-name
```

Result: `~/.claude/skills/skill-name/` ✅

### Option 3: Standalone Repo (For Sharing)

Create a new repo first:
```bash
mkdir ~/projects/my-awesome-skill
cd ~/projects/my-awesome-skill
git init
```

Then ask Claude:
```
Create a skill for [your use case]
```

Result: `my-awesome-skill/.claude/skills/my-awesome-skill/` ✅

## What NOT to Do

❌ Don't create skills in the skilz repo:
```bash
cd ~/projects/skilz  # Guidelines repo
# Creating skill here = WRONG
```

❌ Don't ask Claude to create skills without specifying location when in skilz repo

## Ready to Create?

1. **Navigate** to the right directory (your project, not skilz)
2. **Ask Claude** to create your skill
3. **Validate** using: `node ~/projects/skilz/tools/validate-skill.js .claude/skills/your-skill`
4. **Commit** to YOUR project repo (not skilz)

## Need Help?

See `SETUP.md` for complete organization guide.
