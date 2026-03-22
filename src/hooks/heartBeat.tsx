import {useState, useEffect } from 'react';
import { getRandomBMP, isBPMDanger, bpmDangerFloor, bpmDangerCeil } from '../utils/bpmLogic';
import { buzzBuzz } from '../services/hapticsService';
import { UserInputs  } from "../types"; //DangerLevel

// const isAthlete = false
// const isExercising = false

// future considerations:
// add isAthelte/isExercising checkboxes (for specific threshold logic)
// input space to update "user" in App.tsx via user input (can set name on screen)
// add pop up modal if user bpm enters "high but ok if exercising" range to prompt them to confirm if exercising or no

// future considerations : dark mode
// add age considerations for isExercising (changes based on age range)
// ??? add button to "mute warnings"/haptics
// updating isAthlete / isExercising logic to useContext for Gloabl scope (if needed for scalability)

//calculate logic before updating the state
export function useHeartBeat(inputs: UserInputs) { //inputs needs to be passed in as arg since comes from UI, user inputs
  const [beat, setBeat] = useState(70);
  const [ isDanger, setDanger ] = useState('NONE'); //default value

  const isAthlete = inputs.isAthlete;
  const isExercising = inputs.isExercising;

   useEffect (() => { //"constructor" ; updates every render except w/ dependancy array: empty runs once on mount ; with props: runs on mount and when props state change between renders
    const beatTimer = setTimeout(() => { //keep logic inside setTimeout
      const nextBPM = getRandomBMP(bpmDangerFloor, bpmDangerCeil); //internal telemetry variable
      //const UserInputs: inputs = 
      const isDangerous = isBPMDanger(nextBPM, inputs); 

      setDanger(isDangerous); //danger state changed
      setBeat(nextBPM); //beat state changed

      buzzBuzz(nextBPM); //dispatch haptic service
    }, 1000);
  
    return () => clearTimeout(beatTimer); //"deconstructor"
  }, [beat, inputs]); //useEffect needs to "watch+render" for both beat, and inputs (user inputs changing)

  return {beat, isDanger}
}