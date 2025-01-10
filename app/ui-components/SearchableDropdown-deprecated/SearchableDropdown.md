Here’s a step-by-step guide to implement the custom dropdown with features like search, keyboard navigation, and closing when clicking outside, specifically designed for beginners.

---

### Step 1: **Set Up React Project**
1. Create a new React project if you don't already have one:
   ```bash
   npx create-react-app custom-dropdown
   cd custom-dropdown
   npm start
   ```
   
---

### Step 2: **Create a Component**
1. Open the `src` folder in your project directory and create a new file `CustomSelect2.js`.

---

### Step 3: **Basic Structure of the Component**

In `CustomSelect2.js`, we start by creating the basic structure of our dropdown.

1. **Import necessary React hooks:**
   - `useState`: For managing states like selected options and search input.
   - `useEffect`: For handling side-effects like closing the dropdown when clicking outside.
   - `useRef`: For creating references to elements like the dropdown container.

```jsx
import React, { useState, useEffect, useRef } from 'react';
```

2. **Create the dropdown component:**

```jsx
const CustomSelect2 = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selected, setSelected] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef(null); // Reference for dropdown
  const inputRef = useRef(null); // Reference for input field
```

---

### Step 4: **Filter Options Based on Search**
1. We need to filter the options based on what the user types in the search box. We can use `useEffect` to filter the options every time the `search` state changes.

```jsx
useEffect(() => {
  setFilteredOptions(options.filter(option => option.toLowerCase().includes(search.toLowerCase())));
}, [search]);
```

---

### Step 5: **Handle Clicking Outside the Dropdown**

1. To close the dropdown when clicking outside of it, we’ll use `useEffect` to listen for mouse clicks on the document.
2. We’ll use the `dropdownRef` reference to detect if the click occurred outside the dropdown.

```jsx
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  // Clean up listener when component unmounts
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
```

---

### Step 6: **Handle Dropdown Selection**

1. We need to handle selecting an option. When an option is clicked, we’ll set the `selected` state to the clicked option, close the dropdown, and reset the search box.

```jsx
const handleSelect = (option) => {
  setSelected(option);
  setIsOpen(false);
  setSearch("");
  setHighlightedIndex(-1);
};
```

---

### Step 7: **Handle Arrow Navigation and Enter Key**

1. We need to allow the user to navigate through the options using the `ArrowDown` and `ArrowUp` keys. The `Enter` key will select the highlighted option.

```jsx
const handleKeyDown = (e) => {
  if (!isOpen) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setHighlightedIndex((prevIndex) => Math.min(filteredOptions.length - 1, prevIndex + 1));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
  } else if (e.key === 'Enter' && highlightedIndex >= 0) {
    e.preventDefault();
    handleSelect(filteredOptions[highlightedIndex]);
  }
};
```

---

### Step 8: **Handle Input Change**

1. We will update the `search` state as the user types in the search box.

```jsx
const handleSearchChange = (e) => {
  setSearch(e.target.value);
};
```

---

### Step 9: **Rendering the Dropdown**

1. Now let’s combine everything and render the dropdown, input field, and options list.

```jsx
return (
  <div className="position-relative">
    <div 
      className="form-control d-flex align-items-center justify-content-between"
      onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/close
      style={{ cursor: "pointer" }}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Makes the div focusable
    >
      <span>{selected || "Select an option"}</span>
      <span className="ms-2">&#9660;</span> {/* Down arrow */}
    </div>

    {isOpen && (
      <div ref={dropdownRef} className="dropdown-menu show" style={{ width: "100%" }}>
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <ul className="list-unstyled p-0" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${highlightedIndex === index ? 'active' : ''}`}
              onClick={() => handleSelect(option)}
              style={{
                backgroundColor: highlightedIndex === index ? '#f1f1f1' : 'transparent', // Highlight the selected item
                cursor: "pointer"
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
```

---

### Step 10: **Styling**

- You can use Bootstrap’s built-in styles for the dropdown. If you want to change the style of the dropdown, you can adjust the classes or use custom styles.

For example, you can add the following in your `App.css` to customize the active option:

```css
.dropdown-item.active {
  background-color: #f1f1f1;
}
```

---

### Step 11: **Using the Component**

1. Import the `CustomSelect2` component in your `App.js` file and render it.

```jsx
import React from 'react';
import CustomSelect2 from './CustomSelect2'; // Path to your component

function App() {
  return (
    <div className="App">
      <CustomSelect2 />
    </div>
  );
}

export default App;
```

---

### Final Notes:

1. **State Management**: We use `useState` to manage the state of the selected option, the search input, the dropdown visibility, and the highlighted option.
2. **Handling Events**: We handle `mousedown` to close the dropdown when clicking outside, `keydown` to handle keyboard navigation, and `click` to select an option.
3. **Use of `useRef`**: The `dropdownRef` is used to detect clicks outside the dropdown, and `inputRef` is used to focus on the search input when the dropdown is opened.

---

Now, you should have a fully functional custom dropdown with search, keyboard navigation, and the ability to close when clicking outside!