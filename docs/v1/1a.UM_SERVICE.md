# User Management Service Flows

## Overview

The Authentication Service is responsible for:

- User Registration
- Email Verification
- User Login
- User Logout
- JWT Authentication
- Password Hashing
- Rate Limiting
- OTP Management

This service is completely independent and communicates with other services through JWT authentication.

---

# Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| Cache | Memcached |
| Password Hashing | bcrypt |
| Authentication | JWT |
| Email Service | Nodemailer |

---

# Registration Flow

## Objective

Allow a new user to create an account after verifying ownership of their email address.

---

## Step 1 — User Registration Request

The user submits:

- Email
- Password

Example

```json
POST /auth/register

{
    "email": "john@example.com",
    "password": "mypassword"
}
```

---

## Step 2 — Validate Input

The server validates:

### Email

- Required
- Valid email format
- Must not already exist

If duplicate:

```
409 Conflict

Email already registered.
```

---

### Password

Requirements:

- Required
- Minimum 6 characters
- Maximum 20 characters

If invalid:

```
400 Bad Request
```

---

## Step 3 — Generate OTP

Generate a random 6-digit OTP.

Example:

```
482931
```

---

## Step 4 — Store OTP in Memcached

Key

```
otp:john@example.com
```

Value

```json
{
    "otp": "482931",
    "attempts": 0
}
```

TTL

```
3 minutes
```

The OTP is automatically removed after expiration.

---

## Step 5 — Send OTP Email

The Authentication Service sends the OTP to the user's email.

Example email:

```
Your verification code is

482931

This OTP expires in 3 minutes.
```

---

## Step 6 — User Verifies OTP

Example

```json
POST /auth/verify

{
    "email":"john@example.com",
    "otp":"482931"
}
```

---

## Step 7 — Verify OTP

Checks:

- OTP exists
- OTP has not expired
- OTP matches

If expired:

```
400 Bad Request

OTP expired.
```

If incorrect:

Increase verification attempts.

If attempts exceed 5:

- Delete OTP
- User must register again

---

## Step 8 — Create User

Hash the password using bcrypt.

Store:

```
email
passwordHash
createdAt
```

Example:

```
passwordHash

$2b$12$...........
```

Never store plain-text passwords.

---

## Step 9 — Remove OTP

Delete

```
otp:<email>
```

from Memcached.

---

## Step 10 — Generate JWT

Payload

```json
{
    "userId": 51,
    "email": "john@example.com"
}
```

Expiration

```
7 Days
```

---

## Step 11 — Registration Success

Response

```json
200 OK

{
    "token":"JWT"
}
```

The frontend stores the JWT.

---

# Login Flow

## Objective

Authenticate an existing user.

---

## Step 1 — User Login Request

```json
POST /auth/login

{
    "email":"john@example.com",
    "password":"mypassword"
}
```

---

## Step 2 — Check Blocked IP

Lookup

```
blocked:<ip>
```

If found:

```
429 Too Many Requests

Too many attempts.
Try again in 5 minutes.
```

---

## Step 3 — Retrieve User

Search by email.

If user does not exist:

Return

```
401 Unauthorized

Wrong credentials.
```

Never reveal whether the email exists.

---

## Step 4 — Compare Password

Use

```
bcrypt.compare()
```

Compare the submitted password with the stored hash.

---

## Success

Generate JWT.

Return

```json
{
    "token":"JWT"
}
```

Delete

```
failed:<ip>
```

from Memcached.

---

## Failure

Increase failed login count.

Key

```
failed:<ip>
```

Use Memcached increment operation.

TTL

```
5 minutes
```

If failures reach 5:

Create

```
blocked:<ip>
```

TTL

```
5 minutes
```

Return

```
401 Unauthorized

Wrong credentials.
```

---

# Logout Flow

## Objective

End the current user session.

---

## Step 1

User clicks Logout.

---

## Step 2

Frontend deletes the stored JWT.

---

## Step 3

User is redirected to the public landing page.

Since JWT authentication is stateless, the server performs no additional logout action.

---

# JWT Authentication

Each protected endpoint requires:

```
Authorization

Bearer <JWT>
```

Example Payload

```json
{
    "userId":51,
    "email":"john@example.com",
    "iat":123456789,
    "exp":123456999
}
```

---

# Password Security

Passwords are hashed using bcrypt before storage.

Never store:

```
password
```

Always store:

```
passwordHash
```

Password Requirements

- Minimum length: 6
- Maximum length: 20

---

# Memcached Usage

## OTP Cache

Key

```
otp:<email>
```

TTL

```
3 minutes
```

---

## Failed Login Counter

Key

```
failed:<ip>
```

TTL

```
5 minutes
```

Stores

```
1
2
3
4
5
```

---

## Blocked IP

Key

```
blocked:<ip>
```

TTL

```
5 minutes
```

---

# Security Measures

- Email validation
- Duplicate email prevention
- Password hashing with bcrypt
- Email verification before account creation
- OTP expiration after 3 minutes
- Maximum 5 OTP verification attempts
- Generic login error messages
- Failed login rate limiting
- Temporary IP blocking after 5 failed attempts
- JWT-based stateless authentication
- Plain-text passwords are never stored

---

# API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /auth/register | Register user and send OTP |
| POST | /auth/verify | Verify OTP and create account |
| POST | /auth/login | Login user |
| POST | /auth/logout | Client-side logout |
| GET | /auth/me | Validate JWT and return current user |

---

# Flow Diagrams

## Registration

```
User
    │
    ▼
Submit Email + Password
    │
    ▼
Validate Input
    │
    ▼
Duplicate Email Check
    │
    ▼
Generate OTP
    │
    ▼
Store OTP (Memcached)
    │
    ▼
Send Email
    │
    ▼
User Enters OTP
    │
    ▼
Verify OTP
    │
    ▼
Hash Password
    │
    ▼
Create User
    │
    ▼
Delete OTP
    │
    ▼
Generate JWT
    │
    ▼
Frontend Stores JWT
```

---

## Login

```
User
    │
    ▼
Submit Email + Password
    │
    ▼
Blocked IP?
    │
 ┌──┴─────┐
 │        │
Yes      No
 │        │
429       ▼
      Retrieve User
           │
           ▼
     Compare Password
      ┌────┴────┐
      │         │
  Success    Failure
      │         │
Generate JWT  Increment Failed Count
      │         │
      ▼         ▼
Return JWT   Block IP After 5 Attempts
```

---

## Logout

```
User
    │
    ▼
Click Logout
    │
    ▼
Frontend Deletes JWT
    │
    ▼
Redirect to Landing Page
```

