"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResponsiveGridToggle = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container-fluid">

      <div className="row">
        {/* Sidebar Section (md-2) */}
        {showSidebar && (
          <div className="col-md-2 bg-primary text-white border-end p-3 vh-100">
            <h5>Sidebar</h5>
            <p>This is the md-2 section.</p>
          </div>
        )}

        {/* Main Content Section (md-10) */}
        <div className={`col-md-${showSidebar ? "10" : "12"} bg-light text-dark p-3`}>
          <button className="btn btn-primary mb-3" onClick={toggleSidebar}>
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <h5>Main Content</h5>
          <p>This is the md-10 section, always visible.</p>
          <h1 className="text-center my-4">Responsive Grid Layout with Toggleable Sidebar</h1>
      <p className="text-center">
        Design a responsive grid layout using Bootstrap 5.3.3, where md-2 and md-10 sections are
        displayed by default. Implement a toggle functionality in React to hide or show the md-2
        section when the toggle button is clicked, while ensuring the md-10 section remains visible
        at all times.
      </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveGridToggle;
