import React from "react";

function SingleMusic({ song }) {
  console.log(song);
  return (
    <div className="w-full">
      {Object.keys(song).length !== 0 ? (
        <>
          <div>{song?.name}</div>
          <div>{song?.artist}</div>
          <img
            src={`https://cms.samespace.com/assets/${song?.cover}`}
            alt={song?.name}
            className="rounded-md object-cover w-14 h-14"
          />
          <audio controls className="mt-2">
            <source src={song?.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      ) : null}
    </div>
  );
}

export default SingleMusic;
