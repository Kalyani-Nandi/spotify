import { useState } from "react";
import MusicList from "./components/MusicList";
import SingleMusic from "./components/SingleMusic";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "react-responsive";

function App() {
  const [song, setSong] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [filteredMusicList, setFilteredMusicList] = useState([]);
  const handleSongClick = (songData, index) => {
    setCurrentSongId(songData?.id);
    setSong(songData);
    setCurrentIndex(index);
  };

  return (
    <div
      className=" md:p-10 p-4 w-full min-h-[100vh] h-full flex flex-col md:flex-row gap-10 text-white bg-gradient-to-br bg-zinc-800"
      style={{
        backgroundImage: `linear-gradient(135deg, ${song?.accent} 0%, rgba(0,0,0,0.7) 100%)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="w-[20%] h-full hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full flex md:flex-row flex-col-reverse md:gap-4">
        <div className="lg:w-[40%] w-full">
          <MusicList
            handleSongClick={handleSongClick}
            currentSongId={currentSongId}
            filteredMusicList={filteredMusicList}
            setFilteredMusicList={setFilteredMusicList}
            song={song}
          />
        </div>
        <div className="w-full">
          <SingleMusic
            song={song}
            handleSongClick={handleSongClick}
            songs={filteredMusicList}
            songIndex={currentIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
