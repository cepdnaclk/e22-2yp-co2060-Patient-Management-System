# Module 5: Data Integrity — Updating Related Entities in JPA

## 🎯 WHY — Why This Matters

### The Problem We Found

When a patient edited their profile in the dashboard, they could change their blood type, allergies, and emergency contacts — but they **could NOT change their name, email, or phone number**. These fields were silently ignored.

**Why?** Because the patient's name, email, and phone are stored in the `User` entity, not the `Patient` entity. The `updatePatient()` method only updated `Patient` fields.

### Database Structure

```
┌─────────────────────────────┐     ┌─────────────────────────────┐
│         users               │     │         patients             │
├─────────────────────────────┤     ├─────────────────────────────┤
│ id (PK)                     │◄────│ user_id (FK, unique)        │
│ firstname         ← NOT    │     │ id (PK)                     │
│ lastname            UPDATED│     │ date_of_birth               │
│ email                       │     │ gender                      │
│ mobilenumber                │     │ blood_type         ← UPDATED│
│ password_hash               │     │ allergies                   │
│ role                        │     │ emergency_contact_name      │
│ is_active                   │     │ ...                         │
└─────────────────────────────┘     └─────────────────────────────┘
```

The `updatePatient()` method was only touching the RIGHT table. User fields in the LEFT table were ignored.

---

## 🔍 WHAT — What We Changed

### Added User field updates in `updatePatient()`

```java
// NEW: Update linked User fields (name, email, mobile)
User user = patient.getUser();
boolean userChanged = false;

if (patientDto.getFirstName() != null && !patientDto.getFirstName().equals(user.getFirstName())) {
    user.setFirstName(patientDto.getFirstName());
    userChanged = true;
}
if (patientDto.getLastName() != null && !patientDto.getLastName().equals(user.getLastName())) {
    user.setLastName(patientDto.getLastName());
    userChanged = true;
}
if (patientDto.getEmail() != null && !patientDto.getEmail().equals(user.getEmail())) {
    // Check for duplicate email before allowing change
    if (userRepository.existsByEmail(patientDto.getEmail())) {
        throw new AppException("This email is already registered", HttpStatus.CONFLICT);
    }
    user.setEmail(patientDto.getEmail());
    userChanged = true;
}
// ... same for mobileNumber

if (userChanged) {
    user.setUpdatedAt(LocalDateTime.now());
    userRepository.save(user);
}
```

### Added `@Transactional`

```diff
+@Transactional
 public PatientDto updatePatient(Long id, PatientDto patientDto) {
```

---

## 🛠️ HOW — Step-by-Step Walkthrough

### The JPA `@OneToOne` Relationship

In `Patient.java`:
```java
@OneToOne(optional = false)
@JoinColumn(name = "user_id", nullable = false, unique = true)
private User user;
```

This annotation creates a **foreign key** from `patients.user_id` → `users.id`:
- `@OneToOne` — Each patient has exactly ONE user, and each user has at most ONE patient
- `optional = false` — A patient MUST have a user (can't be null)
- `unique = true` — No two patients can share the same user
- `@JoinColumn` — The foreign key column is named `user_id`

### Navigating the Relationship

```java
Patient patient = patientRepository.findById(id);  // Get patient
User user = patient.getUser();                      // Navigate to linked User
String email = user.getEmail();                     // Access User's email
```

JPA automatically loads the `User` when you call `getUser()` — this is called **lazy/eager loading**.

### Why `@Transactional` Matters

```java
@Transactional
public PatientDto updatePatient(Long id, PatientDto patientDto) {
    // 1. Update User entity
    userRepository.save(user);     // SQL: UPDATE users SET ...
    
    // 2. Update Patient entity  
    patientRepository.save(patient); // SQL: UPDATE patients SET ...
    
    // If step 2 FAILS, step 1 is ROLLED BACK automatically!
}
```

Without `@Transactional`: If saving the Patient fails after the User was already saved, you'd have **inconsistent data** — the user's name changed but the patient record didn't.

With `@Transactional`: Either BOTH succeed, or BOTH are rolled back. This is the **ACID** guarantee.

### Duplicate Checking Before Save

```java
if (patientDto.getEmail() != null && !patientDto.getEmail().equals(user.getEmail())) {
    if (userRepository.existsByEmail(patientDto.getEmail())) {
        throw new AppException("This email is already registered", HttpStatus.CONFLICT);
    }
    user.setEmail(patientDto.getEmail());
}
```

Why check `!patientDto.getEmail().equals(user.getEmail())`?
- If the patient sends the SAME email they already have, we skip the duplicate check
- Without this, updating ANY field would trigger a false "already registered" error for their OWN email

---

## 📚 Software Engineering Concepts

### 1. ACID Transactions

**ACID** = Atomicity, Consistency, Isolation, Durability

| Property | Meaning | Our Example |
|---|---|---|
| **Atomicity** | All or nothing | Both User and Patient save, or neither |
| **Consistency** | Data stays valid | No duplicate emails allowed |
| **Isolation** | Concurrent operations don't interfere | Two patients updating at the same time |
| **Durability** | Once committed, data survives crashes | Data is on disk, not just memory |

### 2. The DTO Pattern (Data Transfer Object)

Our code uses a `PatientDto` to transfer data between the frontend and backend:

```
Frontend                          Backend
┌─────────┐    JSON Request    ┌─────────────┐    ┌──────────────────┐
│ React   │ ──────────────────►│ PatientDto   │───►│ Patient Entity   │
│ Form    │                    │ (flat object)│    │ + User Entity    │
└─────────┘    JSON Response   │              │    │ (JPA managed)    │
               ◄──────────────│              │◄───│                  │
                               └─────────────┘    └──────────────────┘
```

The DTO **flattens** the data — the frontend doesn't need to know about the User/Patient split:

```json
{
  "firstName": "John",     // ← comes from User entity
  "lastName": "Doe",       // ← comes from User entity
  "email": "john@test.com", // ← comes from User entity
  "bloodType": "O+",      // ← comes from Patient entity
  "allergies": "Peanuts"   // ← comes from Patient entity
}
```

### 3. Entity Relationships in JPA

| Relationship | Annotation | Example |
|---|---|---|
| One-to-One | `@OneToOne` | User ↔ Patient |
| One-to-Many | `@OneToMany` | Doctor → Many Appointments |
| Many-to-One | `@ManyToOne` | Appointment → One Doctor |
| Many-to-Many | `@ManyToMany` | Patients ↔ Medications |

### 4. Null-Safe Updates (Partial Update Pattern)

Our update method uses a **partial update** pattern:

```java
if (patientDto.getBloodType() != null) {
    patient.setBloodType(patientDto.getBloodType());
}
```

This means:
- If the frontend sends `bloodType: "O+"` → update it
- If the frontend sends `bloodType: null` or doesn't include it → keep the existing value
- This allows the frontend to update only specific fields without overwriting everything

---

## 🧪 How to Verify

1. **Test profile update**: Log in as a patient → Edit profile → Change name → Save → Verify name changed in the database
2. **Test duplicate check**: Try changing email to another user's email → Should get "already registered" error
3. **Test partial update**: Send only `{ "bloodType": "AB+" }` → Other fields should remain unchanged

---

## 📖 Further Reading

- [JPA Entity Relationships](https://www.baeldung.com/jpa-entity-relationships)
- [Spring @Transactional Explained](https://www.baeldung.com/transaction-configuration-with-jpa-and-spring)
- [ACID Properties (Wikipedia)](https://en.wikipedia.org/wiki/ACID)
- [DTO Pattern](https://martinfowler.com/eaaCatalog/dataTransferObject.html)
- [JPA Cascade Types](https://www.baeldung.com/jpa-cascade-types)
