import React from "react";
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <section className="absolute search_home w-full flex justify-center items-center top-20 md:top-20 -z-10 md:z-50 xl:top-[4.5rem] px-4 md:px-0">
      <div className="flex w-full max-w-2xl px-4 py-0 rounded-lg border-2 border-[#350203] bg-white shadow-sm overflow-hidden">
        <input
          type="text"
          placeholder="Search books, stationery, lab equipment, and more..."
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm md:text-base"
        />
        <button className="p-2 text-[#350203] hover:text-[#4a0304] transition-colors">
          <BsSearch size={24} />
        </button>
      </div>
    </section>
  );
}

export default Search;
