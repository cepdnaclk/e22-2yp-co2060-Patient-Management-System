# Module 1: Security — Never Commit Secrets to Source Control

## 🎯 WHY — Why This Matters

### The Problem We Found

In our `application.properties` file, we had **three security vulnerabilities**:

```properties
# VULNERABILITY 1: A real database password exposed in source code!
spring.datasource.password=${PGPASSWORD:shashintha}

# VULNERABILITY 2: A typo that broke the environment variable lookup
app.superadmin.password=${0PMS_SUPER_ADMIN_PASSWORD:ChangeMe123!}
#                         ^ This '0' prefix makes the variable name invalid!

# VULNERABILITY 3: Google Client ID hardcoded as a default
app.google.client-id=${GOOGLE_TOKEN:278480592589-5r7mb8rj3u...}
```

### Why is this dangerous?

1. **Git remembers forever**: Even if you delete the password later, anyone can run `git log -p` and see every version of the file — your password is permanently in the git history.

2. **GitHub is public**: This repository is on GitHub under `cepdnaclk/`. Anyone in the world can see `shashintha` as the database password.

3. **Credential stuffing**: Attackers collect leaked passwords and try them on other services. If the developer used `shashintha` elsewhere (email, bank, etc.), those accounts are now at risk.

4. **The typo was silently broken**: `${0PMS_SUPER_ADMIN_PASSWORD:ChangeMe123!}` — Spring looks for an environment variable named `0PMS_SUPER_ADMIN_PASSWORD`. Since variable names can't start with a digit, this **never resolves**, and the super admin password is always `ChangeMe123!`. An attacker just needs to try that.

---

## 🔍 WHAT — What We Changed

### Change 1: Removed hardcoded database password

```diff
 # Database - Railway PostgreSQL
 spring.datasource.url=jdbc:postgresql://${PGHOST:localhost}:${PGPORT:5432}/${PGDATABASE:pms}
 spring.datasource.username=${PGUSER:postgres}
-spring.datasource.password=${PGPASSWORD:shashintha}
+spring.datasource.password=${PGPASSWORD:}
```

**Before**: If `PGPASSWORD` env var is not set → uses `shashintha` (a real password!)
**After**: If `PGPASSWORD` env var is not set → uses empty string → app fails to connect → you immediately know you forgot to set it

### Change 2: Fixed the typo in super admin password

```diff
-app.superadmin.password=${0PMS_SUPER_ADMIN_PASSWORD:ChangeMe123!}
+app.superadmin.password=${PMS_SUPER_ADMIN_PASSWORD:ChangeMe123!}
```

**Before**: Spring looks for env var `0PMS_SUPER_ADMIN_PASSWORD` → never exists → always `ChangeMe123!`
**After**: Spring looks for env var `PMS_SUPER_ADMIN_PASSWORD` → works correctly

### Change 3: Removed hardcoded Google Client ID

```diff
-app.google.client-id=${GOOGLE_TOKEN:278480592589-5r7mb8rj3u...}
+app.google.client-id=${GOOGLE_TOKEN:}
```

### Change 4: Cleaned up dead commented-out code

We removed ~25 lines of old, commented-out configuration that was left from an earlier version. Dead code creates confusion — is it "commented out temporarily" or "permanently removed"?

---

## 🛠️ HOW — Step-by-Step Walkthrough

### Understanding Spring Property Resolution

Spring Boot resolves properties using this syntax:

```
${VARIABLE_NAME:default_value}
```

This means:
1. First, look for an **environment variable** named `VARIABLE_NAME`
2. If found → use its value
3. If NOT found → use `default_value`

#### Real example:

```properties
spring.datasource.password=${PGPASSWORD:shashintha}
```

| Is `PGPASSWORD` set? | Value used |
|---|---|
| Yes, `PGPASSWORD=mySecureP@ss` | `mySecureP@ss` ✅ |
| No | `shashintha` ❌ (hardcoded fallback) |

#### After our fix:

```properties
spring.datasource.password=${PGPASSWORD:}
```

| Is `PGPASSWORD` set? | Value used |
|---|---|
| Yes, `PGPASSWORD=mySecureP@ss` | `mySecureP@ss` ✅ |
| No | `` (empty) → connection fails immediately → you know to fix it ✅ |

### How to set environment variables

**On Windows (PowerShell):**
```powershell
$env:PGPASSWORD = "mySecurePassword"
$env:JWT_SECRET = "your-base64-encoded-secret"
$env:GOOGLE_TOKEN = "your-google-client-id"
```

**On Linux/Mac:**
```bash
export PGPASSWORD="mySecurePassword"
export JWT_SECRET="your-base64-encoded-secret"
export GOOGLE_TOKEN="your-google-client-id"
```

**In a `.env` file (for local development):**
```
PGPASSWORD=mySecurePassword
JWT_SECRET=your-base64-encoded-secret
GOOGLE_TOKEN=your-google-client-id
```

**In Railway/Vercel (production):**
Set them in the dashboard under "Environment Variables" — they're stored encrypted and never appear in your code.

---

## 📚 Software Engineering Concepts

### 1. The Twelve-Factor App (Factor III: Config)

The [Twelve-Factor App](https://12factor.net/) is a methodology for building modern web applications. Factor III states:

> **Store config in the environment.**
> 
> An app's config is everything that is likely to vary between deploys (staging, production, developer environments). This includes database credentials, API keys, and hostnames.

**Rule of thumb**: If it changes between environments, it's config. If it's the same everywhere, it's code.

```
✅ Environment variable:  PGPASSWORD=myPassword
❌ In source code:        spring.datasource.password=myPassword
```

### 2. Defense in Depth

Security should have multiple layers:

```
Layer 1: Don't commit secrets to git           ← We fixed this
Layer 2: Use .gitignore for .env files          ← Already done
Layer 3: Rotate credentials regularly           ← Best practice
Layer 4: Use a secrets manager (AWS SSM, Vault) ← For production
Layer 5: Audit who accessed what                ← Already done (audit logs)
```

### 3. Fail Fast Principle

Our fix changes the fallback from a wrong password to no password:

```properties
# Before: Silently uses wrong password → confusing errors later
spring.datasource.password=${PGPASSWORD:shashintha}

# After: Fails immediately with clear error → easy to debug
spring.datasource.password=${PGPASSWORD:}
```

**Fail Fast** means: if something is wrong, crash immediately with a clear error message rather than continuing with incorrect data and producing mysterious bugs later.

### 4. Git History is Permanent

Even after our fix, `shashintha` is still in the git history. To truly remove it:

```bash
# This rewrites git history (DANGEROUS — coordinate with team!)
git filter-branch --tree-filter \
  'sed -i "s/shashintha/REMOVED/g" code/backend/src/main/resources/application.properties' \
  HEAD
```

For a real production system, you would:
1. **Change the password immediately** (on the database server)
2. **Rotate all credentials** that were exposed
3. Consider using `git-secret` or `git-crypt` for sensitive files

### 5. The `.gitignore` Pattern

Our project already has `.gitignore` entries, but let's understand why:

```gitignore
# These files contain secrets — NEVER commit them
.env
.env.local
.env.production

# These are generated — don't need to be in git
node_modules/
target/
dist/
```

---

## 🧪 How to Verify

1. **Check the file**: Open `application.properties` and confirm no real passwords remain
2. **Search for secrets**: Run this command to scan for potential leaks:
   ```bash
   git grep -i "password\|secret\|token" -- "*.properties" "*.yml" "*.env"
   ```
3. **Test locally**: Set your `PGPASSWORD` env var and verify the app starts:
   ```powershell
   $env:PGPASSWORD = "your-local-db-password"
   cd code/backend
   ./mvnw spring-boot:run
   ```
4. **Test without env var**: Unset it and verify the app fails fast:
   ```powershell
   Remove-Item Env:PGPASSWORD
   ./mvnw spring-boot:run  # Should fail with "password authentication failed"
   ```

---

## 📖 Further Reading

- [OWASP: Hardcoded Passwords](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [The Twelve-Factor App: Config](https://12factor.net/config)
- [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- [GitHub: Removing Sensitive Data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git Secrets Tool](https://github.com/awslabs/git-secrets) — prevents committing secrets
