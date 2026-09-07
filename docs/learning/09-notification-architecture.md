# Module 9: Architecture — The Notification Pattern (Scaffold)

## 🎯 WHY — Why This Matters

### The Problem

A robust Patient Management System needs to notify users when important events happen:
- A new patient is registered and needs management approval
- A patient's vitals reach a critical state
- An appointment is cancelled or rescheduled

Right now, if an appointment is cancelled, the doctor only knows if they manually refresh their dashboard and check the schedule. This is inefficient and dangerous in a healthcare setting.

---

## 🔍 WHAT — The Proposed Solution

We are going to design an **Event-Driven Notification Architecture**.

Instead of the `AppointmentService` directly sending emails or saving notifications to the database (which creates tight coupling), it will publish an **Event**. A separate `NotificationService` will listen for that event and handle the actual notification delivery.

### The Flow:

```
[AppointmentService]
       │
       ▼
"Appointment Cancelled" Event
       │
       ├───────────────┐
       ▼               ▼
[EmailListener]  [InAppNotificationListener]
 (Sends Email)    (Saves to DB/WebSocket)
```

---

## 🛠️ HOW — Implementation Scaffold

> **Note:** This is an architectural scaffold to teach the pattern. A full implementation would require configuring an SMTP server (like SendGrid) and WebSockets.

### 1. Define the Event

```java
public class PatientCriticalEvent {
    private final Long patientId;
    private final String message;
    
    // Constructor, getters...
}
```

### 2. Publish the Event (in PatientService)

```java
import org.springframework.context.ApplicationEventPublisher;

@Service
public class PatientService {
    private final ApplicationEventPublisher eventPublisher;

    public void updateVitals(Long id, Vitals vitals) {
        // ... save vitals ...
        
        if (vitals.isCritical()) {
            eventPublisher.publishEvent(
                new PatientCriticalEvent(id, "Heart rate critically low!")
            );
        }
    }
}
```

### 3. Listen for the Event (in NotificationService)

```java
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;

@Service
public class NotificationService {

    // @Async makes this run in a separate thread so it doesn't block the HTTP request
    @Async
    @EventListener
    public void handleCriticalPatient(PatientCriticalEvent event) {
        // 1. Save notification to database for the UI bell icon
        // 2. Send email to primary doctor
        // 3. (Optional) Send SMS to on-call nurse
    }
}
```

---

## 📚 Software Engineering Concepts

### 1. Event-Driven Architecture (EDA)

EDA is a software design pattern where decoupled applications or components asynchronously publish and subscribe to events.

### 2. The Observer Pattern

This is the classic Gang of Four "Observer Pattern".
- **Subject** (Publisher): The thing that changes state (e.g., `PatientService`)
- **Observer** (Listener): The thing that cares about the change (e.g., `NotificationService`)

### 3. Loose Coupling

Why not just have `PatientService` call `NotificationService.sendEmail()` directly?
Because `PatientService` shouldn't care *how* notifications are sent. If tomorrow we add SMS notifications, we just add a new listener. We don't have to touch the `PatientService` code. This is the **Open/Closed Principle** (open for extension, closed for modification).

### 4. Synchronous vs Asynchronous

- **Synchronous**: The user clicks "Save Vitals", the server saves them, sends an email (takes 2 seconds), then returns "Success" to the user. The user waits 2 seconds.
- **Asynchronous (`@Async`)**: The user clicks "Save", the server saves them, publishes an event, and immediately returns "Success". A background thread sends the email. The user doesn't wait.

### 5. Delivery Mechanisms

A complete notification system usually has three delivery tiers:
1. **In-App (Database)**: Polled by the frontend or pushed via WebSockets/SSE. Shows up in a "bell" icon.
2. **Email**: For non-urgent updates (e.g., "Your appointment is tomorrow").
3. **SMS / Push Notification**: For urgent alerts (e.g., "Critical patient status").

---

## 📖 Further Reading

- [Spring Events (Baeldung)](https://www.baeldung.com/spring-events)
- [Observer Design Pattern (Refactoring.guru)](https://refactoring.guru/design-patterns/observer)
- [Event-Driven Architecture (AWS)](https://aws.amazon.com/event-driven-architecture/)
- [SOLID Principles (Open/Closed)](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
