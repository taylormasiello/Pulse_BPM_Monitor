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
  
  let dangerLevel: DangerLevel = 'NONE';

  let isAthlete = inputs.isAthlete;
  let isExercising = inputs.isExercising;

  let udrAthFl = (currentBpm < bpmAthleteFloor );
  let udrExCeil = (currentBpm < bmpExerciseCeil);
  let udrNomFl = (currentBpm < bpmNominalFloor);
  let udrNomCeil = (currentBpm < bpmNominalCeil);

  let ovrNomCeil = (currentBpm > bpmNominalCeil);
  let ovrAthFl = (currentBpm > bpmAthleteFloor);

  //let athelteExercisingEMG = ((isAthlete || isExercising) && (currentBpm < bmpExerciseCeil || currentBpm < bpmAthleteFloor));
  //let athelteRestEMG = ((isAthlete && !isExercising) && (currentBpm < bpmNominalCeil || currentBpm < bpmAthleteFloor  /*overAthFl*/));
  //let nonAthelteExercisingEMG = ((!isAthlete && isExercising) && (currentBpm < bmpExerciseCeil /*overExCeil*/ || currentBpm < bpmNominalFloor /*overNomFl*/));
  //let nonAthleteRestEMG = ((!isAthlete && !isExercising) && (currentBpm < bpmNominalCeil /*overNomCeil*/ || currentBpm < bpmNominalFloor));
 
  let athelteExercisingEMG = ((isAthlete || isExercising) && (udrExCeil || udrAthFl));
  let athelteRestEMG = ((isAthlete && !isExercising) && (udrNomCeil || udrAthFl));
  let nonAthelteExercisingEMG = ((!isAthlete && isExercising) && (udrExCeil || udrNomFl));
  let nonAthleteRestEMG = ((!isAthlete && !isExercising) && (udrNomCeil || udrNomFl));

  if (athelteExercisingEMG || athelteRestEMG || nonAthelteExercisingEMG || nonAthleteRestEMG) {
    dangerLevel = 'EMG';
  }
  
  //let ovrNomCeil = (currentBpm > bpmNominalCeil);

//   if ((currentBpm > bpmNominalCeil && currentBpm < bmpExerciseCeil && isExercising) || 
//         (currentBpm < bpmNominalFloor && currentBpm > bpmAthleteFloor && isAthlete)) {
//      dangerLevel = 'HIGH'; //med priority
//      return dangerLevel;
//   }

  if ((ovrNomCeil && udrExCeil && isExercising) || (udrNomFl && ovrAthFl && isAthlete)) {
     dangerLevel = 'HIGH'; //med priority
     return dangerLevel;
  }

  if ((currentBpm <= bpmNominalCeil) && (currentBpm >= bpmNominalFloor)) {
      return dangerLevel = 'NONE'; //lowest priority
  }

  return 'NONE'; //default return if there is some error; catch block

}