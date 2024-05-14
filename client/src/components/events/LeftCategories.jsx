import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Checkbox, List, ListItem } from "@material-tailwind/react";

function LeftCategories({ onFilter }) {
  const distance = ["5k", "10K", "Half Marathon", "10 Miles"];
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [showAllMonths, setShowAllMonths] = useState(false);
  const alwaysOpen = true; // Change this according to your logic
  const displayedMonths = showAllMonths ? months : months.slice(0, 4);
  const handleAlwaysOpen = () => {}; // Define your handleAlwaysOpen function

  const handleDistanceChange = (value) => {
    setSelectedDistance((prev) => {
      const newDistance = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onFilter(newDistance, selectedMonths);
      return newDistance;
    });
  };

  const handleMonthChange = (value) => {
    setSelectedMonths((prev) => {
      const newMonths = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onFilter(selectedDistance, newMonths);
      return newMonths;
    });
  };

  const clearAllSelectedItems = () => {
    setSelectedDistance([]);
    setSelectedMonths([]);
    onFilter([], []);
  };

  const removeSelectedItem = (item, list) => {
    return list.filter((i) => i !== item);
  };

  const handleShowMoreMonths = () => {
    setShowAllMonths(true);
  };

  const handleShowLessMonths = () => {
    setShowAllMonths(false);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      {/* Display selected filters */}
      {(selectedDistance.length > 0 || selectedMonths.length > 0) && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex flex-wrap mt-2">
            {/* Display selected distances */}
            {selectedDistance.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-custom-blue text-white rounded-full mr-2 mb-2"
              >
                {item}{" "}
                <button
                  onClick={() =>
                    setSelectedDistance(
                      removeSelectedItem(item, selectedDistance)
                    )
                  }
                >
                  x
                </button>
              </span>
            ))}
            {/* Display selected months */}
            {selectedMonths.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-custom-blue text-white rounded-full mr-2 mb-2"
              >
                {item}{" "}
                <button
                  onClick={() =>
                    setSelectedMonths(
                      removeSelectedItem(item, selectedMonths)
                    )
                  }
                >
                  x
                </button>
              </span>
            ))}
          </div>

          {/* Button to clear selected items */}
          <button
            onClick={clearAllSelectedItems}
            className="mt-2 px-4 py-2 text-custom-blue underline"
          >
            Clear All
          </button>
        </div>
      )}

      <Accordion open={alwaysOpen}>
        <AccordionHeader
          onClick={handleAlwaysOpen}
          className="bg-custom-blue text-white p-4 cursor-pointer rounded flex items-center justify-between text-sm"
        >
          <span className="flex-grow">Distance</span>

        </AccordionHeader>
        <AccordionBody className="p-4">
          <List>
            {distance.map((item, index) => (
              <ListItem
                key={index}
                className="w-full flex items-center justify-start"
              >
                <Checkbox
                  id={`checkbox-distance-${index}`}
                  color="custom-cream"
                  onChange={() => handleDistanceChange(item)}
                  checked={selectedDistance.includes(item)}
                />
                <label htmlFor={`checkbox-distance-${index}`} className="ml-2">
                  {item}
                </label>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>

      <Accordion open={alwaysOpen} className="mt-4">
        <AccordionHeader
          onClick={handleShowMoreMonths}
          className="bg-custom-blue text-white p-4 cursor-pointer rounded flex items-center justify-between text-sm"
        >
          <span className="flex-grow">Months</span>
          {/* Icon component or HTML */}
        </AccordionHeader>
        <AccordionBody className="p-4 w-full">
          <List className="w-full">
            {/* Display list of months */}
            {displayedMonths.map((month, index) => (
              <ListItem
                key={index}
                className="w-full flex items-center justify-start"
              >
                <Checkbox
                  id={`checkbox-month-${index}`}
                  color="custom-cream"
                  onChange={() => handleMonthChange(month)}
                  checked={selectedMonths.includes(month)}
                />
                <label htmlFor={`checkbox-month-${index}`} className="ml-2">
                  {month}
                </label>
              </ListItem>
            ))}
          </List>
          {!showAllMonths ? (
            <button
              onClick={handleShowMoreMonths}
              className="mt-2 px-4 py-2 text-custom-blue"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={handleShowLessMonths}
              className="mt-2 px-4 py-2 text-custom-blue"
            >
              Show Less
            </button>
          )}
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default LeftCategories;
