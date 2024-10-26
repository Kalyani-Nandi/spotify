import React, { useEffect, useState } from "react";

function MusicList({ handleSongClick }) {
  const [musicList, setMusicList] = useState([]);
  const [filteredMusicList, setFilteredMusicList] = useState([]);
  const [durations, setDurations] = useState({});
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("for_you");

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
      setMusicList(data.data || []);
      setFilteredMusicList(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredList = musicList.filter((music) => {
      const isMatching =
        music?.name?.toLowerCase().includes(value.toLowerCase()) ||
        music?.artist?.toLowerCase().includes(value.toLowerCase());
      if (activeTab === "top_track") {
        return isMatching && music?.top_track;
      }
      return isMatching;
    });
    setFilteredMusicList(filteredList);
  };

  const handleFilter = (filterType) => {
    setActiveTab(filterType);
    setSearchText("");
    if (filterType === "top_track") {
      setFilteredMusicList(musicList.filter((music) => music?.top_track));
    } else {
      setFilteredMusicList(musicList);
    }
  };

  const handleLoadedMetadata = (id, duration) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [id]: duration,
    }));
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="w-full">
      <div className="flex gap-6 my-4">
        <button
          onClick={() => handleFilter("for_you")}
          className={`text-xl ${activeTab === "for_you" ? "font-extrabold" : ""}`}
        >
          For You
        </button>
        <button
          onClick={() => handleFilter("top_track")}
          className={`text-xl ${activeTab === "top_track" ? "font-extrabold" : ""}`}
        >
          Top Tracks
        </button>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search Song or Artist"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-none p-2 rounded-md w-full bg-neutral-800 bg-opacity-40 outline-none"
        />
      </div>
      {filteredMusicList?.length > 0 ? (
        filteredMusicList.map((music) => (
          <div
            key={music?.id}
            className="p-2 cursor-pointer hover:bg-slate-600 rounded-md hover:bg-opacity-25"
          >
            <article
              className="flex items-start space-x-4"
              onClick={() => handleSongClick(music)}
            >
              <img
                src={`https://cms.samespace.com/assets/${music?.cover}`}
                alt={music?.name}
                className="rounded-full object-cover w-14 h-14"
              />
              <div className="flex-auto mt-1">
                <h2 className="font-semibold truncate">{music?.name}</h2>
                <p className="text-sm text-gray-500">{music?.artist}</p>
              </div>
              <div className="text-sm text-gray-500">
                {durations[music?.id]
                  ? formatDuration(durations[music?.id])
                  : "Loading..."}
              </div>
              <audio
                src={music?.url}
                onLoadedMetadata={(e) =>
                  handleLoadedMetadata(music?.id, e.target.duration)
                }
                className="hidden"
              />
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
