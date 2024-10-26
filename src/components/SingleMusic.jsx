import React, { useRef, useState } from "react";

function SingleMusic({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Default values if song is empty
  const defaultTitle = "Songs of Hollywood";
  const defaultArtist = "Various Artists";
  const defaultCover =
    "https://t3.ftcdn.net/jpg/08/08/52/40/360_F_808524078_44FKOyoEzPLewYmiRxKwgTp64GH8pGGH.webp"; // Replace with your default image path
  const defaultUrl = ""; // Leave empty or provide a default URL if you have one

  return (
    <div className="w-full">
      <div className="text-white max-w-lg mx-auto rounded-lg p-4">
        <div className="text-start">
          <h2 className="text-lg font-bold mb-1">
            {song?.name || defaultTitle}
          </h2>
          <p className="text-sm text-gray-400 mb-3">
            {song?.artist || defaultArtist}
          </p>
        </div>
        <div className="">
          <img
            className="w-full h-[30rem] object-cover rounded-lg mb-4"
            src={
              song?.cover
                ? `https://cms.samespace.com/assets/${song.cover}`
                : defaultCover
            }
            alt={song?.name || defaultTitle}
          />
        </div>

        <div className="w-full h-1 bg-gray-700 rounded-lg mt-4">
          <div
            className="h-1 bg-white rounded-xl"
            style={{
              width: `${
                (currentTime / (audioRef.current?.duration || 1)) * 100
              }%`,
            }}
          ></div>
        </div>

        <div
          className={`${
            song.cover ? "" : "pointer-events-none"
          } flex items-center justify-between mt-4`}
        >
          {/* Previous button */}
          <button className="bg-transparent text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5m7-7l-7 7 7 7"
              />
            </svg>
          </button>

          {/* Play / Pause button */}
          <button
            onClick={playPauseHandler}
            className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full focus:outline-none"
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.073A1 1 0 008 9.08v5.838a1 1 0 001.555.832l5.197-3.073a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </button>

          {/* Next button */}
          <button className="bg-transparent text-white w-10 h-10 flex items-center justify-center rounded-full focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-7 7l7-7-7-7"
              />
            </svg>
          </button>
        </div>

        <audio
          ref={audioRef}
          src={song?.url || defaultUrl}
          onTimeUpdate={onTimeUpdate}
        />
      </div>
    </div>
  );
}

export default SingleMusic;
