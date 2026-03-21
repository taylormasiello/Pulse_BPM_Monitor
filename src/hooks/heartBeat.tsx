import React, {useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';

// red if above 100 OR below 60;
// checkbox for "are athelte?" - true=>diff const bmpMinAth used
// checkbox for "are excercising?" - true=>diff const bmpMaxEx used
// could add warning modals for specific thresholds
// add button to "mute warnings"/haptics
// make stronger haptic feedback

const bpmDangerMin = 35
const bmpDangerMax = 195

//future considerations
const isAthlete = false
const isExercising = false

function getRandomBMP(min: number, max: number){
  var bpm = Math.random();

  return Math.floor(bpm * ((max - min + 1) + min)); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value

}

var bpm = getRandomBMP(bpmDangerMin, bmpDangerMax);

const delay = (ms: number) => new Promise((finished) => setTimeout(finished, ms)); //attempt to strengthen haptics

const triggerBuzz = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await delay(150); //confirm buzz finishes
    console.log("Haptic engine succeed!")  

  } catch (error) {
    console.log("Haptic engine failed: ", error)
  }
};

// depriciated due to hardware limitations; no noticable difference in buzzing strength 
// const triggerDangerBuzz = async (times: number) => {
//   try {
//     for (let i = 0; i < times; i++){
//     await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); //Rigid is more more "sharp", Heavy is strongest type
//     await delay(150);
//     console.log("Haptic engine succeed!") 
//     } 

//   } catch (error) {
//     console.log("Haptic engine failed: ", error)
//   }
// };

const buzzBuzz = async () => {
  //if (bpm < 60 && isAthlete || bpm > 100 && isExercising) {
    //no trigger DangerBuzz
  //}
  
  if (bpm > 100 && bpm < 135 || bpm < 60 && bpm > 40) {
    await triggerBuzz();
  } else if (bpm > 135 || bpm < 40) {
    //await triggerDangerBuzz(5);
  }
}

export function useHeartBeat() {
  const [beat, setBeat] = useState(bpm);

  useEffect (() => {
    const beatTimer = setTimeout(() => { //setTimeout vs setInterval: "stric loop"(moves to next after interval) vs "polite loop"(waits for code to finish, good for haptics)
      setBeat((getRandomBMP(bpmDangerMin, bmpDangerMax)));
    }, 1000);

    buzzBuzz();

    return () => clearTimeout(beatTimer);
  }, [beat]);

  //buzzBuzz();

  return {beat}
}