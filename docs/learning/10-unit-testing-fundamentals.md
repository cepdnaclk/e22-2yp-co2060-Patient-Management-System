# Module 10: Unit Testing Fundamentals

## 🎯 WHY — Why This Matters

### The Problem

We found that the `src/test/java` directory only contained the default Spring Boot test (`BackendApplicationTests.java`), with **zero actual unit tests** for the 17 business modules.

When code isn't tested automatically:
1. **Fear of change**: Developers are afraid to refactor or fix bugs because they might break something else.
2. **Manual testing overhead**: You have to manually click through the UI every time you make a change.
3. **Hidden bugs**: Edge cases (like the `axiosClient.js` scoping bug or the duplicate email bug) slip into production.

---

## 🔍 WHAT — What We Changed

We added two foundational test classes:
1. `AuthServiceTest.java` — Tests login logic and invalid password handling
2. `PatientServiceTest.java` — Tests the patient registration flow, including duplicate email checks

---

## 🛠️ HOW — Step-by-Step Walkthrough

### The "Arrange, Act, Assert" Pattern

Every good unit test follows the **AAA Pattern**:

```java
@Test
void testLogin_IncorrectPassword_ThrowsException() {
    // 1. ARRANGE: Set up the scenario
    String email = "user@test.com";
    String password = "wrongpassword";
    // ... setup mock database behavior ...

    // 2. ACT: Call the method we are testing
    AppException exception = assertThrows(AppException.class, () -> {
        authService.login(email, password);
    });

    // 3. ASSERT: Verify the result was what we expected
    assertEquals("Invalid email or password", exception.getMessage());
}
```

### What is Mocking? (Mockito)

A **Unit Test** should test exactly ONE class in isolation. 

`PatientService` depends on `UserRepository`, `PatientRepository`, and `PasswordEncoder`. If we use a real database, it's no longer a unit test — it's an Integration Test. If the database is down, the test fails, even if `PatientService`'s logic is perfectly fine.

**Solution: Mocks.**

```java
@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    // Creates a "fake" repository that doesn't connect to a real database
    @Mock
    private UserRepository userRepository;

    // Injects the fake repository into the real PatientService
    @InjectMocks
    private PatientService patientService;

    @Test
    void testRegister() {
        // We tell the fake repository how to behave:
        // "When anyone asks if 'new@test.com' exists, say FALSE"
        when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
        
        // ... rest of test ...
    }
}
```

### Verifying Behavior

Sometimes we don't just want to check the *return value*, we want to check *what happened inside*.

```java
// Verify that the save() method was NEVER called on the database
verify(userRepository, never()).save(any());

// Verify that the save() method was called EXACTLY ONCE
verify(userRepository, times(1)).save(any(User.class));
```

---

## 📚 Software Engineering Concepts

### 1. The Testing Pyramid

You shouldn't write the same type of test for everything.

```
       / \         <-- UI / E2E Tests (Cypress, Selenium)
      /   \            - Slow, brittle, expensive, test the whole system
     /-----\       <-- Integration Tests (Spring @SpringBootTest, Testcontainers)
    /       \          - Medium speed, test DB/API connections
   /---------\     <-- Unit Tests (JUnit, Mockito)
  /           \        - Fast, isolated, test business logic
  -------------
```
The base of your pyramid should be Unit Tests — you should have hundreds of them running in seconds.

### 2. Test-Driven Development (TDD)

TDD is a workflow where you write the test *before* you write the code:
1. **Red**: Write a failing test for a new feature.
2. **Green**: Write the minimum amount of code to make the test pass.
3. **Refactor**: Clean up the code while keeping the test passing.

### 3. Code Coverage

Code coverage measures how many lines of your production code were executed by your tests.
- 0% = No tests
- 80% = Industry standard target
- 100% = Often a waste of time (diminishing returns testing boilerplate getters/setters)

### 4. Determinism

A unit test must be **deterministic** — if you run it 100 times, it should pass 100 times.
If a test fails 1 out of 10 times, it's a "flaky test." Flaky tests destroy trust in the test suite.
Never rely on real current time (`LocalDateTime.now()`) or random numbers in assertions without mocking them.

---

## 🧪 How to Verify

Run the tests using Maven:

```bash
# From the code/backend directory:
./mvnw test
```

You should see output similar to:
```
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

---

## 📖 Further Reading

- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://site.mockito.org/)
- [The Practical Test Pyramid (Martin Fowler)](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Spring Boot Testing Guide](https://spring.io/guides/gs/testing-web/)
