#!/usr/bin/env node

/**
 * Skill Scaffolding Tool
 *
 * Interactive CLI to generate new skills from templates.
 *
 * Usage: node tools/scaffold-skill.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n' + '='.repeat(50));
  console.log('Skill Scaffolding Tool');
  console.log('='.repeat(50) + '\n');

  // Check if we're in the skilz repo - warn users
  const currentDir = process.cwd();
  const isSkilzRepo = fs.existsSync(path.join(currentDir, '.claude', 'skills', 'skill-builder'));

  if (isSkilzRepo && currentDir.includes('skilz')) {
    console.log('⚠️  WARNING: You appear to be in the skilz guidelines repository!');
    console.log('');
    console.log('This repository is for GUIDELINES ONLY, not specific skills.');
    console.log('');
    console.log('Your skill should be created in:');
    console.log('  - Your project: ~/projects/my-app/.claude/skills/');
    console.log('  - Personal: ~/.claude/skills/');
    console.log('  - Separate repo: ~/projects/my-skill/');
    console.log('');
    const proceed = await question('Continue anyway? (yes/no): ');
    if (proceed.toLowerCase() !== 'yes') {
      console.log('\nSuggestion: Navigate to your project first, then run this tool.');
      console.log('Example: cd ~/projects/my-app && node ~/projects/skilz/tools/scaffold-skill.js\n');
      rl.close();
      return;
    }
    console.log('');
  }

  // Get skill name
  const name = await question('Skill name (lowercase-with-hyphens): ');

  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    console.log('✗ Invalid name. Must contain only lowercase letters, numbers, and hyphens.');
    rl.close();
    return;
  }

  // Get description
  const description = await question('Brief description: ');

  if (!description) {
    console.log('✗ Description is required.');
    rl.close();
    return;
  }

  // Choose template
  console.log('\nAvailable templates:');
  console.log('1. basic-skill - Simple instructions');
  console.log('2. analysis-skill - Analyzing code/data');
  console.log('3. generation-skill - Generating content');
  console.log('4. workflow-skill - Multi-step processes');
  console.log('5. tool-restricted-skill - Read-only operations');
  console.log('6. multi-file-skill - Complex with multiple files');
  console.log('7. script-based-skill - With utility scripts');
  console.log('8. validation-skill - Plan-validate-execute');

  const templateChoice = await question('\nChoose template (1-8): ');

  const templates = {
    '1': 'basic-skill',
    '2': 'analysis-skill',
    '3': 'generation-skill',
    '4': 'workflow-skill',
    '5': 'tool-restricted-skill',
    '6': 'multi-file-skill',
    '7': 'script-based-skill',
    '8': 'validation-skill'
  };

  const template = templates[templateChoice];

  if (!template) {
    console.log('✗ Invalid template choice.');
    rl.close();
    return;
  }

  // Choose location
  console.log('\nWhere to create skill:');
  console.log('1. .claude/skills/ (project-specific - in current directory)');
  console.log('2. ~/.claude/skills/ (personal, all projects)');
  console.log('3. Custom path');

  const locationChoice = await question('\nChoose location (1-3): ');

  let baseDir;
  if (locationChoice === '1') {
    baseDir = '.claude/skills';
    console.log(`\nℹ️  Will create in: ${path.resolve(baseDir)}`);
  } else if (locationChoice === '2') {
    baseDir = path.join(process.env.HOME, '.claude', 'skills');
    console.log(`\nℹ️  Will create in: ${baseDir}`);
  } else if (locationChoice === '3') {
    baseDir = await question('Enter full path (e.g., ~/projects/my-app/.claude/skills): ');
    baseDir = baseDir.replace('~', process.env.HOME);
    console.log(`\nℹ️  Will create in: ${path.resolve(baseDir)}`);
  } else {
    console.log('✗ Invalid location choice.');
    rl.close();
    return;
  }

  // Final safety check - prevent creating in skilz repo
  const resolvedPath = path.resolve(baseDir);
  if (resolvedPath.includes('skilz') && resolvedPath.includes('skill-builder')) {
    console.log('\n❌ ERROR: Cannot create specific skills in the skilz guidelines repository!');
    console.log('');
    console.log('This path appears to be inside the skilz repo.');
    console.log('Specific skills must be created elsewhere.');
    console.log('');
    rl.close();
    return;
  }

  // Create skill directory
  const skillDir = path.join(baseDir, name);

  if (fs.existsSync(skillDir)) {
    console.log(`\n✗ Skill directory already exists: ${skillDir}`);
    rl.close();
    return;
  }

  // Copy template
  const templateDir = path.join(__dirname, '..', 'templates', template);

  if (!fs.existsSync(templateDir)) {
    console.log(`\n✗ Template not found: ${template}`);
    rl.close();
    return;
  }

  // Create directory
  fs.mkdirSync(skillDir, { recursive: true });

  // Copy template files
  copyDir(templateDir, skillDir);

  // Update SKILL.md with actual name and description
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  if (fs.existsSync(skillMdPath)) {
    let content = fs.readFileSync(skillMdPath, 'utf-8');

    // Replace placeholder name and description
    content = content.replace(/^name: .+$/m, `name: ${name}`);
    content = content.replace(/^description: .+$/m, `description: ${description}`);

    fs.writeFileSync(skillMdPath, content);
  }

  console.log(`\n✓ Skill created successfully!`);
  console.log(`\nLocation: ${skillDir}`);
  console.log(`Template: ${template}`);
  console.log(`\nNext steps:`);
  console.log(`1. Edit ${path.join(skillDir, 'SKILL.md')} to customize`);
  console.log(`2. Add supporting files if needed`);
  console.log(`3. Validate: npm run validate ${skillDir}`);
  console.log(`4. Test with Claude Code\n`);

  rl.close();
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error:', err);
    rl.close();
    process.exit(1);
  });
}
