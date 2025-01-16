### Documentation: Dynamic Educational Form in React

This guide will walk you step-by-step through the process of creating a dynamic educational form in React, where users can add multiple educational entries. It's designed for beginners who are new to React.

To implement the "Add Educational Details" functionality dynamically, we will mimic the existing "Educational Details" section whenever the user clicks the **`+ Add Educational Details`** button. Here's the updated code snippet:

### Steps to Add Educational Details Dynamically

#### 1. Update State to Handle Dynamic Educational Details
Add a state to track multiple educational details:

```jsx
const [educationalDetails, setEducationalDetails] = useState([
  { institute: "", major: "", degree: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyPursuing: false },
]);
```

#### 2. Create Helper Functions
Define functions to add, update, and remove educational details dynamically.

```jsx
const handleEducationChange = (index, field, value) => {
  const updatedDetails = educationalDetails.map((detail, idx) =>
    idx === index ? { ...detail, [field]: value } : detail
  );
  setEducationalDetails(updatedDetails);
};

const addEducationalDetail = () => {
  setEducationalDetails([
    ...educationalDetails,
    { institute: "", major: "", degree: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyPursuing: false },
  ]);
};

const removeEducationalDetail = (index) => {
  setEducationalDetails(educationalDetails.filter((_, idx) => idx !== index));
};
```

#### 3. Render Educational Details Dynamically
Replace the static "Educational Details" section with a dynamic rendering based on the `educationalDetails` array.

```jsx
<tr className="border">
  <th colSpan="4" className="border">Educational Details</th>
</tr>
{educationalDetails.map((detail, index) => (
  <React.Fragment key={index}>
    <tr className="border-0">
      <td className="border-0 text-end">
        <label htmlFor={`institute-${index}`} className="form-label">
          Institute / School
        </label>
      </td>
      <td className="border-0">
        <input
          type="text"
          className={`form-control form-control-sm small-placeholder`}
          id={`institute-${index}`}
          name="institute"
          placeholder="Institute"
          value={detail.institute}
          onChange={(e) => handleEducationChange(index, "institute", e.target.value)}
        />
      </td>
      <td className="border-0 text-end">
        <label htmlFor={`major-${index}`} className="form-label">
          Major / Department
        </label>
      </td>
      <td className="border-0">
        <input
          type="text"
          className={`form-control form-control-sm small-placeholder`}
          id={`major-${index}`}
          name="major"
          placeholder="Major"
          value={detail.major}
          onChange={(e) => handleEducationChange(index, "major", e.target.value)}
        />
      </td>
    </tr>
    <tr className="border-0">
      <td className="border-0 text-end">
        <label htmlFor={`degree-${index}`} className="form-label">
          Degree
        </label>
      </td>
      <td className="border-0">
        <input
          type="text"
          className={`form-control form-control-sm small-placeholder`}
          id={`degree-${index}`}
          name="degree"
          placeholder="Degree"
          value={detail.degree}
          onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
        />
      </td>
      <td className="border-0 text-end">
        <label htmlFor={`duration-${index}`} className="form-label">
          Duration
        </label>
      </td>
      <td className="border-0">
        <div className="d-flex">
          <select
            className={`form-control form-control-sm small-placeholder`}
            id={`startMonth-${index}`}
            name="startMonth"
            value={detail.startMonth}
            onChange={(e) => handleEducationChange(index, "startMonth", e.target.value)}
          >
            <option value="">Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
          <select
            className={`form-control form-control-sm small-placeholder`}
            id={`startYear-${index}`}
            name="startYear"
            value={detail.startYear}
            onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
          >
            <option value="">Year</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
          <span className="mx-2">To</span>
          <select
            className={`form-control form-control-sm small-placeholder`}
            id={`endMonth-${index}`}
            name="endMonth"
            value={detail.endMonth}
            onChange={(e) => handleEducationChange(index, "endMonth", e.target.value)}
          >
            <option value="">Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
          <select
            className={`form-control form-control-sm small-placeholder`}
            id={`endYear-${index}`}
            name="endYear"
            value={detail.endYear}
            onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
          >
            <option value="">Year</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
        </div>
      </td>
    </tr>
    <tr className="border-0">
      <td className="border-0 text-end">
        <label htmlFor={`currentlyPursuing-${index}`} className="form-label">
          Currently Pursuing
        </label>
      </td>
      <td className="border-0">
        <input
          type="checkbox"
          id={`currentlyPursuing-${index}`}
          name="currentlyPursuing"
          checked={detail.currentlyPursuing}
          onChange={(e) => handleEducationChange(index, "currentlyPursuing", e.target.checked)}
        />
      </td>
      <td className="border-0"></td>
      <td className="border-0">
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => removeEducationalDetail(index)}
        >
          Remove
        </button>
      </td>
    </tr>
  </React.Fragment>
))}

<tr className="border">
  <th colSpan="4" className="border">
    <button
      className="btn btn-link text-primary"
      type="button"
      onClick={addEducationalDetail}
    >
      + Add Educational Details
    </button>
  </th>
</tr>
```

### What Happens Here?
1. **Dynamic State**: Each educational detail is an object in the `educationalDetails` array.
2. **Add Detail**: Clicking the `+ Add Educational Details` button appends a new detail object.
3. **Remove Detail**: Clicking the "Remove" button deletes the specific educational detail.
4. **Dynamic Rendering**: Each detail renders dynamically based on the state.

### Next Steps
- **Form Submission**: Include `educationalDetails` in the final `formData`.
- **Validation**: Add validation for each educational detail, if needed.


Here is the full updated code for the `CreateCandidateForm` component, including the dynamic **Educational Details** section with the ability to add, update, and remove entries.

### Full Code

```jsx
"use client";
import React, { useState } from "react";

const CreateCandidateForm = () => {
  // 1) INITIAL STATES
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    phone: "",
    website: "",
    secondaryEmail: "",
    street: "",
    province: "",
    city: "",
    postalCode: "",
    country: "",
    experience: "",
    currentJobTitle: "",
    expectedSalary: "",
    skillSet: "",
    skypeId: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    candidateStatus: "",
    candidateOwner: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Educational Details State
  const [educationalDetails, setEducationalDetails] = useState([
    { institute: "", major: "", degree: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyPursuing: false },
  ]);

  // 2) HELPER FUNCTIONS

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Educational Details Handlers
  const handleEducationChange = (index, field, value) => {
    const updatedDetails = educationalDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setEducationalDetails(updatedDetails);
  };

  const addEducationalDetail = () => {
    setEducationalDetails([
      ...educationalDetails,
      { institute: "", major: "", degree: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyPursuing: false },
    ]);
  };

  const removeEducationalDetail = (index) => {
    setEducationalDetails(educationalDetails.filter((_, idx) => idx !== index));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, educationalDetails };
    console.log("Form Submitted:", finalData);
    alert("Form submitted successfully!");
  };

  // 3) FORM RENDERING
  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form onSubmit={handleSubmit}>
        {/* BASIC INFO */}
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">Basic Info</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="firstName" className="form-label">First Name</label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </td>
              <td className="border-0 text-end">
                <label htmlFor="lastName" className="form-label">Last Name</label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            {/* Add other form fields as needed */}
          </tbody>
        </table>

        {/* EDUCATIONAL DETAILS */}
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">Educational Details</th>
            </tr>
            {educationalDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor={`institute-${index}`} className="form-label">Institute / School</label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id={`institute-${index}`}
                      name="institute"
                      placeholder="Institute"
                      value={detail.institute}
                      onChange={(e) => handleEducationChange(index, "institute", e.target.value)}
                    />
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor={`major-${index}`} className="form-label">Major / Department</label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id={`major-${index}`}
                      name="major"
                      placeholder="Major"
                      value={detail.major}
                      onChange={(e) => handleEducationChange(index, "major", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor={`degree-${index}`} className="form-label">Degree</label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id={`degree-${index}`}
                      name="degree"
                      placeholder="Degree"
                      value={detail.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    />
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor={`duration-${index}`} className="form-label">Duration</label>
                  </td>
                  <td className="border-0">
                    <div className="d-flex">
                      <select
                        className="form-control form-control-sm"
                        id={`startMonth-${index}`}
                        name="startMonth"
                        value={detail.startMonth}
                        onChange={(e) => handleEducationChange(index, "startMonth", e.target.value)}
                      >
                        <option value="">Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <select
                        className="form-control form-control-sm"
                        id={`startYear-${index}`}
                        name="startYear"
                        value={detail.startYear}
                        onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                      >
                        <option value="">Year</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                      </select>
                      <span className="mx-2">To</span>
                      <select
                        className="form-control form-control-sm"
                        id={`endMonth-${index}`}
                        name="endMonth"
                        value={detail.endMonth}
                        onChange={(e) => handleEducationChange(index, "endMonth", e.target.value)}
                      >
                        <option value="">Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <select
                        className="form-control form-control-sm"
                        id={`endYear-${index}`}
                        name="endYear"
                        value={detail.endYear}
                        onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                      >
                        <option value="">Year</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor={`currentlyPursuing-${index}`} className="form-label">Currently Pursuing</label>
                  </td>
                  <td className="border-0">
                    <input
                      type="checkbox"
                      id={`currentlyPursuing-${index}`}
                      name="currentlyPursuing"
                      checked={detail.currentlyPursuing}
                      onChange={(e) => handleEducationChange(index, "currentlyPursuing", e.target.checked)}
                    />
                  </td>
                  <td className="border-0"></td>
                  <td className="border-0">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeEducationalDetail(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
            <tr className="border">
              <th colSpan="4" className="border">
                <button
                  className="btn btn-link text-primary"
                  type="button"
                  onClick={addEducationalDetail}
                >
                  + Add Educational Details
                </button>
              </th>
            </tr>
          </tbody>
        </table>

        {/* SUBMIT BUTTON */}
        <div className="d-flex justify-content-end gap-3">
          <button type="submit" className="btn btn-primary">
            Save and Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
```

### Features of This Implementation
1. **Dynamic Educational Details**:
   - Users can add multiple educational entries dynamically.
   - Each entry has fields for the institute, major, degree, duration, and currently pursuing.

2. **Form Validation**:
   - You can extend the `formErrors` logic to include validation for educational details.

3. **Seamless UI**:
   - Users can dynamically manage (add or remove) entries.

4. **Submission**:
   - All form data, including educational details, is included in the `finalData` during form submission.