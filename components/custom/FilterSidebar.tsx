// components/FilterSidebar.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterSidebar = ({ isOpen, toggleFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 100],
    ratings: null,
    author: null,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:relative md:z-auto overflow-auto w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center md:hidden mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={toggleFilters} className="text-gray-500">
              ✕
            </button>
          </div>
          <div className="space-y-6">
            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-[#2b0909]"
                value={selectedFilters.priceRange[1]}
                onChange={(e) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    priceRange: [0, Number(e.target.value)],
                  })
                }
              />
            </div>

            {/* Subjects Filter */}
            <div>
              <h3 className="font-semibold mb-3">Subjects</h3>
              {["Chemistry", "Physics", "Biology", "Mathematics"].map(
                (subject) => (
                  <div key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subject}
                      className="h-4 w-4 text-[#2b0909]"
                    />
                    <label htmlFor={subject} className="ml-2 text-sm">
                      {subject}
                    </label>
                  </div>
                )
              )}
            </div>

            {/* Apply Button */}
            <button className="w-full py-2 bg-[#2b0909] text-white rounded-md">
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
