import {useState, useEffect } from 'react';
import { getRandomBMP, isBPMDanger, bpmDangerMin, bmpDangerMax } from '../utils/bpmLogic';
import { buzzBuzz } from '../services/hapticsService';
import { DangerLevel  } from "../types";

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
  const [beat, setBeat] = useState(70);
  const [ isDanger, setDanger ] = useState('NONE'); //default value

   useEffect (() => { //"constructor" ; updates every render except w/ dependancy array: empty runs once on mount ; with props: runs on mount and when props state change between renders
    const beatTimer = setTimeout(() => { //keep logic inside setTimeout
      const nextBPM = getRandomBMP(bpmDangerMin, bmpDangerMax); //internal telemetry variable
      const isDangerous = isBPMDanger(nextBPM, DangerLevel); 

      setDanger(isDangerous); //danger state changed
      setBeat(nextBPM); //beat state changed

      buzzBuzz(nextBPM); //dispatch haptic service
    }, 1000);
  
    return () => clearTimeout(beatTimer); //"deconstructor"
  }, [beat]); //what if user toggles athlete and no longer in same range ; now "high danger" instead of just reg danger

  return {beat, isDanger}
}