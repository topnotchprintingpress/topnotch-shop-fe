"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider"; // Import the shadcn Slider component

interface FilterBarProps {
  onFilterChange: (filters: {
    query: string;
    min_price?: number;
    max_price?: number;
    main_category?: string;
  }) => void;
  initialFilters?: {
    query?: string;
    min_price?: number;
    max_price?: number;
    main_category?: string;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  initialFilters,
}) => {
  const [filters, setFilters] = useState({
    query: initialFilters?.query || "",
    min_price: initialFilters?.min_price || 0,
    max_price: initialFilters?.max_price || 5000, // Default max price
    main_category: initialFilters?.main_category,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]:
        value === "" ? undefined : isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSliderChange = (values: number[]) => {
    const [min, max] = values;
    setFilters((prev) => ({
      ...prev,
      min_price: min,
      max_price: max,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters); // Pass filters to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
      {/* Search Query */}
      <input
        type="text"
        name="query"
        placeholder="Search..."
        value={filters.query}
        onChange={handleInputChange}
        className="border border-gray-300 p-2 rounded w-full"
      />

      {/* Price Range Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <Slider
          value={[filters.min_price, filters.max_price]} // Current range values
          max={5000} // Maximum price
          step={100} // Step size
          onValueChange={handleSliderChange} // Update state when slider changes
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>KES {filters.min_price}</span>
          <span>KES {filters.max_price}</span>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterBar;
