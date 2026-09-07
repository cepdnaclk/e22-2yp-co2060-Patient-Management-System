# Module 6: Clean Code — File Hygiene & Naming Conventions

## 🎯 WHY — Why This Matters

### The Problems We Found

1. **Empty (0-byte) files**: Several files exist but contain NO code: `App.css`, `api.js`, `auth`, `Sidebar.jsx`, `DashboardLayout.jsx`, `PatientForm.jsx`, `PatientList.jsx`, `patientService.js`

2. **Typo in folder name**: `AdminDAshboardComponents` (note the uppercase "A" in "DAshboard") — should be `AdminDashboardComponents`

### Why do empty files matter?

- **Confusion**: A developer sees `Sidebar.jsx` and thinks "we have a sidebar component!" — but it's empty
- **False sense of completeness**: The project looks like it has more features than it does
- **Import errors**: If someone tries to import these files, they'll get cryptic errors
- **The Broken Windows Theory**: Small signs of neglect encourage more neglect

---

## 📚 Software Engineering Concepts

### 1. The Broken Windows Theory

From the book *The Pragmatic Programmer*:

> If a building has a broken window and it's left unrepaired, people assume nobody cares. Soon, more windows get broken. Then graffiti appears. Then structural damage.

In codebases, empty files and typos are "broken windows." They signal that quality doesn't matter here, encouraging more careless additions.

### 2. Naming Conventions

| Convention | Use Case | Example |
|---|---|---|
| **PascalCase** | React components, Java classes | `PatientDashboard`, `UserService` |
| **camelCase** | JavaScript variables/functions, Java methods | `firstName`, `getUserById` |
| **kebab-case** | File names (some projects), CSS classes | `patient-dashboard.jsx` |
| **SCREAMING_SNAKE_CASE** | Constants, enum values | `MAX_RETRY_COUNT`, `SUPER_ADMIN` |
| **snake_case** | Database columns, Python | `user_id`, `created_at` |

Our project uses **PascalCase** for component folders. `AdminDAshboardComponents` violates this with an inconsistent capital A.

### 3. Dead Code Elimination

Dead code is code that can never be executed. Types include:
- **Unreachable code**: After a `return` statement
- **Unused imports**: Imported but never referenced
- **Empty files**: Created but never filled
- **Commented-out code**: Old code kept "just in case"

**Rule**: If you need old code, that's what `git log` is for. Don't keep commented-out code.

### 4. Folder Structure Conventions

Our project follows a **Feature-Based** structure:

```
src/
├── features/           ← Grouped by business feature
│   ├── auth/           ← Login, Signup, AuthContext
│   ├── dashboard/      ← All dashboard components
│   └── patients/       ← Patient CRUD (currently empty files!)
├── components/         ← Shared UI components (Button, Modal)
├── services/           ← API service layer
├── pages/              ← Top-level page components
└── layouts/            ← Layout wrappers (currently empty!)
```

Alternatives:
- **Type-Based**: Group by file type (`/components`, `/hooks`, `/utils`)
- **Domain-Based**: Group by business domain (`/billing`, `/appointments`)

---

## 🧪 Actions to Take

These are **awareness items** — the folder rename and file cleanup should be done carefully (all import paths must be updated):

1. **Delete empty files** that will never be implemented
2. **Rename** `AdminDAshboardComponents` → `AdminDashboardComponents`
3. **Update all imports** referencing the old folder name
4. **Add ESLint rules** to catch unused imports: `"no-unused-vars": "warn"`

---

## 📖 Further Reading

- [The Pragmatic Programmer: Broken Windows](https://pragprog.com/titles/tpp20/)
- [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code/9780136083238/)
- [JavaScript Naming Conventions](https://www.robinwieruch.de/javascript-naming-conventions/)
- [React Project Structure Best Practices](https://reactjs.org/docs/faq-structure.html)
