import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";

function SingleMusic({ musicPlayerData }) {
  const { song, songs, songIndex, handleSongClick } = musicPlayerData;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  // Default player card data.
  const defaultTitle = "Songs of Hollywood";
  const defaultArtist = "Various Artists";
  const defaultCover =
    "https://t3.ftcdn.net/jpg/08/08/52/40/360_F_808524078_44FKOyoEzPLewYmiRxKwgTp64GH8pGGH.webp";

  const playPauseHandler = () => {
    if (!song) return;
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleNext = () => {
    if (!song) return;
    const nextIndex = (songIndex + 1) % songs.length;
    handleSongClick(songs[nextIndex], nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!song) return;
    const prevIndex = (songIndex - 1 + songs.length) % songs.length;
    handleSongClick(songs[prevIndex], prevIndex);
    setIsPlaying(true);
  };
  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.addEventListener("ended", handleNext);
    if (song) {
      audioRef.current.src = song.url;
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
    return () => audioEl.removeEventListener("ended", handleNext);
  }, [song]);

  return (
    <div className="w-full animate-bottom md:mt-14">
      <div className="text-white max-w-lg mx-auto rounded-lg">
        <div className="text-start mb-4">
          <h2 className="text-xl font-bold mb-1">
            {song?.name || defaultTitle}
          </h2>
          <p className="text-sm text-gray-400 mb-3">
            {song?.artist || defaultArtist}
          </p>
        </div>
          <img
            className="w-full h-[30rem] object-cover rounded-lg mt-6 mb-4"
            src={
              song?.cover
                ? `https://cms.samespace.com/assets/${song.cover}`
                : defaultCover
            }
            alt={song?.name || defaultTitle}
          />

        <div className="w-full flex items-center mt-6">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="custom-slider flex-grow cursor-pointer"
            style={{ "--range-fill": `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div
          className={`${
            song?.cover ? "" : "pointer-events-none"
          } flex items-center justify-between mt-8`}
        >
          <button className="bg-zinc-600 bg-opacity-35 p-2 rounded-full">
            <BsThreeDots size={24} color="white" />
          </button>
          <button
            onClick={handlePrev}
            className="p-3 rounded-full focus:outline-none"
          >
            <FaBackward size={20} />
          </button>
          <button
            onClick={playPauseHandler}
            className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full focus:outline-none"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button onClick={handleNext} className="p-3 rounded-full">
            <FaForward size={20} />
          </button>
          <button
            onClick={handleMuteToggle}
            className="bg-zinc-600 bg-opacity-35 p-2 rounded-full"
          >
            {isMuted ? (
              <MdVolumeOff size={24} color="white" />
            ) : (
              <MdVolumeUp size={24} color="white" />
            )}
          </button>
        </div>

        <audio
          ref={audioRef}
          controls
          className="hidden"
          onTimeUpdate={onTimeUpdate}
        >
          {song && <source src={song?.url} type="audio/mp3" />}
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default SingleMusic;
