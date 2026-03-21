import React, {useState, useEffect } from 'react';

function getRandomBMP(min: number, max: number){ //cannot declare as int, all integers are "numbers"
  var bpm = Math.random();

  return Math.floor(bpm * ((max - min + 1) + min)); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value

}

export function useHeartBeat() {
  const [beat, setBeat] = useState(getRandomBMP(55, 115));
  //const timer = setTimeout(() => )

  //changed beat + 1 to a random number between 60 and 100


  useEffect (() => {
    const beatTimer = setTimeout(() => {
      setBeat(( getRandomBMP(55, 115))); //sets heartbeat to a random number between 60-125 inclusive
    }, 1000);

    return () => clearTimeout(beatTimer);
  }, [beat]);

  return {beat}
}