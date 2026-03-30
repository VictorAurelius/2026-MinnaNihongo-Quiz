# Debugging — {project} Common Bugs

Claude already knows systematic debugging. This file lists **common failure points** specific to this project.

## Common Bugs & Root Causes

<!-- Add project-specific bugs here. Examples: -->
<!-- 1. **404 on deploy** → forgot base path in navigation -->
<!-- 2. **State not resetting** → framework reuses component instances -->
<!-- 3. **SSR crash** → accessing browser API without typeof guard -->
<!-- 4. **Test crash** → missing mock for browser API -->

## Debug Workflow for {project}

```bash
# 1. Reproduce
{dev command}   # Check browser console

# 2. Check tests
{test command} 2>&1 | grep FAIL

# 3. Check build
{build command} 2>&1 | grep -i error

# 4. Check types
{typecheck command}
```
