//"math logic" file
import { DangerLevel, UserInputs  } from "../types";

export const bpmDangerCeil = 35;
export const bmpDangerFloor = 195;

const bpmNominalFloor = 60;
const bpmNominalCeil = 100;

const bpmAthleteFloor = 40;
const bmpExerciseCeil = 150; 
//^more or less an "avg" for "highest safe bpm during exercise" for folks around 40-45 years old
//^^an estimaged average point of potential users, given app is a "health monitor"; less likely to be used by younger users

export function getRandomBMP(min: number, max: number){
  var bpm = Math.random();
  return Math.floor(bpm * ((max - min + 1)) + min); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value
}

//refactor to accept obj like {isAthlete: boolean}
export function isBPMDanger (currentBpm: number, inputs: UserInputs) { //isAthlete is in UserInputs ; declaration
  let isAthlete = inputs.isAthlete;
  let isExercising = inputs.isExercising;

  let dangerLevel: DangerLevel = 'NONE';

  //isAth_orEx_and_OvrExCl_orUdrAthFl
  let athelteExercisingEMG = ((isAthlete || isExercising) && (currentBpm < bmpExerciseCeil || currentBpm < bpmAthleteFloor));
  //isAth_andNotEx_and_UdrNormCl_orUdrAthFl
  let athelteRestEMG = ((isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmAthleteFloor));
  //notAth_andisEx_and_UdrExCl_orUdrNormFl
  let nonAthelteExercisingEMG = ((!isAthlete && isExercising) && (currentBpm < bmpExerciseCeil || currentBpm < bpmNominalFloor));
  //notAth_andNotEx_and_Udr_NormCl_orUdrNormFl
  let nonAthleteRestEMG = ((!isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmNominalFloor));

  if (athelteExercisingEMG || athelteRestEMG || nonAthelteExercisingEMG || nonAthleteRestEMG) {
    dangerLevel = 'EMG';
  }    

//   if (((isAthlete || isExercising) && (currentBpm < bmpExerciseCeil || currentBpm < bpmAthleteFloor)) || 
//         ((isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmAthleteFloor)) || 
//         ((!isAthlete && isExercising) && (currentBpm < bmpExerciseCeil || currentBpm < bpmNominalFloor)) || 
//         ((!isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmNominalFloor)) ||) {
//       dangerLevel = 'EMG';
//   }

  if ((currentBpm > bpmNominalCeil && currentBpm < bmpExerciseCeil && isExercising) || 
        (currentBpm < bpmNominalFloor && currentBpm > bpmAthleteFloor && isAthlete)) {
     dangerLevel = 'HIGH'; //med priority
     return dangerLevel;
  }

  if (currentBpm < (bpmNominalCeil - 1) || currentBpm < (bpmNominalFloor + 1)) {
      return dangerLevel = 'NONE'; //lowest priority
  }

  

  //will return more than just bool ; 3 levels of "danger"
  //return inDangerZone
  //return dangerLevel;
}

//furture buzzBuzz() logic
  //if (bpm > 100 && bpm < 135 || bpm < 60 && bpm > 40) {
  //} else if (bpm > 135 || bpm < 40) {
    //await triggerDangerBuzz(5);
   // super red styling
  //if (bpm < 60 && isAthlete || bpm > 100 && isExercising) {
    //no trigger DangerBuzz
  //}