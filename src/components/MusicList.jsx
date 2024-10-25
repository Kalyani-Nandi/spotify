import React, { useEffect, useState } from "react";

function MusicList() {
  const [musicList, setMusicList] = useState([]);
  const [filteredMusicList, setFilteredMusicList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchMusicData();
  }, []);

  async function fetchMusicData() {
    try {
      const response = await fetch("https://cms.samespace.com/items/songs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data.data);
      setMusicList(data.data || []);
      setFilteredMusicList(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSearch = (value) => {
    setSearchText(value);
    const searchedMusicList = musicList.filter(
      (music) =>
        music?.name?.toLowerCase().includes(value.toLowerCase()) ||
        music?.artist?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMusicList(searchedMusicList);
  };

  const handleFilter = (filterType) => {
    if (filterType === "top_track") {
      setFilteredMusicList(musicList.filter((music) => music?.top_track));
    }
    //  else if (filterType === "for_you") {
    // //   const specificUserId = "2085be13-8079-40a6-8a39-c3b9180f9a0a";
    //   setFilteredMusicList(musicList.filter((music) => music?.user_created === specificUserId));
    // }
    else {
      setFilteredMusicList(musicList);
    }
  };

  const formatTime = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="w-full">
      <h1>Music List</h1>
      <div className="flex gap-6 my-4">
        <button onClick={() => handleFilter("for_you")}>For You</button>
        <button onClick={() => handleFilter("top_track")}>Top Tracks</button>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search Song or Artist"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      {filteredMusicList.length > 0 ? (
        filteredMusicList.map((music) => (
          <div key={music?.id} className="border-b p-4 cursor-pointer hover:bg-slate-300">
            <article className="flex items-start space-x-4">
              <img
                src={`https://cms.samespace.com/assets/${music?.cover}`}
                alt={music?.name}              
                className="rounded-full object-cover w-14 h-14"
              />
              <div className="flex-auto mt-1">
                <h2 className="font-semibold text-slate-900 truncate">
                  {music?.name}
                </h2>
                <p>{music?.artist}</p>
              </div>
              <div className="text-sm text-gray-500">
                {formatTime(music?.date_created)}
              </div>
            </article>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default MusicList;
