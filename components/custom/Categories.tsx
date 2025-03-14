import React from "react";
import Link from "next/link";

import {
  AiOutlineBook,
  AiOutlineExperiment,
  AiOutlineLaptop,
} from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";

const categories = [
  {
    id: 1,
    name: "Books",
    icon: <AiOutlineBook size={28} />,
    link: "books",
  },
  {
    id: 2,
    name: "Stationery",
    icon: <MdOutlineCreate size={28} />,
    link: "books",
  },
  { id: 3, name: "Lab Equipment", icon: <AiOutlineExperiment size={28} /> },
  {
    id: 4,
    name: "Tech",
    icon: <AiOutlineLaptop size={28} />,
    link: "books",
  },
];

function Categories() {
  return (
    <div className="w-full grid grid-cols-2 md:flex justify-evenly items-center md:gap-8">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/categories/${cat.link}`}>
          <div className="flex md:justify-center items-center gap-5 font-semibold bg-[#f3f3f3] border border-[#2b0909] md:w-[250px] 2xl:w-[400px] p-2 text-[#2b0909]">
            {cat.icon}{" "}
            <h3 className="text-sm md:text-sm xl:text-lg font-bold">
              {cat.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
