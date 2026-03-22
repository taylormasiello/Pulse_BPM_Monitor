import React, {useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';

// future considerations
// red if above 100 OR below 60;
// checkbox for "are athelte?" - true=>diff const bmpMinAth used
// checkbox for "are excercising?" - true=>diff const bmpMaxEx used
// could add warning modals for specific thresholds
// add button to "mute warnings"/haptics
// make stronger haptic feedback

//furture buzzBuzz() logic
  //if (bpm > 100 && bpm < 135 || bpm < 60 && bpm > 40) {
  //} else if (bpm > 135 || bpm < 40) {
    //await triggerDangerBuzz(5);
   // super red styling
  //if (bpm < 60 && isAthlete || bpm > 100 && isExercising) {
    //no trigger DangerBuzz
  //}
const isAthlete = false
const isExercising = false

const bpmDangerMin = 35
const bmpDangerMax = 195

function getRandomBMP(min: number, max: number){
  var bpm = Math.random();
  return Math.floor(bpm * ((max - min + 1)) + min); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value
}

const delay = (ms: number) => new Promise((finished) => setTimeout(finished, ms)); //allows for system hardware recovery between bpm's

const triggerBuzz = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await delay(150); //confirm buzz finishes
    console.log("Haptic engine succeed!")  
  } catch (error) {
    console.log("Haptic engine failed: ", error)
  }
};

export function setIsDanger (currentBpm: number) {
  var inDangerZone = false

  if (currentBpm > 100 || currentBpm < 60) {
     inDangerZone = true
  }

  return inDangerZone
}

const buzzBuzz = async (currentBpm: number) => {
  if (setIsDanger(currentBpm)) {
    await triggerBuzz();
 }
};

//calculate logic before updating the state

export function useHeartBeat() {
  const [beat, setBeat] = useState(70); //sets beat value for the UI in app.tsx
  const [ isDanger, setDanger ] = useState(false); //default value

  //const nextBPM = getRandomBMP(bpmDangerMin, bmpDangerMax)

  useEffect (() => {
    const beatTimer = setTimeout(() => { //keep logic inside setTimeout
      const nextBPM = getRandomBMP(bpmDangerMin, bmpDangerMax); //internal telemetry variable
      //setIsDanger(nextBPM); //inDangerFlag
      setDanger(setIsDanger(nextBPM)); //informs react danger state flag changed
      setBeat(nextBPM); //informs react native beat state has changed
      buzzBuzz(nextBPM);
    }, 1000);

    //var isDanger = bpmRangeCheck(nextBPM);
    //buzzBuzz(beat);
    
    return () => clearTimeout(beatTimer);
  }, [beat]);

  //buzzBuzz();

  return {beat, isDanger}
}