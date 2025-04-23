"use client";
import Link from "next/link";
import React from "react";
import YoutubeIcon from "../svg/youtube";

const HomeNavbar = () => {
  return (
    <nav className="border-b border-border py-2">
      <div className="mx-auto container">
        <Link href="/" className="flex items-center gap-2">
          <YoutubeIcon />
          <span className="logo-font text-lg">NeoTube</span>
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
