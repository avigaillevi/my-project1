# UI Improvements – Explanation

## What changed

### 1. Custom Hook (useFetch)
Extracted repeated API logic into a reusable custom hook.

- Centralized data fetching logic
- Handles loading, error, and data states
- Replaces duplicated useEffect + useState patterns across all screens
- Improves code readability and maintainability

---

### 2. Error Handling Improvements
Implemented more professional and user-friendly error handling.

- Added Error Boundary to catch runtime errors
- Replaced technical API error messages with user-friendly UI messages
- Added dedicated handling for 404 cases (Not Found states)
- Added “Try Again” button to allow retrying failed requests

---

### 3. Color System
Replaced inconsistent Tailwind colors with a unified Indigo-based palette for better visual consistency.

- Standardized primary, hover, and background colors
- Removed inconsistent usage of multiple color families
- Improved overall design consistency across the app

---

### 4. Layout Fixes
Fixed alignment issues using Flex and Grid utilities for better responsive behavior.

- Fixed centering issues in empty/error states
- Improved grid layout for product listing
- Better spacing and alignment across components

---

### 5. Dark Mode
Added manual dark mode toggle using Tailwind's `dark:` classes and toggling `dark` class on `<html>`.

- Toggle implemented via `document.documentElement.classList.toggle("dark")`
- Added support for dark styles using Tailwind `dark:` variants
- Improved readability in low-light mode

---

### 6. Empty States
Improved UX by adding proper UI for:

- Empty cart
- Product not found
- Search no results

- Added illustrations (where applicable)
- Better messaging for user clarity
- More consistent visual feedback

---

### 7. Loading States
Improved loading experience.

- Replaced simple loaders with skeleton loaders
- Better visual feedback during API requests
- More modern UX feel

---

### 8. Animations (Framer Motion)
Enhanced UI with smooth transitions.

- Added fade-in animations for pages
- Added subtle animations for cards
- Improved perceived performance and UX

---

### 9. Code Cleanup
General project cleanup and standardization.

- Removed unnecessary console.log statements
- Ensured consistent naming conventions:
  - camelCase for variables
  - PascalCase for components
- Reduced code duplication across components

---

## Why

The previous UI had inconsistent styling, duplicated logic, and limited UX handling.

The goal was to create a clean, scalable, and maintainable system with:

- Reusable logic (hooks)
- Consistent design system
- Better error handling
- Improved user experience
- Modern UI behaviors (dark mode + animations)
