# Module 8: Database Migrations — Flyway Best Practices

## 🎯 WHY — Why This Matters

### What Are Database Migrations?

When you change your Java entity (e.g., add a new field to `Patient`), the database table also needs to change. You have two options:

1. **Manual**: Log into the database, run `ALTER TABLE patients ADD COLUMN ...` — error-prone, not repeatable
2. **Automated migrations**: Write SQL scripts that run automatically on startup — repeatable, versioned, auditable

Our project uses **Flyway** for automated migrations.

### The Issue We Found

Our `application.properties` has BOTH migration strategies running simultaneously:

```properties
spring.jpa.hibernate.ddl-auto=update     # Hibernate auto-updates tables
spring.flyway.enabled=true                # Flyway runs migration scripts
```

This is like having two people editing the same document at the same time — they can conflict.

---

## 🛠️ HOW — Understanding Flyway

### How Flyway Works

```
On application startup:
1. Flyway checks the `flyway_schema_history` table in your database
2. It sees which migrations have already been applied (e.g., V1 through V12)
3. It finds new migration files (e.g., V14) in classpath:db/migration
4. It runs the new migrations IN ORDER
5. It records them in the history table
```

### Migration File Naming

```
V1__init_schema.sql          ← Version 1, description "init schema"
V2__add_refresh_tokens.sql   ← Version 2, description "add refresh tokens"
V3__add_billing.sql          ← Version 3
...
V14__add_nurse_workflow.sql  ← Version 14 (note: V13 is missing!)
```

**Naming rules:**
- Must start with `V` followed by a number
- Double underscore `__` separates version from description
- Description uses underscores instead of spaces
- File extension must be `.sql`

### Our Migration History

| Version | File | Purpose |
|---|---|---|
| V1 | `V1__init_schema.sql` | Creates users, patients, doctors, appointments, medical_records |
| V2 | `V2__add_refresh_tokens.sql` | JWT refresh token storage |
| V3 | `V3__add_billing.sql` | Invoices and payments |
| V4 | `V4__add_audit_logs.sql` | Security audit trail |
| V5 | `V5__add_notifications.sql` | Notification system |
| V6 | `V6__add_critical_status_to_patients.sql` | Critical alert flag |
| V7-V9 | Fix scripts | Repair users table primary key |
| V10 | `V10__drop_users_role_check.sql` | Remove role constraint |
| V11 | `V11__add_profile_change_requests.sql` | Profile change workflow |
| V12 | `V12__fix_appointments_columns.sql` | Fix appointment schema |
| V13 | **MISSING** | Likely deleted/skipped — Flyway handles this fine |
| V14 | `V14__add_nurse_workflow_tables.sql` | Clinical orders, MAR, vitals |

---

## 📚 Software Engineering Concepts

### 1. `ddl-auto` Options Explained

| Value | What It Does | When to Use |
|---|---|---|
| `create` | **DROPS all tables** then recreates them | Never in production! |
| `create-drop` | Creates on start, drops on shutdown | Unit tests only |
| `update` | Adds missing columns/tables, never removes | Development ⚠️ |
| `validate` | Checks schema matches entities, fails if not | **Production** ✅ |
| `none` | Does nothing | When using Flyway only |

**Our current setup**: `update` + Flyway = both modifying the schema.

**Best practice**: 
- Development: `update` (convenient, auto-adds new columns)
- Production: `validate` (Flyway handles all changes, Hibernate just verifies)

### 2. Why Migrations Exist

Imagine a team of 4 developers:

```
Without Migrations:
Dev A: "I added a 'phone' column to users"
Dev B: "I renamed 'name' to 'firstName'"  
Dev C: "Wait, I still have the old schema..."
Dev D: "My database is broken!"
```

```
With Migrations:
V15__add_phone_to_users.sql     ← Dev A writes this
V16__rename_name_to_firstname.sql ← Dev B writes this

Every developer runs the same migrations → identical schemas
```

### 3. Golden Rule: Never Edit Applied Migrations

```
❌ WRONG: Edit V3__add_billing.sql after it's been applied
          → Flyway detects the checksum changed → ERROR!

✅ RIGHT: Create a new V15__fix_billing_column.sql
          → Flyway applies it as a new migration
```

### 4. Rollback Strategies

Flyway Community Edition doesn't support automatic rollbacks. Instead:

```sql
-- V15__add_phone_column.sql (forward migration)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- V16__remove_phone_column.sql (manual rollback)
ALTER TABLE users DROP COLUMN phone;
```

---

## 🧪 How to Verify

Check your migration history:
```sql
SELECT version, description, success, installed_on
FROM flyway_schema_history
ORDER BY installed_rank;
```

---

## 📖 Further Reading

- [Flyway Documentation](https://flywaydb.org/documentation/)
- [Spring Boot + Flyway Guide](https://www.baeldung.com/database-migrations-with-flyway)
- [Hibernate ddl-auto Explained](https://www.baeldung.com/spring-boot-data-sql-and-schema-sql)
- [Database Migration Best Practices](https://martinfowler.com/articles/evodb.html)
