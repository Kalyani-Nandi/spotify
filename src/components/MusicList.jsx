import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function MusicList({ musicListData }) {
  const { handleSongClick, filteredMusicList, setFilteredMusicList, song } =
    musicListData;
  const [musicList, setMusicList] = useState([]);
  const [durations, setDurations] = useState({});
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("for_you");
  const [isTabTransition, setIsTabTransition] = useState(false);

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
    setIsTabTransition(true);
    setTimeout(() => {
      setActiveTab(filterType);
      setSearchText("");
      if (filterType === "top_track") {
        setFilteredMusicList(musicList.filter((music) => music?.top_track));
      } else {
        setFilteredMusicList(musicList);
      }
      setIsTabTransition(false);
    }, 300); 
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
    <div className="w-full animate-left">
      <div className="flex gap-6 my-4">
        <button
          onClick={() => handleFilter("for_you")}
          className={`text-xl ${
            activeTab === "for_you" ? "font-extrabold" : ""
          }`}
        >
          For You
        </button>
        <button
          onClick={() => handleFilter("top_track")}
          className={`text-xl ${
            activeTab === "top_track" ? "font-extrabold" : ""
          }`}
        >
          Top Tracks
        </button>
      </div>
      <div
        className="w-full rounded-md my-4 flex justify-between items-center bg-zinc-600"
        style={{
          background: `linear-gradient(135deg, ${song?.accent}, ${song?.accent})`,
        }}
      >
        <input
          type="text"
          placeholder="Search Song, Artist ..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full py-2 pl-3 bg-inherit rounded-md outline-none text-white placeholder-zinc-400"
        />
        <IoSearchOutline size={20} className="text-white mr-3" />
      </div>

      <div
        className={`transition-opacity duration-300 ${
          isTabTransition ? "opacity-0" : "opacity-100"
        }`}
      >
        {filteredMusicList?.length > 0 ? (
          filteredMusicList.map((music, index) => (
            <div
              key={music?.id}
              className={`flex items-center justify-between py-2 px-3 cursor-pointer rounded-md mt-3 ${
                music?.id === song?.id
                  ? "bg-slate-600 bg-opacity-35"
                  : "hover:bg-slate-600 hover:bg-opacity-35"
              }`}
              onClick={() => handleSongClick(music, index)}
            >
              <article className="flex items-start space-x-4">
                <img
                  src={`https://cms.samespace.com/assets/${music?.cover}`}
                  alt={music?.name}
                  className="rounded-full object-cover w-14 h-14"
                />
                <div className="flex-auto mt-1">
                  <h2 className="font-semibold truncate">{music?.name}</h2>
                  <p className="text-sm text-gray-500">{music?.artist}</p>
                </div>
              </article>
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
            </div>
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>
    </div>
  );
}

export default MusicList;
