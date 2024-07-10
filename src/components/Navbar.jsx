import React from "react";
import { NavLink, Link,useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const useActiveLink = (category) => {
  const location = useLocation();
  return new URLSearchParams(location.search).get('category') === category;
};

const Navbar = () => {
  return (
    <nav className="border-b-2 grid">
      <div className="flex justify-evenly   font-semibold bg-slate-500 py-2">
      <Link
        className="flex items-center "
        to="/"
        >
        <div className="h-10">
            <img className="h-full" src={logo} alt="logo" />
        </div>
        <div className="text-3xl font-bold">
            News<span className="text-red-600">Vine</span>
        </div>
      </Link>
      
      </div>

      <div className=" overflow-x-auto">
      <ul className="flex space-x-4 justify-evenly font-semibold">
      {['sports', 'business', 'entertainment', 'health', 'science', 'technology'].map((category) => (
        <NavLink
          key={category}
          to={`/?category=${category}`}
          className={useActiveLink(category) ? "text-[red]" : "text-[black]"}
        >
          <li>{category.charAt(0).toUpperCase() + category.slice(1)}</li>
        </NavLink>
      ))}
    </ul>
      </div>

    </nav>
  );
};

export default Navbar;
