Here’s how you can implement a responsive grid layout using Bootstrap 5.3.3 and React, with `md-2` and `md-10` sections displayed by default and a toggle functionality to hide/show the `md-2` section.

### Implementation

```jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResponsiveGrid = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar Section (md-2) */}
        {showSidebar && (
          <div className="col-md-2 bg-light border-end p-3">
            <h5>Sidebar</h5>
            <p>This is the md-2 section.</p>
          </div>
        )}

        {/* Main Content Section (md-10) */}
        <div className={`col-md-${showSidebar ? "10" : "12"} p-3`}>
          <button
            className="btn btn-primary mb-3"
            onClick={toggleSidebar}
          >
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <h5>Main Content</h5>
          <p>This is the md-10 section, always visible.</p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveGrid;
```

### Explanation:
1. **Container & Row**:
   - The layout is wrapped inside a `container-fluid` with a `row` to define the grid system.

2. **Sidebar (`md-2`)**:
   - The sidebar is conditionally rendered using `showSidebar` state.
   - If the sidebar is hidden, its space is collapsed.

3. **Main Content (`md-10`)**:
   - The `col-md-10` dynamically adjusts to `col-md-12` when the sidebar is hidden, using a conditional class based on the `showSidebar` state.

4. **Toggle Button**:
   - A button is added in the main content section to toggle the visibility of the sidebar.

### Key Features:
- **Responsive Design**:
  The grid automatically adapts to screen sizes using Bootstrap’s `col-md-*` classes.
  
- **Dynamic Classes**:
  The `main content` dynamically adjusts its width when the sidebar is toggled.

- **Bootstrap Styling**:
  Bootstrap's utility classes (`bg-light`, `border-end`, `p-3`, etc.) enhance styling.

### Dependencies:
Make sure to install Bootstrap in your project:
```bash
npm install bootstrap
```

### Outcome:
- By default, `md-2` and `md-10` sections are displayed.
- Clicking the toggle button hides or shows the `md-2` section.
- The `md-10` section always remains visible.