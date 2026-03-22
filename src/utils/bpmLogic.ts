//"math logic" file
import { DangerLevel, UserInputs  } from "../types";

export const bpmNominalFloor = 60;
export const bpmNominalCeil = 100;

export const bpmDangerCeil = 35;
export const bmpDangerFloor = 195;

export const bpmAthleteMin = 40;
export const bmpExerciseMax = 150; 
//^more or less an "avg" for "highest safe bpm during exercise" for folks around 40-45 years old
//^^an estimaged average point of potential users, given app is a "health monitor"; less likely to be used by younger users

export function getRandomBMP(min: number, max: number){
  var bpm = Math.random();
  return Math.floor(bpm * ((max - min + 1)) + min); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value
}

//refactor to accept obj like {isAthlete: boolean}
export function isBPMDanger (currentBpm: number, inputs: UserInputs) { //isAthlete is in UserInputs ; declaration


  
  let dangerLevel: DangerLevel = 'NONE';
  let isAthlete = inputs.isAthlete;
  let isExercising = inputs.isExercising;

  if (currentBpm < (bpmNominalCeil - 1) || currentBpm < (bpmNominalFloor + 1)) {
      dangerLevel = 'NONE';
  }

  if ((currentBpm > bpmNominalCeil && currentBpm < bmpExerciseMax && isExercising) || 
        (currentBpm < bpmNominalFloor && currentBpm > bpmAthleteMin && isAthlete)) {
     dangerLevel = 'HIGH';
  }

  if (((isAthlete || isExercising) && (currentBpm < bmpExerciseMax || currentBpm < bpmAthleteMin)) || 
        ((isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmAthleteMin)) || 
        ((!isAthlete && isExercising) && (currentBpm < bmpExerciseMax || currentBpm < bpmNominalFloor)) || 
        ((!isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmNominalFloor)) ||) {
      dangerLevel = 'EMG';
  }

  //will return more than just bool ; 3 levels of "danger"
  //return inDangerZone
  return dangerLevel;
}

//furture buzzBuzz() logic
  //if (bpm > 100 && bpm < 135 || bpm < 60 && bpm > 40) {
  //} else if (bpm > 135 || bpm < 40) {
    //await triggerDangerBuzz(5);
   // super red styling
  //if (bpm < 60 && isAthlete || bpm > 100 && isExercising) {
    //no trigger DangerBuzz
  //}