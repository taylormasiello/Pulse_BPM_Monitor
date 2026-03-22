import {useState, useEffect } from 'react';
import { getRandomBMP, isBPMDanger, bpmDangerMin, bmpDangerMax } from '../utils/bpmLogic';
import { buzzBuzz } from '../services/hapticsService';

const isAthlete = false
const isExercising = false

// future considerations:
// add isAthelte/isExercising checkboxes (for specific threshold logic)
// future considerations : dark mode
// ??? add button to "mute warnings"/haptics

//furture buzzBuzz() logic
  //if (bpm > 100 && bpm < 135 || bpm < 60 && bpm > 40) {
  //} else if (bpm > 135 || bpm < 40) {
    //await triggerDangerBuzz(5);
   // super red styling
  //if (bpm < 60 && isAthlete || bpm > 100 && isExercising) {
    //no trigger DangerBuzz
  //}


//calculate logic before updating the state

export function useHeartBeat() {
  const [beat, setBeat] = useState(70); //sets beat value for the UI in app.tsx
  const [ isDanger, setDanger ] = useState(false); //default value

   useEffect (() => { //"constructor"
    const beatTimer = setTimeout(() => { //keep logic inside setTimeout
      const nextBPM = getRandomBMP(bpmDangerMin, bmpDangerMax); //internal telemetry variable
      const isDangerous = isBPMDanger(nextBPM); //readability refactor

      setDanger(isDangerous); //informs react danger state flag changed
      setBeat(nextBPM); //informs react native beat state has changed

      buzzBuzz(nextBPM); //dispatch haptic service
    }, 1000);
  
    return () => clearTimeout(beatTimer); //"deconstructor"
  }, [beat]);

  return {beat, isDanger}
}