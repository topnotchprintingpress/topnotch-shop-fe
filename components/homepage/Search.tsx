"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";

function Search() {
  // search
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirect to search results page with query parameter
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="search_home bg-[#fffcf7] w-full flex justify-center items-center top-[5.2rem] md:top-24 xl:top-[4.5rem] px-4 md:px-0 py-4 ">
      <form
        onSubmit={handleSearch}
        action=""
        className="flex w-full max-w-2xl px-4 py-0 rounded-lg border-2 border-[#2b0909] bg-white shadow-sm overflow-hidden"
      >
        <input
          type="text"
          value={query}
          placeholder="Search books, stationery, lab equipment, and more..."
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm md:text-base"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 text-[#2b0909] hover:text-[#4a0304] transition-colors"
        >
          <BsSearch size={24} />
        </button>
      </form>
    </section>
  );
}

export default Search;
