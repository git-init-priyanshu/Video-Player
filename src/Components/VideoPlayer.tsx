import { useRef, useEffect } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

import thumbnail from "../assets/thumbnail.jpg";

export default function Video({ options, onReady }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = videojs(videoElement, options);
      playerRef.current = player;
      videojs.log("player is ready");
      onReady && onReady(player);
    }

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, videoRef, playerRef, onReady]);
  return (
    <div data-vjs-player className=" w-60">
      <video
        ref={videoRef}
        poster={thumbnail}
        className=" w-full aspect-video video-js vjs-big-play-centered"
      />
    </div>
  );
}
