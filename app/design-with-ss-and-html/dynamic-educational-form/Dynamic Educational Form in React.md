### Documentation: Dynamic Educational Form in React

This guide will walk you step-by-step through the process of creating a dynamic educational form in React, where users can add multiple educational entries. It's designed for beginners who are new to React.

---

### 1. **Set Up the React Component**

- **Create the component**: Start by creating a new component (e.g., `CreateCandidateForm.js`).
- **Import `useState`**: Use React’s `useState` hook to manage the form data and dynamic educational details.

```javascript
import React, { useState } from 'react';
```

---

### 2. **Define Initial State**

- **Define the `formData` state**: Store the general form data (like name, email, etc.) in an object.
- **Define the `educationalDetails` state**: This state will hold an array of educational detail entries.

```javascript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  // Add other form fields as needed
});

const [educationalDetails, setEducationalDetails] = useState([
  {
    institute: '',
    major: '',
    degree: '',
    durationStartMonth: '',
    durationStartYear: '',
    durationEndMonth: '',
    durationEndYear: '',
    currentlyPursuing: false,
  },
]);
```

---

### 3. **Handle Form Changes**

- **Define `handleChange` function**: This function updates the state when the user types or interacts with the form fields (e.g., text inputs or checkboxes).
  
```javascript
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox') {
    setFormData({
      ...formData,
      [name]: checked,
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};
```

- **Handle file inputs**: Use a similar approach for file inputs like resume, cover letter, etc.

```javascript
const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData({
    ...formData,
    [name]: files[0],
  });
};
```

---

### 4. **Add New Educational Detail**

- **Add a new entry to the `educationalDetails` array**: Define a function `addEducationalDetail` to add an empty educational detail entry to the state.

```javascript
const addEducationalDetail = () => {
  setEducationalDetails([
    ...educationalDetails,
    {
      institute: '',
      major: '',
      degree: '',
      durationStartMonth: '',
      durationStartYear: '',
      durationEndMonth: '',
      durationEndYear: '',
      currentlyPursuing: false,
    },
  ]);
};
```

---

### 5. **Handle Educational Detail Changes**

- **Define `handleEducationalDetailChange`**: This function updates the specific entry in the `educationalDetails` array. It accepts the index of the detail being edited and updates the corresponding field.

```javascript
const handleEducationalDetailChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  const updatedEducationalDetails = [...educationalDetails];
  
  if (type === 'checkbox') {
    updatedEducationalDetails[index][name] = checked;
  } else {
    updatedEducationalDetails[index][name] = value;
  }

  setEducationalDetails(updatedEducationalDetails);
};
```

---

### 6. **Render Educational Form Fields Dynamically**

- **Map through the `educationalDetails` state**: For each entry in the array, render input fields for `institute`, `major`, `degree`, and other details.
- **Pass the index to `handleEducationalDetailChange`** to update the right entry when the user types.

```javascript
{educationalDetails.map((detail, index) => (
  <React.Fragment key={index}>
    <tr>
      <td>Institute / School</td>
      <td><input type="text" name="institute" value={detail.institute} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
    </tr>
    <tr>
      <td>Major / Department</td>
      <td><input type="text" name="major" value={detail.major} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
    </tr>
    <tr>
      <td>Degree</td>
      <td><input type="text" name="degree" value={detail.degree} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
    </tr>
    <tr>
      <td>Currently Pursuing</td>
      <td>
        <input type="checkbox" name="currentlyPursuing" checked={detail.currentlyPursuing} onChange={(e) => handleEducationalDetailChange(index, e)} />
      </td>
    </tr>
  </React.Fragment>
))}
```

---

### 7. **Add "Add Educational Details" Button**

- **Create a button** to add new educational details dynamically.
- **Call `addEducationalDetail`** when the button is clicked.

```javascript
<button type="button" onClick={addEducationalDetail}>+ Add Educational Details</button>
```

---

### 8. **Log Data Changes**

- **Log the form data**: Optionally, add console logs to track the old and new data whenever the user types in the form.

```javascript
console.log('Old Form Data:', oldData);
console.log('New Form Data:', newData);
```

---

### 9. **Complete Form Structure**

- **Render other sections** of the form, such as basic info, professional details, social links, and attachment fields.
- **Ensure each section is similar to the educational details** where required.

---

### 10. **Final Code Example**

Here’s the final code for a dynamic form with the educational details functionality:

```javascript
"use client";
import React, { useState } from 'react';

const CreateCandidateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Other fields...
  });

  const [educationalDetails, setEducationalDetails] = useState([
    {
      institute: '',
      major: '',
      degree: '',
      durationStartMonth: '',
      durationStartYear: '',
      durationEndMonth: '',
      durationEndYear: '',
      currentlyPursuing: false,
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const oldData = { ...formData };

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    const newData = { ...formData };
    console.log('Old Form Data:', oldData);
    console.log('New Form Data:', newData);
  };

  const handleEducationalDetailChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const oldEducationalDetails = [...educationalDetails];

    const updatedEducationalDetails = [...educationalDetails];
    if (type === 'checkbox') {
      updatedEducationalDetails[index][name] = checked;
    } else {
      updatedEducationalDetails[index][name] = value;
    }
    setEducationalDetails(updatedEducationalDetails);

    const newEducationalDetails = [...updatedEducationalDetails];
    console.log('Old Educational Details:', oldEducationalDetails);
    console.log('New Educational Details:', newEducationalDetails);
  };

  const addEducationalDetail = () => {
    setEducationalDetails([
      ...educationalDetails,
      {
        institute: '',
        major: '',
        degree: '',
        durationStartMonth: '',
        durationStartYear: '',
        durationEndMonth: '',
        durationEndYear: '',
        currentlyPursuing: false,
      },
    ]);
  };

  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form>
        <table className="table table-bordered">
          <tbody>
            {/* Render Basic Info, Address, Social Links, etc. */}

            <tr>
              <th colSpan="4">Educational Details</th>
            </tr>
            {educationalDetails.map((detail, index) => (
              <React.Fragment key={index}>
                {/* Educational form fields */}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="4">
                <button type="button" onClick={addEducationalDetail}>+ Add Educational Details</button>
              </td>
            </tr>
            {/* Render Other Sections */}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
```

---

### 11. **Conclusion**

This dynamic form allows users to add and manage multiple educational details. You can extend the functionality to other sections by following the same pattern. React's `useState` makes it simple to handle form data, and the concept of dynamically adding fields based on state helps create flexible, user-friendly forms.

