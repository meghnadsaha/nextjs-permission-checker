Below is a **beginner-friendly** guide on how to show **valid** or **invalid** states in a form using **Bootstrap-style** classes (`is-valid`, `is-invalid`, `valid-feedback`, `invalid-feedback`) in React. This walkthrough will show you how to:

1. **Track validation errors** in state.  
2. **Dynamically assign** classes based on whether a field is valid or invalid.  
3. **Display feedback messages** below each field.

---

## 1. Why We Need `is-valid` / `is-invalid` and Feedback

In **Bootstrap** (and many similar CSS frameworks), adding the class `"is-invalid"` to an input automatically gives it a **red border**, indicating an error. Adding `"is-valid"` gives it a **green border**, indicating success or no error. 

Similarly, the `invalid-feedback` or `valid-feedback` classes let you place a message under the input, telling the user *what* the error is, or confirming that the field is correct.

Example:
```html
<input class="form-control is-invalid" />
<div class="invalid-feedback">This field is required.</div>
```
Renders an input with a red border and an error message.

---

## 2. Setting Up State for Validation

Typically, you’ll manage two pieces of state in React:

1. **Form data** (what the user types in each field).  
2. **Validation errors** (error messages for each field).

**Step 1**: Create these states in your component:

```jsx
const [formData, setFormData] = useState({
  username: "",
  email: ""
});

const [formErrors, setFormErrors] = useState({
  username: "", // will hold an error message if invalid
  email: ""     // will hold an error message if invalid
});
```

Here, `formData` holds the user’s input values, and `formErrors` holds the error message (if any) for each field. If `formErrors.username` is an empty string, that means **no error** for `username`.

---

## 3. Updating State on Input Changes

Create an **`handleInputChange`** function that updates both the `formData` and **validates** the input as the user types:

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Update the form data
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Validate the field immediately
  validateField(name, value);
};
```

Note that we also need a `validateField` function. We’ll define it next.

---

## 4. The `validateField` Function

This function checks if the new value is valid or not, and sets an error message if needed:

```jsx
const validateField = (fieldName, value) => {
  let errorMessage = "";

  switch (fieldName) {
    case "username":
      if (!value.trim()) {
        errorMessage = "Username is required.";
      }
      break;
    case "email":
      if (!value.trim()) {
        errorMessage = "Email is required.";
      } else if (!value.includes("@")) {
        errorMessage = "Email must contain an '@' symbol.";
      }
      break;
    default:
      break;
  }

  // Update the formErrors state
  setFormErrors((prev) => ({
    ...prev,
    [fieldName]: errorMessage
  }));
};
```

### Key Points:
- If there’s **no** error, `errorMessage` remains `""`, meaning the field is valid.  
- If something is wrong, we set a descriptive message in `formErrors[fieldName]`.

---

## 5. Determining Which CSS Class to Use: `is-invalid` or `is-valid`

When a field has an error (meaning `formErrors[fieldName]` is not an empty string), we want to show `"is-invalid"`. If there’s **no** error, we show `"is-valid"`.

We can write a **helper** function:

```jsx
const getValidationClass = (fieldName) => {
  return formErrors[fieldName] ? "is-invalid" : "is-valid";
};
```

- If `formErrors[fieldName]` has a message, we return `"is-invalid"`.  
- Otherwise, we return `"is-valid"`.

---

## 6. Displaying the Feedback Message: `invalid-feedback` / `valid-feedback`

We also need to place a `<div>` under the input to display the **error message** or a **success message**. Typically, we do something like:

- `<div className="invalid-feedback">{errorMessage}</div>` for errors.  
- `<div className="valid-feedback">Looks good!</div>` for success.

But we want to handle both in a **single** snippet of code. One way is:

```jsx
const getFeedbackClass = (fieldName) => {
  return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
};

const getFeedbackMessage = (fieldName) => {
  // If there's an error, show that message
  if (formErrors[fieldName]) {
    return formErrors[fieldName];
  }
  // Otherwise, show a success message or be empty
  return "Looks good!";
};
```

Alternatively, you could decide to only show success messages after the user **touched** the field. (We won’t cover “touched fields” in detail here, but it’s a common approach to hide “valid” messages until the user interacts.)

---

## 7. Putting It All Together in JSX

Below is a simplified example with two fields: `username` and `email`. Each input uses the `getValidationClass` function to decide if it should get `"is-invalid"` or `"is-valid"`. Then we display a `<div>` for the feedback:

```jsx
function SimpleForm() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [formErrors, setFormErrors] = useState({ username: "", email: "" });

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "username":
        if (!value.trim()) {
          errorMessage = "Username is required.";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required.";
        } else if (!value.includes("@")) {
          errorMessage = "Email must contain an '@' symbol.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Helper functions for dynamic classes & messages
  const getValidationClass = (fieldName) => {
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  };
  const getFeedbackClass = (fieldName) => {
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  };
  const getFeedbackMessage = (fieldName) => {
    return formErrors[fieldName] || "Looks good!";
  };

  return (
    <form>
      <div>
        <label>Username</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          className={`form-control ${getValidationClass("username")}`}
        />
        <div className={getFeedbackClass("username")}>
          {getFeedbackMessage("username")}
        </div>
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          className={`form-control ${getValidationClass("email")}`}
        />
        <div className={getFeedbackClass("email")}>
          {getFeedbackMessage("email")}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Explanation:

- **`className={`form-control ${getValidationClass("username")}`}**  
  - Calls `getValidationClass("username")`.  
  - If `formErrors.username` is non-empty, returns `"is-invalid"`. Else `"is-valid"`.  
- **Feedback `<div>`**:  
  - **`className={getFeedbackClass("username")}`**:  
    - Returns `"invalid-feedback"` or `"valid-feedback"`.  
  - **`{getFeedbackMessage("username")}`**:  
    - Returns the error message if there is one, otherwise “Looks good!”.

---

## 8. Final Tips

1. **When to Show “Valid” Feedback**:  
   - Many times, developers only show `"is-invalid"` or `"invalid-feedback"` for errors, and hide valid feedback altogether. The “Looks good!” is optional.
2. **Form Submission**:  
   - On submit, you might want to **re-validate all fields** or mark them as touched. If any field has an error, **prevent submission**.
3. **Optional vs. Required Fields**:  
   - If a field is **optional**, you can skip assigning an error if the field is empty.  
4. **Styling**:  
   - The classes **`is-invalid`** and **`is-valid`** come from Bootstrap. Make sure your project includes Bootstrap’s CSS, or a similar framework, to see the colored borders.

---

## Summary

Using **`is-invalid`**, **`is-valid`**, **`invalid-feedback`**, and **`valid-feedback`** in React requires two main steps:

1. **Track** whether each field has an error in your component’s state (`formErrors`).  
2. **Conditional Class Names**: If `formErrors[fieldName]` is empty, add `"is-valid"` (and `"valid-feedback"`). If it’s not empty, add `"is-invalid"` (and `"invalid-feedback"`).

You now have a **solid**, **beginner-friendly** method to give users immediate visual feedback about whether their input is correct (green) or needs attention (red). Use these techniques for **any** fields—text inputs, selects, checkboxes, etc.—and tailor the validation rules to your specific needs.