# Module 3: Error Handling — Defensive Programming in JavaScript

## 🎯 WHY — Why This Matters

### The Problem We Found

In `axiosClient.js`, we had a **scoping bug** that would cause a `ReferenceError` at runtime:

```javascript
if (isRefreshing) {
    return new Promise((resolve, reject) => {     // ← reject is defined HERE
        failedQueue.push({ resolve, reject });
    })
    .then((token) => {
        originalRequest.headers["Authorization"] = "Bearer " + token;
        return api(originalRequest);
    })
    .catch(reject);   // ❌ BUG: `reject` is NOT accessible here!
}
```

### What would happen?

When two API calls fail at the same time (very common!), the second call enters this `isRefreshing` block. If the `.then()` handler throws an error, the `.catch(reject)` line crashes with:

```
ReferenceError: reject is not defined
```

This could cause the entire token refresh mechanism to break silently, leaving users stuck with expired tokens and no way to recover — except a manual page refresh.

---

## 🔍 WHAT — What We Changed

```diff
  return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
  })
  .then((token) => {
      originalRequest.headers["Authorization"] = "Bearer " + token;
      return api(originalRequest);
  })
- .catch(reject);                          // ❌ reject not in scope
+ .catch((err) => Promise.reject(err));    // ✅ properly propagates error
```

---

## 🛠️ HOW — Step-by-Step Walkthrough

### Understanding JavaScript Scope

In JavaScript, variables have **scope** — they're only accessible within certain boundaries:

```javascript
function outer() {
    let x = 10;    // x is accessible here

    function inner() {
        let y = 20;    // y is accessible here
        console.log(x);  // ✅ Can access x (closure)
        console.log(y);  // ✅ Can access y (own scope)
    }

    console.log(x);  // ✅ Can access x (own scope)
    console.log(y);  // ❌ ReferenceError! y is not in scope
}
```

### Applying This to Our Bug

```javascript
// The Promise constructor creates a NEW scope
new Promise((resolve, reject) => {
    // resolve and reject exist ONLY inside this arrow function
    failedQueue.push({ resolve, reject });  // ✅ Works here
})

// .then() creates ANOTHER new scope
.then((token) => {
    // token exists here, but resolve/reject do NOT
    return api(originalRequest);
})

// .catch() creates YET ANOTHER scope
.catch(reject);  // ❌ reject is NOT defined in this scope!
```

#### Why `.catch(reject)` LOOKED like it should work

The developer likely thought: "I defined `reject` two lines above, so it should be available." But the `reject` parameter only exists inside the `(resolve, reject) => { ... }` arrow function — NOT in the Promise's `.then()` or `.catch()` chains.

### The Fix Explained

```javascript
.catch((err) => Promise.reject(err));
```

This creates a **new arrow function** with its own parameter `err`, then:
1. Receives the error from the `.then()` chain
2. Returns `Promise.reject(err)` — which re-throws the error to the caller
3. No external variable references needed — it's self-contained

### Visualizing the Promise Chain

```
                    ┌─── Scope 1 ───────────────────┐
new Promise((resolve, reject) => {                   │
    failedQueue.push({ resolve, reject }); // ✅     │
})                                                   │
                    └───────────────────────────────┘
        │
        ▼
                    ┌─── Scope 2 ───────────────┐
.then((token) => {                                │
    return api(originalRequest);                  │
})                                                │
                    └───────────────────────────┘
        │
        ▼
                    ┌─── Scope 3 ───────────┐
.catch((err) => {                             │
    return Promise.reject(err);  // ✅        │
})                                            │
                    └───────────────────────┘
```

Each scope is independent. `reject` from Scope 1 cannot be used in Scope 3.

---

## 📚 Software Engineering Concepts

### 1. JavaScript Promises — The Mental Model

A Promise represents a **future value**. Think of it like ordering food at a restaurant:

```
1. You place an order       → new Promise(...)
2. Kitchen is cooking       → "pending" state
3a. Food arrives            → .then(food => eat(food))     "fulfilled"
3b. Kitchen is on fire      → .catch(error => complain())  "rejected"
```

```javascript
// Real code analogy:
const orderFood = new Promise((resolve, reject) => {
    // This runs immediately
    if (kitchenHasIngredients) {
        resolve("🍕 Pizza ready!");    // Success path
    } else {
        reject("No ingredients!");      // Failure path
    }
});

orderFood
    .then((food) => console.log(food))     // "🍕 Pizza ready!"
    .catch((err) => console.error(err));   // "No ingredients!"
```

### 2. Promise Chaining

Promises can be chained — each `.then()` creates a NEW Promise:

```javascript
fetchUser(1)                          // Promise<User>
    .then(user => fetchOrders(user))  // Promise<Order[]>
    .then(orders => filterActive(orders))  // Promise<Order[]>
    .catch(err => console.error(err));     // Catches ANY error above
```

**Key rule**: `.catch()` catches errors from ANY `.then()` above it in the chain.

### 3. The Interceptor Pattern

Our `axiosClient.js` uses the **Interceptor Pattern** — a design pattern where you insert middleware that runs before/after every request:

```
               ┌─── Request Interceptor ───┐
API Call  ──→  │ Add JWT token to header   │  ──→  Server
               └───────────────────────────┘

               ┌─── Response Interceptor ──┐
Server    ──→  │ If 401: refresh token     │  ──→  Component
               │ Retry with new token      │
               └───────────────────────────┘
```

This is similar to:
- **Express.js middleware** (`app.use(...)`)
- **Spring's Filter Chain** (our `JwtAuthFilter`)
- **Decorator Pattern** in OOP

### 4. Closure — Why `reject` Seemed Accessible

A **closure** is when an inner function can access variables from an outer function:

```javascript
function makeCounter() {
    let count = 0;                    // Outer variable
    return function() {
        count++;                      // Inner function accesses outer's count
        return count;                 // This is a CLOSURE
    };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2  ← count persists because of closure!
```

But closures only work when functions are **nested** (inner inside outer). `.then()` and `.catch()` are NOT nested inside the Promise constructor — they're **chained** methods called on the Promise object.

### 5. Defensive Programming

Defensive programming means writing code that handles unexpected situations gracefully:

```javascript
// ❌ Optimistic (assumes everything works)
.catch(reject);

// ✅ Defensive (handles the error explicitly)
.catch((err) => {
    console.error("Request retry failed:", err);
    return Promise.reject(err);
});
```

---

## 🧪 How to Verify

1. **Open browser DevTools** → Console tab
2. **Simulate concurrent 401s**: Open two browser tabs, wait for the token to expire, then interact with both tabs simultaneously
3. **Expected behavior**: Both tabs should silently refresh their tokens and retry their requests
4. **Check for errors**: No `ReferenceError: reject is not defined` in the console

To manually test token refresh:
```javascript
// In browser console:
localStorage.setItem("pms_token", "expired-token-here");
// Then make any API call — it should get a 401, refresh, and retry
```

---

## 📖 Further Reading

- [MDN: JavaScript Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [JavaScript.info: Promise Chaining](https://javascript.info/promise-chaining)
- [Defensive Programming (Wikipedia)](https://en.wikipedia.org/wiki/Defensive_programming)
