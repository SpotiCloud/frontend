import React, { useEffect, useState, useRef } from 'react';
import { getSong } from "../lib/useSongs";
import { Song } from '../types';
import { useSession } from 'next-auth/react';

interface WebSocketComponentprops {
    room: number;
}

interface base {
    id: number;
}

interface TogglePlay extends base {
    isNotPlaying: boolean
}

interface HandleVolumeChange extends base {
    VolumeValue: number
}

interface HandleProgress extends base {
    progressValue: number
}

const WebSocketComponent = ({room}: WebSocketComponentprops) => {
    const [SongLoaded, setSongLoaded] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [socket, setSocket] = useState<WebSocket>();
    const [data, setData] = useState<Song>({} as Song);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5); // Default volume is set to 50%
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null); // Reference to the progress bar element
    const [audioSrc, setAudioSrc] = useState('');
    const { data: session } = useSession();
  
    useEffect(() => {
        if(userInteracted)
            {
                console.log(session.token.accessToken);
            const getData = async () => {
                try {
                const songData = await getSong(session.token.accessToken);
                setData(songData);
                fetchAudio(songData.adress);
                } catch (error) {

                }
            };
        
            getData();

            const fetchAudio = async (fileName: string) => {
                const response = await fetch(`http://${process.env.NEXT_PUBLIC_SESSION_API_URL}/session/download/${fileName}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${session.token.accessToken}`
                    }
                  });
                if (response.ok) {
                    const url = URL.createObjectURL(await response.blob());
                    setAudioSrc(url);
                    setSongLoaded(true);
                }
                console.log(response);
            };

            var ws: WebSocket;
            ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_SESSION_API_URL}/session/ws?room=${room}`);
            setSocket(ws);

            ws.onopen = () => {
                console.log(`Connected to WebSocket room ${room}`);
            };
    
            ws.onmessage = (event) => {
                const jsonObject = JSON.parse(event.data);
                if(jsonObject["id"] == 1){
                    const togglePlayObject: TogglePlay = jsonObject as TogglePlay;
                    togglePlay(togglePlayObject.isNotPlaying);
                } else if(jsonObject["id"] == 2){
                    const handleVolumeChangeObject: HandleVolumeChange = jsonObject as HandleVolumeChange;
                }else if(jsonObject["id"] == 3){
                    const HandleProgressObject: HandleProgress = jsonObject as HandleProgress;
                    handleProgress(HandleProgressObject.progressValue);
                }
            };
    
            ws.onclose = () => {
                console.log(`WebSocket room ${room} closed`);
                ws.close;
            };
    
            ws.onerror = (error) => {
                console.error('WebSocket error', error);
                ws.close;
            };
        }
    
        const updateProgress = () => {
            if (audioRef.current) {
                const duration = audioRef.current.duration;
                const currentTime = audioRef.current.currentTime;
                const calculatedProgress = (currentTime / duration) * 100;
                setProgress(calculatedProgress);
            }
        };
    
        const audio = audioRef.current;
        audio?.addEventListener('timeupdate', updateProgress);
    }, [room, userInteracted]);

    const sendTogglePlayMessage = (play: boolean) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const togglePlay: TogglePlay = {
                id: 1,
                isNotPlaying: play
            };
            socket.send(JSON.stringify(togglePlay));
        }
    };

    const sendHandleVolumeChangeMessage = (volume: number) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const handleVolumeChange: HandleVolumeChange = {
                id: 2,
                VolumeValue: volume
            };
            socket.send(JSON.stringify(handleVolumeChange));
        }
    };

    const sendhandleProgressMessage = (progressValue: number) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const handleProgress: HandleProgress = {
                id: 3,
                progressValue: progressValue
            };
            socket.send(JSON.stringify(handleProgress));
        }
    };

    const togglePlay = (playing: boolean) => {
        if (playing) {
            audioRef.current?.pause();
            console.log(audioRef.current);
        } else {
            audioRef.current?.play();
            console.log(audioRef.current);
        }
        setIsPlaying(!playing);
    };

    const clickTogglePlay = (playing: boolean) => {
        sendTogglePlayMessage(playing);
        togglePlay(playing);
    }

    const handleVolumeChange = (progressValue: number) => {
        const newVolume = progressValue;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const clickhandleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        //sendHandleVolumeChangeMessage(event.target.value);
        handleVolumeChange(parseInt(event.target.value));
    }

    const handleProgress = (event: number) => {
        const progressBar = progressBarRef.current; // Accessing the progress bar element using the reference
        console.log(progressBar);
        if (progressBar) {
            console.log("oke");
            const rect = progressBar.getBoundingClientRect();
            const offsetX = event - rect.left;
            const newProgress = offsetX / rect.width;
            const newTime = newProgress * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    };

    const handleProgressClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        sendhandleProgressMessage(event.clientX);
        handleProgress(event.clientX);
    }

    const handleUserInteraction = () => {
        setUserInteracted(true);
    };

    return (
        <div>
            {!userInteracted && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Permission Required</h2>
                        <p>Please click the button below to allow audio playback.</p>
                        <button onClick={handleUserInteraction}>Allow Audio</button>
                    </div>
                </div>
            )}
            <h1>WebSocket Room: {room}</h1>
            <audio ref={audioRef} src={audioSrc} />
            <button disabled={!SongLoaded} style={{ fontSize: '20px', marginRight: '10px' }} onClick={() => clickTogglePlay(isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div ref={progressBarRef}
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
                onChange={clickhandleVolumeChange}
                style={{ width: '150px' }}
                />
            </div>
        </div>
    );
};

export default WebSocketComponent;