"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes } from "react-icons/fa";

const SidebarFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Default price range
  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 10000;

  // Get initial values from URL or use defaults
  const [minPrice, setMinPrice] = useState(
    searchParams.get("min_price")
      ? Number(searchParams.get("min_price"))
      : DEFAULT_MIN
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("max_price")
      ? Number(searchParams.get("max_price"))
      : DEFAULT_MAX
  );

  // Separate state for input fields to handle empty values properly
  const [minPriceInput, setMinPriceInput] = useState(minPrice.toString());
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString());

  // Track if filters are active
  const [isFilterActive, setIsFilterActive] = useState(
    searchParams.has("min_price") || searchParams.has("max_price")
  );

  // For mobile - track if sidebar is visible
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Update input fields when slider values change
  useEffect(() => {
    setMinPriceInput(minPrice.toString());
    setMaxPriceInput(maxPrice.toString());
  }, [minPrice, maxPrice]);

  // Handle min price input change
  const handleMinPriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMinPriceInput(value);

    // Only update the slider and state if we have a valid number
    if (value !== "") {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setMinPrice(Math.min(numValue, maxPrice - 100));
      }
    }
  };

  // Handle max price input change
  const handleMaxPriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMaxPriceInput(value);

    // Only update the slider and state if we have a valid number
    if (value !== "") {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setMaxPrice(Math.max(numValue, minPrice + 100));
      }
    }
  };

  // Handle input blur - convert empty strings to defaults
  const handleMinInputBlur = () => {
    if (minPriceInput === "" || isNaN(Number(minPriceInput))) {
      setMinPriceInput(DEFAULT_MIN.toString());
      setMinPrice(DEFAULT_MIN);
    }
  };

  const handleMaxInputBlur = () => {
    if (maxPriceInput === "" || isNaN(Number(maxPriceInput))) {
      setMaxPriceInput(DEFAULT_MAX.toString());
      setMaxPrice(DEFAULT_MAX);
    }
  };

  // Apply filters to URL
  const handleFilterChange = () => {
    // Make sure we have valid numbers before filtering
    const validMin = minPriceInput !== "" ? Number(minPriceInput) : DEFAULT_MIN;
    const validMax = maxPriceInput !== "" ? Number(maxPriceInput) : DEFAULT_MAX;

    // Update state with final values
    setMinPrice(validMin);
    setMaxPrice(validMax);

    const params = new URLSearchParams(searchParams.toString());

    if (validMin !== DEFAULT_MIN) {
      params.set("min_price", validMin.toString());
    } else {
      params.delete("min_price");
    }

    if (validMax !== DEFAULT_MAX) {
      params.set("max_price", validMax.toString());
    } else {
      params.delete("max_price");
    }

    setIsFilterActive(validMin !== DEFAULT_MIN || validMax !== DEFAULT_MAX);
    router.push(`?${params.toString()}`);

    // Close sidebar on mobile after applying
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setMinPrice(DEFAULT_MIN);
    setMaxPrice(DEFAULT_MAX);
    setMinPriceInput(DEFAULT_MIN.toString());
    setMaxPriceInput(DEFAULT_MAX.toString());

    const params = new URLSearchParams(searchParams.toString());
    params.delete("min_price");
    params.delete("max_price");

    setIsFilterActive(false);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden w-full mb-4">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="w-full p-3 bg-[#2b0909] text-white rounded-md flex items-center justify-center"
        >
          <FaFilter className="mr-2" />
          {isSidebarVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Sidebar Filter - Hidden on mobile unless toggled */}
      <aside
        className={`
        ${isSidebarVisible ? "block" : "hidden"} md:block
        w-full md:w-64 lg:w-72 
        bg-[#fffcf7] border border-[#2b0909] rounded-lg 
        overflow-hidden sticky top-4
      `}
      >
        {/* Filter Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2b0909]">
          <div className="flex items-center">
            <FaFilter className="text-[#2b0909] mr-2" />
            <h3 className="font-medium text-[#2b0909]">Filter Products</h3>
          </div>

          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className="text-sm text-gray-600 hover:text-[#2b0909] flex items-center"
            >
              <FaTimes className="mr-1" />
              Reset
            </button>
          )}
        </div>

        {/* Price Range Section */}
        <div className="p-4">
          <h4 className="font-medium text-sm mb-4">Price Range</h4>

          {/* Min Price Slider */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1">
              Minimum Price: KES {minPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={DEFAULT_MIN}
              max={DEFAULT_MAX}
              step={100}
              value={minPrice}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                // Ensure min doesn't exceed max
                setMinPrice(Math.min(newMin, maxPrice - 100));
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2b0909]"
            />
          </div>

          {/* Max Price Slider */}
          <div className="mb-6">
            <label className="block text-xs text-gray-500 mb-1">
              Maximum Price: KES {maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={DEFAULT_MIN}
              max={DEFAULT_MAX}
              step={100}
              value={maxPrice}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                // Ensure max doesn't go below min
                setMaxPrice(Math.max(newMax, minPrice + 100));
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2b0909]"
            />
          </div>

          {/* Manual Price Input Fields */}
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">
                Min Price
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2b0909]"
                value={minPriceInput}
                onChange={handleMinPriceInputChange}
                onBlur={handleMinInputBlur}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">
                Max Price
              </label>
              <input
                type="text"
                placeholder="10000"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2b0909]"
                value={maxPriceInput}
                onChange={handleMaxPriceInputChange}
                onBlur={handleMaxInputBlur}
              />
            </div>
          </div>

          {/* Price Range Summary */}
          <div className="bg-gray-100 p-3 rounded-md mb-6">
            <p className="text-sm text-gray-700">
              Selected Range:{" "}
              <span className="font-semibold">
                KES{" "}
                {minPriceInput === ""
                  ? DEFAULT_MIN
                  : Number(minPriceInput).toLocaleString()}{" "}
                - KES{" "}
                {maxPriceInput === ""
                  ? DEFAULT_MAX
                  : Number(maxPriceInput).toLocaleString()}
              </span>
            </p>
          </div>

          {/* Apply Filters Button */}
          <button
            className="w-full p-3 bg-[#2b0909] text-white rounded-md hover:bg-[#3a1010] transition-colors"
            onClick={handleFilterChange}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarFilter;
