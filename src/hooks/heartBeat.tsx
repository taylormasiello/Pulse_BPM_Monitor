import {useState, useEffect } from 'react';
import { getRandomBMP, isBPMDanger, bpmDangerFloor, bpmDangerCeil } from '../utils/bpmLogic';
import { buzzBuzz } from '../services/hapticsService';
import { UserInputs  } from "../types";

//calculate logic before updating the state
export function useHeartBeat(inputs: UserInputs) { //inputs needs to be passed in as arg since comes from UI, user inputs
  const [beat, setBeat] = useState(70);
  const [ isDanger, setDanger ] = useState('NONE'); //default value

   useEffect (() => { //updates every render except w/ dependancy array
    const beatTimer = setTimeout(() => { //keep logic inside setTimeout
      const nextBPM = getRandomBMP(bpmDangerFloor, bpmDangerCeil); //internal telemetry variable
      const isDangerous = isBPMDanger(nextBPM, inputs); 

      setDanger(isDangerous); //danger state changed
      setBeat(nextBPM); //beat state changed

      buzzBuzz(nextBPM, inputs, isDangerous); //dispatch haptic service
    }, 1000);
  
    return () => clearTimeout(beatTimer); //"deconstructor"
  }, [beat, inputs]); //useEffect needs to "watch+render" for both beat, and inputs (user inputs changing)

  return {beat, isDanger}
}