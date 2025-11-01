# Using Skill Templates

Templates in this repo are patterns to COPY to your projects, not edit directly.

## Available Templates

1. **basic-skill** - Simple instructions
2. **analysis-skill** - Analyzing code/data
3. **generation-skill** - Generating content
4. **workflow-skill** - Multi-step processes
5. **tool-restricted-skill** - Read-only operations
6. **multi-file-skill** - Complex with multiple files
7. **script-based-skill** - With utility scripts
8. **validation-skill** - Plan-validate-execute

## How to Use Templates

### Method 1: Let Claude Guide You

Navigate to your project:
```bash
cd ~/projects/my-app
```

Ask Claude:
```
Create a skill for [use case] using the [template-name] pattern
```

Claude will:
1. Load the template
2. Customize it for your use case
3. Save to `my-app/.claude/skills/your-skill/`

### Method 2: Copy Template Manually

```bash
# Copy from skilz repo to your project
cp -r ~/projects/skilz/templates/workflow-skill ~/projects/my-app/.claude/skills/my-workflow

# Edit the copy
code ~/projects/my-app/.claude/skills/my-workflow/SKILL.md

# Validate
node ~/projects/skilz/tools/validate-skill.js ~/projects/my-app/.claude/skills/my-workflow
```

### Method 3: Use Scaffold Tool

```bash
# Navigate to your project
cd ~/projects/my-app

# Run scaffolding
node ~/projects/skilz/tools/scaffold-skill.js

# Follow prompts to select template and location
```

## Template Organization

```
skilz/templates/               # Templates stay here (read-only)
├── workflow-skill/
├── analysis-skill/
└── ...

your-project/.claude/skills/   # Your customized skills go here
├── my-workflow/               # Copied from template
├── my-analyzer/               # Copied from template
└── ...
```

## Important

- ✅ Templates are in skilz repo as REFERENCE
- ✅ Your skills go in YOUR project
- ❌ Don't edit templates directly
- ❌ Don't create new skills in skilz/templates/

## Next Steps

1. Choose a template that fits your use case
2. Navigate to YOUR project
3. Copy or let Claude create from template
4. Customize for your needs
5. Validate and use
