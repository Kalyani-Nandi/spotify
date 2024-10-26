import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between h-[90vh]">
      <div className="h-full">
        <img
          src={
            `https://newsroom.spotify.com/wp-content/themes/ftr/assets/images/spotify-logo.png` ||
            ""
          }
          alt="spotify_logo"
          className="w-[150px]"
        />
      </div>
      <button className="min-h-10">
        <FaUserCircle size={30} color="white" />{" "}
      </button>
    </div>
  );
};

export default Sidebar;
