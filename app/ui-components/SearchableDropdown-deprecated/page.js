"use client";

import "./SearchableDropdown.css"
import React, { useState, useEffect, useRef } from 'react';

const CustomSelect2 = () => {
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6"
  ];

  const [selected, setSelected] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null); // Make sure to define dropdownRef

  // Filter options based on search input
  useEffect(() => {
    setFilteredOptions(
      options.filter(option => option.toLowerCase().includes(search.toLowerCase()))
    );
    setHighlightedIndex(-1); // Reset highlighted index when search changes
  }, [search]);

  // Close dropdown if click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle select option
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1); // Reset highlighted index on selection
  };

  // Handle keydown events for ArrowUp, ArrowDown, and Enter
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

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="position-relative">
      <h1>
          <b>Searchable Dropdown</b>  gives you a customizable select box with support for searching remote data sets, infinite scrolling, and many other highly used options.
      </h1>
      <div 
        className="form-control d-flex align-items-center justify-content-between"
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Allow the container to receive focus for keyboard interactions
      >
        <span>{selected || "Select an option"}</span>
        <span className="ms-2">&#9660;</span>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu show border" style={{ width: "300px" }}>
          <input
            ref={inputRef}
            type="text"
            className="form-control search-input border"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <ul className="list-unstyled p-2 " style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`dropdown-item rounded ${highlightedIndex === index ? 'active' : ''}`}
                onClick={() => handleSelect(option)}
                style={{
                  backgroundColor: highlightedIndex === index ? '#dee4f0' : 'transparent', // Highlight the selected item
                  cursor: "pointer",
                  color:"black"
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
};

export default CustomSelect2;
