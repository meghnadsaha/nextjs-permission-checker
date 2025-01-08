Here’s a step-by-step guide to building a **tokenized tag input** in React with suggestions (like typing "java" and seeing related tags) using Bootstrap 5.3.3. I'll explain each step clearly for beginners.

---

### Step-by-Step Guide:

### **Step 1: Set Up Your React Project**

1. If you don’t have a React project yet, you can create one using the following commands:

   ```bash
   npx create-react-app tokenized-tag-input
   cd tokenized-tag-input
   npm start
   ```

   This creates a React project and runs it in your browser.

---

### **Step 2: Create a New Component for the Tag Input**

1. Inside the `src` folder, create a new file called `TokenizedTagInput.js`.
   
   This file will contain the logic for the tag input and suggestions.

2. Open `TokenizedTagInput.js` and add the following basic structure:

   ```jsx
   import React, { useState } from 'react';

   const TokenizedTagInput = () => {
     return <div>Hello, Tokenized Tag Input!</div>;
   };

   export default TokenizedTagInput;
   ```

3. This is your basic React component that you will build on.

---

### **Step 3: Add State Variables**

1. We need to manage several things:
   - **Tags**: The list of tags that the user adds.
   - **Input Value**: The current text the user types into the input field.
   - **Suggestions**: A list of suggested tags based on the user's input.

2. Update the `TokenizedTagInput` component with the following code to add state variables:

   ```jsx
   const [tags, setTags] = useState([]); // Store added tags
   const [inputValue, setInputValue] = useState(''); // Store current input value
   const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Store filtered suggestions
   const [isOpen, setIsOpen] = useState(false); // Track if suggestions are open
   ```

---

### **Step 4: Handle User Input**

1. We need a function to capture what the user types in the input field.

2. The `handleInputChange` function will update the `inputValue` state and filter suggestions based on that input.

   ```jsx
   const handleInputChange = (e) => {
     setInputValue(e.target.value);
     filterSuggestions(e.target.value);
   };
   ```

---

### **Step 5: Filter Suggestions Based on Input**

1. Next, we need a list of possible tags to suggest. For now, let’s hardcode it in the component. We'll filter this list based on what the user types.

2. Create a `suggestionList` array of possible tags, and use `filterSuggestions` to show suggestions based on the input.

   ```jsx
   const suggestionList = [
     "java", "javacard", "javascript", "javascriptmvc", "javaandj2ee", "javafx",
     "javase", "javabeans", "javamail", "javaapplets", "python", "reactjs", "angular",
     "nodejs", "html", "css", "csharp", "ruby", "go", "typescript", "swift"
   ];

   const filterSuggestions = (input) => {
     if (!input) {
       setFilteredSuggestions([]);
       setIsOpen(false);
       return;
     }
     const filtered = suggestionList.filter((item) =>
       item.toLowerCase().includes(input.toLowerCase())
     );
     setFilteredSuggestions(filtered);
     setIsOpen(filtered.length > 0); // Show suggestions if any found
   };
   ```

---

### **Step 6: Add Suggestions Below the Input**

1. Display the filtered suggestions below the input field if `isOpen` is `true`.

2. Create a dropdown list to show the suggestions dynamically:

   ```jsx
   {isOpen && (
     <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
       {filteredSuggestions.map((suggestion, index) => (
         <li
           key={index}
           className="list-group-item"
           style={{ cursor: 'pointer' }}
           onClick={() => addTag(suggestion)}
         >
           {suggestion}
         </li>
       ))}
     </ul>
   )}
   ```

---

### **Step 7: Add Tags to the List**

1. Create a function called `addTag` that adds a tag to the `tags` state. It will also clear the input field after adding the tag.

   ```jsx
   const addTag = (tag) => {
     if (tag && !tags.includes(tag)) { // Only add if not already in tags
       setTags((prevTags) => [...prevTags, tag]);
       setInputValue('');
       setIsOpen(false);
     }
   };
   ```

---

### **Step 8: Remove Tags**

1. Add a function `removeTag` that allows the user to remove tags by clicking on them.

   ```jsx
   const removeTag = (index) => {
     setTags((prevTags) => prevTags.filter((_, i) => i !== index));
   };
   ```

---

### **Step 9: Capture Key Events for Separator (Space or Comma)**

1. The user should be able to press a space or comma to add the current text as a tag. We’ll use the `onKeyDown` event to handle this.

2. Add the `handleKeyDown` function that listens for space or comma presses and calls `addTag`.

   ```jsx
   const handleKeyDown = (e) => {
     if (e.key === ' ' || e.key === ',') {
       e.preventDefault();
       addTag(inputValue.trim());
     }
   };
   ```

---

### **Step 10: Render the Final Component**

Now that we have all the logic, let’s put everything together to render the input field, tags, and suggestions.

```jsx
return (
  <div className="container mt-4">
    <div className="tag-input">
      <div className="tag-input-field">
        {/* Tags are displayed as clickable items */}
        {tags.map((tag, index) => (
          <span
            key={index}
            className="badge bg-primary me-2 mb-2 tag"
            onClick={() => removeTag(index)}
          >
            {tag} <span className="ms-1" style={{ cursor: 'pointer' }}>x</span>
          </span>
        ))}
        {/* The input field to type in */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="form-control"
          placeholder="Type a tag (space or comma to add)"
        />
      </div>

      {/* Suggestion dropdown */}
      {isOpen && (
        <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{ cursor: 'pointer' }}
              onClick={() => addTag(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
```

---

### **Step 11: Use the Component in `App.js`**

1. Now, we can use `TokenizedTagInput` in the main `App.js` file.

   ```jsx
   import React from 'react';
   import TokenizedTagInput from './TokenizedTagInput'; // Import the component

   function App() {
     return (
       <div className="App">
         <TokenizedTagInput />
       </div>
     );
   }

   export default App;
   ```

---

### **Step 12: Final Touches and Styling**

1. **Bootstrap Styling**: The component uses Bootstrap 5.3.3 styles like `badge`, `bg-primary`, and `list-group` for styling tags and suggestions.
2. **Suggestions Dropdown**: It will display suggestions as a list below the input field.
3. **Tag Removal**: Tags are clickable, and clicking the "x" icon will remove the tag.

---

### **Conclusion**

Now, you have a working **tag input component** in React that:
- Allows users to type tags and tokenize them with space or comma.
- Shows relevant suggestions based on the user’s input.
- Allows users to add tags by selecting suggestions or typing and pressing space/comma.
- Lets users remove tags by clicking on them.

This approach is built with **React** and **Bootstrap 5.3.3** without using any external libraries or `react-bootstrap`.