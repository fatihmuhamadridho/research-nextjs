import React, { useRef, useState, useEffect } from 'react';

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const maxDuration = 30; // virtual max 30 detik

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= maxDuration) {
        video.currentTime = 0;
        video.play();
      } else {
        setCurrentTime(video.currentTime);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
      setVideoDuration(0);
      setCurrentTime(0);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Custom Video Preview (Max 30s)</h1>

      {/* Form upload video */}
      <input type="file" accept="video/*" onChange={handleFileChange} />

      {videoFile && (
        <>
          <video
            ref={videoRef}
            width={500}
            src={videoFile}
            style={{ display: 'block', marginTop: 10 }}
            onLoadedMetadata={(e) => {
              const target = e.currentTarget as HTMLVideoElement;
              setVideoDuration(target.duration);
            }}
          />

          <div style={{ marginTop: 10 }}>
            <button onClick={() => videoRef.current?.play()}>Play</button>
            <button onClick={() => videoRef.current?.pause()}>Pause</button>
            <input type="range" min={0} max={maxDuration} value={currentTime} onChange={handleSeek} />
            <span>
              {Math.floor(currentTime)} / {maxDuration} sec
            </span>
          </div>

          {/* Info durasi asli */}
          <p>
            Durasi asli video: <b>{videoDuration ? `${videoDuration.toFixed(2)} detik` : '-'}</b>
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;
