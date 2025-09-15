import React, { useRef, useState, useEffect } from 'react';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 30; // durasi virtual max 30 detik

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= duration) {
        video.currentTime = 0;
        video.play();
      } else {
        setCurrentTime(video.currentTime);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Custom Video Preview (30s Total)</h1>
      <video
        ref={videoRef}
        width={500}
        // tanpa controls asli
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={() => videoRef.current?.play()}>Play</button>
        <button onClick={() => videoRef.current?.pause()}>Pause</button>
        <input type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} />
        <span>
          {Math.floor(currentTime)} / {duration} sec
        </span>
      </div>
    </div>
  );
};

export default HomePage;
