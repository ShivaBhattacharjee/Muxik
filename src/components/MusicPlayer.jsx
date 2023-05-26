import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startX, setStartX] = useState(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleSwipe = () => {
      if (swipeDistance !== 0) {
        const sensitivity = 0.3; // Adjust the sensitivity here (lower value for less sensitivity)
        const progressBarWidth = document.querySelector('.progress-bar').clientWidth;
        const maxSwipeDistance = progressBarWidth - 2; // Subtract a small value to avoid reaching the end prematurely
        const newTime = currentTime + Math.floor((swipeDistance / maxSwipeDistance) * duration * sensitivity);
        audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
        setSwipeDistance(0);
      }
    };

    handleSwipe();
  }, [swipeDistance, currentTime, duration]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMouseDown = (event) => {
    setStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (startX) {
      const distance = event.clientX - startX;
      setSwipeDistance(distance);
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
    setSwipeDistance(0);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const calculateProgress = () => {
    if (duration > 0) {
      return (currentTime / duration) * 100;
    }
    return 0;
  };

  const handleProgressBarClick = (event) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const clickProgress = (clickPosition / progressBarWidth) * 100;
    const skipToTime = (clickProgress / 100) * duration;

    if (clickProgress > 0 && clickProgress < 100) {
      // Skip to the exact location in forward or backward direction
      audioRef.current.currentTime = skipToTime;
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const handleVolumeChange = (event) => {
    const volumeValue = parseFloat(event.target.value);
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };




  useEffect(() => {
    audioRef.current.loop = loop;
  }, [loop]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else if (event.code === 'ArrowLeft') {
        skipBackward();
      } else if (event.code === 'ArrowRight') {
        skipForward();
      } else if (event.code === 'KeyM') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://aac.saavncdn.com/679/b0b7a063d3efddf3a771a0dc91b30d69_48.mp4"
        onTimeUpdate={updateTime}
      />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={skipBackward}>Skip Backward</button>
      <button onClick={skipForward}>Skip Forward</button>
      <button onClick={toggleLoop}>{loop ? 'Disable Loop' : 'Enable Loop'}</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <div
        className="progress-bar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleProgressBarClick}
      >
        <div
          className="progress-bar__fill"
          style={{
            width: `${calculateProgress()}%`,
            cursor: 'pointer'
          }}
        >
          <div
            className="progress-bar__swipe-indicator"
            style={{
              transform: `translateX(${swipeDistance}px)`,
              cursor: 'pointer'
            }}
          ></div>
        </div>
      </div>
      <div>Current Time: {formatTime(currentTime)}</div>
      <div>Duration: {formatTime(duration)}</div>
    </div>
  );
};

export default MusicPlayer;
