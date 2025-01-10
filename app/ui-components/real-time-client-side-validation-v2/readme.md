# Beginner’s Guide to Adding Dynamic Validation Classes and Feedback in React

This document walks you through the **basics** of adding **dynamic validation** to your form inputs in React, displaying **red or green borders** and **error or success messages**. We'll cover:

- **is-invalid** and **is-valid** classes  
- **invalid-feedback** and **valid-feedback** messages  
- Tracking **touched fields**  
- A simple **step-by-step** working example

---

## 1. Why Do We Need Dynamic Validation?

When building a form in React, it’s helpful to provide users with **immediate feedback** on whether their inputs are valid. We can change the **border color** of the input and display either **error messages** or **success messages** to guide them.

Typically, we do this by conditionally applying CSS classes like `"is-invalid"` or `"is-valid"`. In frameworks like **Bootstrap**, those classes cause **red** or **green** borders. Similarly, we can show `"invalid-feedback"` or `"valid-feedback"` text beneath the input.

---

## 2. Key Pieces of State

We need to manage **three** primary pieces of state:

1. **`formData`**: Holds the **current values** of all form fields.  
2. **`formErrors`**: Stores **error messages** for each field. If empty, the field is valid.  
3. **`touchedFields`**: Keeps track of whether the user has interacted with (or “touched”) a field. We only want to show feedback for fields that have been touched or after the user attempts to submit.

```jsx
// Example initial states:
const [formData, setFormData] = useState({
  username: "",
  password: ""
});

const [formErrors, setFormErrors] = useState({});
const [touchedFields, setTouchedFields] = useState({});
```

---

## 3. The `validateField` Function

This function checks if a particular **field** is **valid**. If not, it sets an **error message** in `formErrors`. Below is a simplified example for `username` and `password`:

```jsx
const validateField = (fieldName, value) => {
  let error = "";

  switch (fieldName) {
    case "username":
      if (!value || value.trim() === "") {
        error = "Username is required.";
      }
      break;
    case "password":
      if (!value || value.trim().length < 6) {
        error = "Password must be at least 6 characters.";
      }
      break;
    default:
      break;
  }

  setFormErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: error
  }));
};
```

**How it works:**
- We check the **field name** in a switch statement.  
- If the **rule** isn’t met (e.g., “must not be empty”), we set an error message.  
- Updating `formErrors[fieldName]` with an empty string means **no error**.

---

## 4. Helper Functions for Dynamic Classes and Feedback

To avoid cluttering our JSX, we create **three** helper functions that decide what class or text to display based on `touchedFields` and `formErrors`.

### 4.1 `getValidationClass(fieldName)`

```jsx
const getValidationClass = (fieldName) => {
  // If the field is NOT touched, we don't show any special class
  if (!touchedFields[fieldName]) {
    return "";
  }
  // If there's an error in formErrors, it's invalid. Otherwise, valid.
  return formErrors[fieldName] ? "is-invalid" : "is-valid";
};
```

- Returns `""` (empty string) if the user hasn’t touched the field yet.  
- If they have touched it and there’s an error, return `"is-invalid"`.  
- If they have touched it and there’s no error, return `"is-valid"`.

### 4.2 `getFeedbackClass(fieldName)`

```jsx
const getFeedbackClass = (fieldName) => {
  if (!touchedFields[fieldName]) {
    return "";
  }
  return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
};
```

- Similar logic, but this time we return `"invalid-feedback"` or `"valid-feedback"` for the feedback `<div>`.

### 4.3 `getFeedbackMessage(fieldName)`

```jsx
const getFeedbackMessage = (fieldName) => {
  // If not touched, show nothing
  if (!touchedFields[fieldName]) {
    return "";
  }
  // If there's an error, return that message. Otherwise, "Looks good!"
  return formErrors[fieldName] || "Looks good!";
};
```

- Returns **no message** if the field is not touched.  
- Shows the **error message** if there is one, or a success message (e.g. `"Looks good!"`) if it’s valid.

---

## 5. Handling Input Changes (`handleInputChange`)

When a user types into an input or changes a select/checkbox, we:

1. Update the **`formData`** with the new value.  
2. Mark that field as **touched**.  
3. Run **`validateField`** for immediate feedback.

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Update the field data
  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));

  // Mark the field as touched
  setTouchedFields((prev) => ({
    ...prev,
    [name]: true
  }));

  // Validate right away
  validateField(name, value);
};
```

---

## 6. Submitting the Form (`handleSubmit`)

When the user clicks **Submit**:

1. We **prevent** the default form submit with `e.preventDefault()`.  
2. Mark **all** fields as touched, so all fields show any errors or success states.  
3. Validate each field.  
4. If no errors, the form is valid.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  let validForm = true;

  // Mark all fields as touched
  const fieldNames = Object.keys(formData);
  const updatedTouched = {};
  fieldNames.forEach((field) => {
    updatedTouched[field] = true;
  });
  setTouchedFields(updatedTouched);

  // Validate all fields
  fieldNames.forEach((field) => {
    validateField(field, formData[field]);
    // If there's an error, the form isn't valid
    if (formErrors[field]) {
      validForm = false;
    }
  });

  // Check final validity
  if (validForm) {
    alert("Form is valid and ready to submit!");
    // Submit data to an API or handle it as needed
  } else {
    alert("Please correct the errors before submitting.");
  }
};
```

---

## 7. Putting It All Together: A Simple Example

Below is a **working** minimal example showing all the steps in action. Adjust it for your actual field names (e.g., job postings, etc.):

```jsx
import React, { useState } from "react";

export default function BeginnerValidationForm() {
  // 1. State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // 2. State for errors + touched fields
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  // 3. Validation logic for each field
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "username":
        if (!value || value.trim() === "") {
          error = "Username is required.";
        }
        break;
      case "password":
        if (!value || value.trim().length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // 4. Helper functions for classes/messages
  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) return "";
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  };

  const getFeedbackClass = (fieldName) => {
    if (!touchedFields[fieldName]) return "";
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  };

  const getFeedbackMessage = (fieldName) => {
    if (!touchedFields[fieldName]) return "";
    return formErrors[fieldName] || "Looks good!";
  };

  // 5. Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  // 6. Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let validForm = true;

    // Mark all fields as touched
    const fields = Object.keys(formData);
    const updatedTouched = {};
    fields.forEach((field) => {
      updatedTouched[field] = true;
    });
    setTouchedFields(updatedTouched);

    // Validate all fields
    fields.forEach((field) => {
      validateField(field, formData[field]);
      if (formErrors[field]) {
        validForm = false;
      }
    });

    if (validForm) {
      alert("Form is valid and ready to submit!");
    } else {
      alert("There are errors in the form. Please fix them.");
    }
  };

  // 7. JSX with dynamic classes and feedback
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Beginner Validation Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${getValidationClass("username")}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <div className={getFeedbackClass("username")}>
            {getFeedbackMessage("username")}
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${getValidationClass("password")}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className={getFeedbackClass("password")}>
            {getFeedbackMessage("password")}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
```

**What’s Happening in the Example?**

1. **Username & Password** fields are displayed.  
2. When you type, `handleInputChange`:
   - Updates `formData`.  
   - Marks the field as touched.  
   - Calls `validateField`.  
3. `validateField` sets an error message in `formErrors` if the rule isn’t met.  
4. `getValidationClass`, `getFeedbackClass`, `getFeedbackMessage` return the appropriate classes/messages based on `touchedFields` and `formErrors`.  
5. On submit, **all** fields are set to touched, validated, and you’re alerted if the form is good or has errors.

---

## 8. Summary

- **`formData`** stores all input values.  
- **`formErrors`** stores any validation errors.  
- **`touchedFields`** ensures you don’t show red/green borders until the user actually interacts with a field (or tries to submit).  
- **`validateField`** sets an error message if a rule fails.  
- **Helper Functions** (`getValidationClass`, `getFeedbackClass`, `getFeedbackMessage`) **conditionally** apply `"is-invalid" / "is-valid"` and `"invalid-feedback" / "valid-feedback"` classes to style your fields.  

With this **step-by-step** approach, even a **beginner** can easily add **Bootstrap-like** validation feedback to any React form, providing a user-friendly experience. Feel free to add more fields, more complex validation rules, or even adopt a library like **Formik** or **React Hook Form** if your forms get more advanced.

**Happy coding!**