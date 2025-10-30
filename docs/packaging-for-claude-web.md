# Packaging Skills for Claude Web

Complete guide for creating zip files that work with Claude web (claude.ai).

## Critical Requirement

**SKILL.md must be at the top level of the zip file**, not nested in subdirectories.

Claude web expects to find SKILL.md immediately when opening the zip - any nesting will cause the skill to fail loading.

## Correct Structure

```
skill-name.zip
├── SKILL.md              ← Top level (required)
├── supporting-file.md    ← Top level
├── reference.md          ← Top level
├── examples.md           ← Top level
└── scripts/              ← Subdirectories OK
    ├── helper.py
    └── validate.py
```

**Key points:**
- ✅ SKILL.md at root level
- ✅ Supporting markdown files at root level
- ✅ Scripts/utilities can be in subdirectories
- ✅ References from SKILL.md work normally

## Incorrect Structure

```
skill-name.zip
└── .claude/              ❌ Don't do this
    └── skills/
        └── skill-name/
            └── SKILL.md  ❌ Won't work!
```

**Why this fails:**
- Claude web can't find SKILL.md at root
- Nested structure is for Claude Code projects only
- No automatic directory traversal

## Step-by-Step Packaging

### Method 1: From Skill Directory (Recommended)

```bash
# 1. Navigate INTO the skill directory
cd /path/to/.claude/skills/skill-name/

# 2. Verify SKILL.md exists
ls -la SKILL.md

# 3. Create zip with files at top level
zip -r skill-name.zip . -x ".*" -x "__*" -x "node_modules/*"

# 4. Verify structure
unzip -l skill-name.zip | head -10
```

**Expected output:**
```
Archive:  skill-name.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     1234  2025-10-30 10:30   SKILL.md         ← At root!
      567  2025-10-30 10:30   reference.md
      890  2025-10-30 10:30   examples.md
```

### Method 2: Using Explicit File List

```bash
# From any directory
cd /path/to/.claude/skills/skill-name/

# Create zip with specific files
zip skill-name.zip \
  SKILL.md \
  reference.md \
  examples.md \
  scripts/*.py

# Verify
unzip -l skill-name.zip
```

### Method 3: Automated Script

Create a packaging script for reusability:

```bash
#!/bin/bash
# package-skill.sh

if [ -z "$1" ]; then
  echo "Usage: ./package-skill.sh <skill-directory>"
  exit 1
fi

SKILL_DIR="$1"
SKILL_NAME=$(basename "$SKILL_DIR")
OUTPUT_ZIP="${SKILL_NAME}.zip"

# Verify SKILL.md exists
if [ ! -f "$SKILL_DIR/SKILL.md" ]; then
  echo "Error: SKILL.md not found in $SKILL_DIR"
  exit 1
fi

# Create zip
cd "$SKILL_DIR"
zip -r "../$OUTPUT_ZIP" . -x ".*" -x "__*" -x "node_modules/*"
cd ..

# Verify structure
echo "Verifying package structure..."
unzip -l "$OUTPUT_ZIP" | head -15

# Check SKILL.md is at root
if unzip -l "$OUTPUT_ZIP" | grep -q "^.*SKILL.md$"; then
  echo "✅ Package created successfully: $OUTPUT_ZIP"
  echo "✅ SKILL.md is at root level"
else
  echo "❌ Error: SKILL.md not at root level!"
  exit 1
fi
```

**Usage:**
```bash
chmod +x package-skill.sh
./package-skill.sh .claude/skills/pdf-processing
```

## Verification Checklist

Before sharing your zip file, verify:

### 1. Structure Check
```bash
unzip -l skill-name.zip | head -10
```

**Look for:**
- [ ] SKILL.md appears at root (no path prefix)
- [ ] Supporting files at root level
- [ ] No `.claude/skills/` directory structure

### 2. Extract Test
```bash
# Test extraction
mkdir test-extract
cd test-extract
unzip ../skill-name.zip
ls -la

# Should see SKILL.md immediately
# Not nested in directories
```

**Verify:**
- [ ] SKILL.md is in current directory
- [ ] Can read SKILL.md directly
- [ ] Supporting files accessible

### 3. Content Check
```bash
# View SKILL.md from zip
unzip -p skill-name.zip SKILL.md | head -20
```

**Verify:**
- [ ] YAML frontmatter present
- [ ] Content renders correctly
- [ ] No encoding issues

### 4. File References Check

If SKILL.md references other files:

```bash
# Check referenced files exist
grep -E '\[.*\]\(.*\.md\)' SKILL.md
```

**Verify:**
- [ ] All referenced files included in zip
- [ ] Paths use forward slashes
- [ ] References are relative, not absolute

## Common Mistakes

### Mistake 1: Zipping from Parent Directory

❌ **Wrong:**
```bash
cd /path/to/.claude/skills/
zip -r skill-name.zip skill-name/
# Creates: skill-name/SKILL.md (nested!)
```

✅ **Correct:**
```bash
cd /path/to/.claude/skills/skill-name/
zip -r skill-name.zip .
# Creates: SKILL.md (at root)
```

### Mistake 2: Including Git Metadata

❌ **Wrong:**
```bash
zip -r skill-name.zip .
# Includes .git/, .gitignore, etc.
```

✅ **Correct:**
```bash
zip -r skill-name.zip . -x ".*"
# Excludes hidden files/directories
```

### Mistake 3: Absolute File Paths

❌ **Wrong in SKILL.md:**
```markdown
See [reference](/Users/me/.claude/skills/skill-name/reference.md)
```

✅ **Correct in SKILL.md:**
```markdown
See [reference](reference.md)
```

### Mistake 4: Platform-Specific Paths

❌ **Wrong in SKILL.md:**
```markdown
Run: python scripts\helper.py
```

✅ **Correct in SKILL.md:**
```markdown
Run: python scripts/helper.py
```

## Multi-File Skills

For skills with multiple supporting files:

### Directory Structure
```
skill-name/
├── SKILL.md              # Main skill (required)
├── reference.md          # API reference
├── examples.md           # Usage examples
├── best-practices.md     # Guidelines
└── scripts/
    ├── validate.py
    └── process.py
```

### Packaging
```bash
cd skill-name/
zip -r skill-name.zip \
  SKILL.md \
  reference.md \
  examples.md \
  best-practices.md \
  scripts/
```

### Verification
```bash
unzip -l skill-name.zip
```

**Expected:**
```
Archive:  skill-name.zip
  SKILL.md                    ← Root level ✅
  reference.md                ← Root level ✅
  examples.md                 ← Root level ✅
  best-practices.md           ← Root level ✅
  scripts/validate.py         ← Subdirectory OK ✅
  scripts/process.py          ← Subdirectory OK ✅
```

## Skills with Scripts

If your skill includes executable scripts:

### Include Scripts
```bash
cd skill-name/
zip -r skill-name.zip \
  SKILL.md \
  scripts/
```

### Document Script Usage in SKILL.md
```markdown
## Validation

Run the validation script:

\`\`\`bash
python scripts/validate.py input.txt
\`\`\`

**Note**: Requires Python 3.8+ with packages:
- requests
- pyyaml
```

### Security Note

When packaging scripts:
- Document all dependencies
- Specify version requirements
- Note any API keys needed
- Warn about external network calls

## Quick Reference

### Single-File Skill

```bash
cd /path/to/skill-name/
zip skill-name.zip SKILL.md
```

### Multi-File Skill

```bash
cd /path/to/skill-name/
zip -r skill-name.zip . -x ".*"
unzip -l skill-name.zip | head -10
```

### Verification One-Liner

```bash
unzip -l skill-name.zip | head -5 | grep -q "SKILL.md$" && echo "✅ Valid" || echo "❌ Invalid"
```

## Troubleshooting

### Problem: "Skill not loading in Claude web"

**Diagnosis:**
```bash
unzip -l skill-name.zip | grep SKILL.md
```

**If output shows path prefix:**
```
  skill-name/SKILL.md        ❌ Wrong
  .claude/skills/skill-name/SKILL.md  ❌ Wrong
```

**Should be:**
```
  SKILL.md                   ✅ Correct
```

**Fix:**
```bash
# Recreate zip from inside skill directory
cd /path/to/skill-name/
zip -r skill-name-fixed.zip .
```

### Problem: "Referenced files not found"

**Diagnosis:**
```bash
# Check SKILL.md references
grep -E '\[.*\]\(.*\.md\)' SKILL.md

# Check what's in zip
unzip -l skill-name.zip
```

**Fix:** Ensure all referenced files are included:
```bash
zip -r skill-name.zip SKILL.md reference.md examples.md
```

### Problem: "Script permissions lost"

**Note:** Zip files don't preserve execute permissions reliably across platforms.

**Solution:** Document in SKILL.md:
```markdown
## Running Scripts

Make scripts executable:
\`\`\`bash
chmod +x scripts/*.py
python scripts/validate.py
\`\`\`
```

## Best Practices

1. **Name descriptively**: `pdf-processing.zip`, not `skill.zip`
2. **Keep it clean**: Exclude development files (`.git`, `node_modules`, etc.)
3. **Test before sharing**: Extract and verify structure
4. **Document dependencies**: List required packages/tools
5. **Use relative paths**: All file references relative to SKILL.md
6. **Version your zips**: Consider naming like `pdf-processing-v1.0.zip`

## Example: Complete Packaging Workflow

```bash
# 1. Navigate to skill directory
cd .claude/skills/pdf-processing/

# 2. Verify structure
ls -la
# Should see: SKILL.md, reference.md, examples.md, scripts/

# 3. Create zip
zip -r pdf-processing.zip . -x ".*" -x "__pycache__/*"

# 4. Verify package
echo "Contents:"
unzip -l pdf-processing.zip | head -15

# 5. Test extraction
mkdir ../test
cp pdf-processing.zip ../test/
cd ../test
unzip pdf-processing.zip
ls -la
# Should see SKILL.md at top level

# 6. Verify SKILL.md
head -20 SKILL.md
# Should show valid YAML frontmatter

# 7. Clean up test
cd ..
rm -rf test/

# 8. Move final zip
mv pdf-processing/pdf-processing.zip ./

echo "✅ Package ready: pdf-processing.zip"
```

## Next Steps

- Review [skill-structure.md](skill-structure.md) for technical requirements
- Check [best-practices-guide.md](best-practices-guide.md) for content guidelines
- Validate your skill before packaging: `npm run validate path/to/skill`

## Summary

**Key requirement**: SKILL.md at zip root level

**Quick command**:
```bash
cd /path/to/skill-name/ && zip -r skill-name.zip . -x ".*"
```

**Verification**:
```bash
unzip -l skill-name.zip | head -5 | grep "SKILL.md$"
```

If SKILL.md shows without any path prefix, you're good to go!
