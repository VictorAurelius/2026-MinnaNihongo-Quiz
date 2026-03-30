# Extracting Starter Kit to Standalone Repo

## Steps

### 1. Create new repo
```bash
gh repo create claude-starter-kit --public --description "Personal Claude Code development workflow kit"
```

### 2. Copy kit files
```bash
# From any project that has the latest kit
cp -r .claude/starter-kit/* /path/to/claude-starter-kit/
cp -r .claude/starter-kit/.claude-plugin /path/to/claude-starter-kit/
```

### 3. Add git repo essentials
```bash
cd /path/to/claude-starter-kit
git init
echo "*.jar" > .gitignore
echo ".proposals/" >> .gitignore
git add -A
git commit -m "feat: initial release v1.1.1"
git tag v1.1.1
git remote add origin https://github.com/VictorAurelius/claude-starter-kit.git
git push -u origin main --tags
```

### 4. Register as Claude Code plugin
```bash
# In Claude Code:
/plugin marketplace add VictorAurelius/claude-starter-kit
/plugin install claude-starter-kit@claude-starter-kit
```

### 5. Update projects to use remote
Each project can now:
```bash
# Option A: Plugin
/plugin install claude-starter-kit

# Option B: Script
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit
bash /tmp/kit/install-remote.sh /path/to/project
```

### 6. Remove embedded kit from projects (optional)
After confirming plugin works, optionally remove `.claude/starter-kit/` from projects
and only keep `.claude/.starter-kit-version` + installed skills/scripts.

## Version Tagging

When releasing new kit version:
```bash
# In claude-starter-kit repo:
# 1. Update VERSION, CHANGELOG.md
# 2. Commit
git add -A
git commit -m "release: v1.2.0"
git tag v1.2.0
git push origin main --tags

# 3. Projects update:
/plugin update claude-starter-kit
# or
bash /tmp/kit/install-remote.sh /path/to/project
```
