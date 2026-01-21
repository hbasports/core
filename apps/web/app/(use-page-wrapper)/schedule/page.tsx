import Icon from "@/components/Icon";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Schedule | HBA SPORTS",
};

const options = [
  {
    display: "NFL",
    href: "/sports/nfl",
  },
  {
    display: "NRL",
    href: "/sports/nrl",
  },
  {
    display: "NBA",
    href: "/sports/nba",
  },
  {
    display: "Hockey",
    href: "/sports/hockey",
  },
  {
    display: "Cricket",
    href: "/sports/cricket",
  },
];

const page = () => {
  return (
    <>
      <div className="border-b border-[hsl(0,0%,90%)]">
        <nav className="flex w-full min-h-15 h-full max-w-7xl mx-auto m-0 items-stretch justify-center px-4">
          <div className="items-center gap-2 flex-1 hidden lg:flex">
            <ul className="flex">
              {options.map((sport, index) => (
                <li>
                  <a href={sport.href} key={index}>
                    <span className="font-medium text-sm px-3 py-2 cursor-pointer text-black hover:text-[#1842ff] hover:font-semibold hover:bg-[#ebf7ffe1] rounded-lg">
                      {sport.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <main className="flex justify-center align-items min-w-60">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/CBS_Sports_2021_%28Blue%29.svg"
              alt="CBS SPORTS lockup logo"
              className="w-40"
            />
          </main>
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <button className="px-3 py-2 cursor-pointer">
              <Icon name="user-circle" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default page;
