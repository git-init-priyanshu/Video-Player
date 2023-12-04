import React, { useRef } from "react";
import videojs from "video.js";

import "./App.css";
import Video from "./Components/VideoPlayer";
import Chapters from "./Components/Chapters";

function App() {
  const playerRef = useRef(null);
  const videoOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true,
      },
    },
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
  };
  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

    player.on("keystatuschange", function (event: any) {
      console.log("event: ", event);
    });
  };
  return (
    <div className=" flex">
      <Video options={videoOptions} onReady={handlePlayerReady} />
      <Chapters />
    </div>
  );
}

export default App;
