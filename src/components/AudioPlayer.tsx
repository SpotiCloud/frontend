// components/AudioPlayer.tsx
import React, { useState, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default volume is set to 50%
  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newProgress = offsetX / rect.width;
    const newTime = newProgress * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div style={{ width: '300px', margin: '0 auto', textAlign: 'center' }}>
      <audio ref={audioRef} src={src} />
      <button style={{ fontSize: '20px', marginRight: '10px' }} onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div
        style={{ width: '100%', height: '10px', backgroundColor: '#ddd', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}
        onClick={handleProgressClick}
      >
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff', borderRadius: '5px' }}></div>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', marginRight: '10px' }}>Volume:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          style={{ width: '150px' }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;