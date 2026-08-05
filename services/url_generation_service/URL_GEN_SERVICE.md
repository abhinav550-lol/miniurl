For the **URL Generation Service**, the user stories should cover all the business flows this service owns. Here's a comprehensive breakdown.

---

# URL Generation Service - User Stories

## Epic 1: Create Short URL

### US-1: Create a Short URL (Auto-generated Code)

**As a** user (authenticated or guest, depending on business rules)
**I want** to shorten a valid URL
**So that** I can easily share it.

### Flow

1. User submits a long URL.
2. Service validates the URL format.
3. Service generates a globally unique short code.
4. Service stores the mapping.
5. Service returns the shortened URL.

### Acceptance Criteria

* Invalid URLs are rejected.
* Generated code is unique.
* URL mapping is stored successfully.
* Short URL is returned.

---

## Epic 2: Custom Alias

### US-2: Create Short URL with Custom Alias

**As a** user
**I want** to specify my own alias
**So that** the short URL is meaningful.

### Flow

1. User submits URL.
2. User enters custom alias.
3. Service validates alias format.
4. Service checks if alias already exists.
5. If available, mapping is stored.
6. Short URL is returned.

### Acceptance Criteria

* Alias must be unique.
* Duplicate aliases return an error.
* Invalid alias format is rejected.
* Mapping is stored.

---

## Epic 3: URL Validation

### US-3: Validate Submitted URL

**As a** system
**I want** to validate URLs before shortening
**So that** invalid URLs are never stored.

### Flow

1. Receive URL.
2. Validate syntax.
3. Reject unsupported schemes.
4. Continue only if valid.

### Acceptance Criteria

* Accept http and https.
* Reject malformed URLs.
* Return validation error.

---

## Epic 4: Unique Code Generation

### US-4: Generate Unique Short Code

**As a** system
**I want** every generated code to be unique
**So that** no collisions occur.

### Flow

1. Generate candidate code.
2. Check existence.
3. If collision occurs, generate another.
4. Store unique code.

### Acceptance Criteria

* No duplicate codes.
* Retry on collision.
* Globally unique.

---

# Epic 5: View My URLs

### US-5: View All URLs

**As an** authenticated user
**I want** to see all URLs I created
**So that** I can manage them.

### Flow

1. User requests URL list.
2. Service verifies ownership.
3. Fetch URLs.
4. Return paginated list.

### Acceptance Criteria

* Only owner's URLs are returned.
* Pagination supported.
* Metadata included.

---

## Epic 6: View URL Details

### US-6: View Single URL

**As an** authenticated user
**I want** to view one shortened URL
**So that** I can inspect its information.

### Flow

1. User requests URL details.
2. Verify ownership.
3. Return metadata.

### Acceptance Criteria

* Unauthorized users cannot access.
* Metadata returned successfully.

---

# Epic 7: Edit URL

### US-7: Edit Destination URL

**As an** authenticated user
**I want** to change the original destination URL
**So that** I can update broken or outdated links.

### Flow

1. User selects URL.
2. Verify ownership.
3. Validate new destination URL.
4. Update mapping.
5. Return updated data.

### Acceptance Criteria

* Ownership required.
* URL validated.
* Short code remains unchanged.

---

### US-8: Change Custom Alias (Optional)

**As an** authenticated user
**I want** to change my custom alias
**So that** I can rename my short URL.

### Flow

1. Verify ownership.
2. Validate new alias.
3. Check uniqueness.
4. Update alias.

### Acceptance Criteria

* Alias must be unique.
* Existing alias unavailable.
* URL remains accessible through new alias.

---

# Epic 8: Delete URL

### US-9: Delete Short URL

**As an** authenticated user
**I want** to delete my short URL
**So that** it is no longer usable.

### Flow

1. User requests deletion.
2. Verify ownership.
3. Delete mapping (or soft delete).
4. Confirm deletion.

### Acceptance Criteria

* Only owner can delete.
* Deleted URLs cannot be resolved.
* Metadata removed or marked deleted.

---

# Epic 9: Ownership Verification

### US-10: Verify URL Ownership

**As a** system
**I want** to verify ownership before management actions
**So that** users cannot modify others' URLs.

### Acceptance Criteria

* Edit requires ownership.
* Delete requires ownership.
* View requires ownership.

---

# Epic 10: Duplicate Alias Handling

### US-11: Reject Duplicate Alias

**As a** system
**I want** to reject duplicate aliases
**So that** every alias uniquely identifies one URL.

### Acceptance Criteria

* Existing alias returns conflict.
* No duplicate records created.

---

# Epic 11: Metadata Management

### US-12: Store URL Metadata

**As a** system
**I want** to save metadata for every URL
**So that** additional information can be retrieved later.

Metadata may include:

* Creation timestamp
* Last updated timestamp
* Owner ID
* Original URL
* Short code
* Custom alias (if any)
* Active/Deleted status

### Acceptance Criteria

* Metadata saved during creation.
* Metadata updated during edits.

---

# Summary of Required Flows

| User Story | Flow                                      |
| ---------- | ----------------------------------------- |
| US-1       | Create short URL (auto-generated)         | 2 
| US-2       | Create short URL with custom alias        | 3 
| US-3       | Validate submitted URL                    | 2a 
| US-4       | Generate globally unique short code       | 1 
| US-5       | View all user's URLs                      | 5 
| US-6       | View URL details                          | 4 
| US-7       | Edit original URL                         | 7 
| US-8       | Update custom alias (optional)            | 8
| US-9       | Delete URL                                | 6
| US-10      | Verify ownership for protected operations | 4a
| US-11      | Reject duplicate aliases                  | 3a
| US-12      | Store and manage URL metadata             | 2b

These user stories fully cover the responsibilities of the URL Generation Service while explicitly excluding authentication, redirection, and analytics, which belong to other services.
