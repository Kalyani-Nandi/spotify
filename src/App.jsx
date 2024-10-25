import { useState } from "react";
import MusicList from "./components/MusicList";
import SingleMusic from "./components/SingleMusic";

function App() {
  const [song, setSong] = useState({});
  const handleSongClick = (songData) => {
    setSong(songData);
  };

  return (
    <div
      className="px-10 w-full flex gap-10"
      style={{ backgroundColor: song?.accent }}
    >
      <div className="flex w-[50%]">
        <MusicList handleSongClick={handleSongClick} />
      </div>
      <div className="flex w-[50%]">
        <SingleMusic song={song} />
      </div>
    </div>
  );
}

export default App;
