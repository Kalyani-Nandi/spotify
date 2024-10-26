import { useState } from "react";
import MusicList from "./components/MusicList";
import SingleMusic from "./components/SingleMusic";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "react-responsive";

function App() {
  const [song, setSong] = useState({});
  // const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [filteredMusicList, setFilteredMusicList] = useState([]);

  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [isMobilePlayer, setIsMobilePlayer] = useState(false);
  const handleSongClick = (songData, index, songs) => {
    setCurrentSongId(songData?.id);
    setSong(songData);
    // setSongs(songs);

    setCurrentIndex(index);
    // setIsMobilePlayer(true);
    console.log(isMobilePlayer);
  };

  return (
    <div
      className=" p-10 w-full min-h-[100vh] h-full flex flex-col md:flex-row gap-10 text-white bg-gradient-to-br bg-zinc-800"
      style={{
        backgroundImage: `linear-gradient(135deg, ${song?.accent} 0%, rgba(0,0,0,0.7) 100%)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="w-[20%] h-full hidden md:block">
        <Sidebar />
      </div>
      {!isMobileScreen ? (
        <div className="flex w-full">
          <div className="md:w-[35%] w-full">
            <MusicList
              handleSongClick={handleSongClick}
              currentSongId={currentSongId}
              filteredMusicList={filteredMusicList}
              setFilteredMusicList={setFilteredMusicList}
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
      ) : (
        <>
          {!isMobilePlayer ? (
            <div className="w-full">
              <MusicList
                handleSongClick={handleSongClick}
                currentSongId={currentSongId}
                filteredMusicList={filteredMusicList}
                setFilteredMusicList={setFilteredMusicList}
              />
              <button onClick={() => setIsMobilePlayer(true)}>
                Go to Player
              </button>
            </div>
          ) : (
            <div className="w-full">
              <button onClick={() => setIsMobilePlayer(false)}>Back</button>
              <SingleMusic
                song={song}
                handleSongClick={handleSongClick}
                songs={filteredMusicList}
                songIndex={currentIndex}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
