'use client';

import React, { useState, useEffect } from 'react';
import AudioPlayer from '../../components/AudioPlayer';
import { getSong } from "../../lib/useSongs";
import { Song } from "../../types";

export default function SongPage() {

  const [data, setData] = useState<Song>({} as Song);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const songData = await getSong();
        setData(songData);
      } catch (error) {
      }
    };
    
    getData();
  }, []);

    //const test = document.getElementById("test") as HTMLAudioElement;

    /*const play = () => {
        test?.play();
    }

    const pause = () => {
        test?.pause();
    }

    function Duration(){
        return <h1>{test?.duration}</h1>;
    }*/

    return (
      <div>
        {data.name}
        {data.adress}
        <AudioPlayer src={data.adress}/>
      </div>
    );
  }
  