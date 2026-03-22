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

export function isBPMDanger (currentBpm: number, inputs: UserInputs) { //isAthlete is in UserInputs ; declaration
  let dangerLevel: DangerLevel = 'NONE';
  let isAthlete = inputs.isAthlete;
  let isExercising = inputs.isExercising;

  let udrAthFl = (currentBpm < bpmAthleteFloor );
  let udrExCeil = (currentBpm < bmpExerciseCeil);
  let udrNomFl = (currentBpm < bpmNominalFloor);

  let ovrAthFl = (currentBpm > bpmAthleteFloor);
  let ovrExCeil = (currentBpm > bmpExerciseCeil);
  let ovrNomCeil = (currentBpm > bpmNominalCeil);
 
  let athelteExercisingEMG = ((isAthlete || isExercising) && (ovrExCeil || udrAthFl));
  let athelteRestEMG = ((isAthlete && !isExercising) && (ovrNomCeil || udrAthFl));
  let nonAthelteExercisingEMG = ((!isAthlete && isExercising) && (ovrExCeil || udrNomFl));
  let nonAthleteRestEMG = ((!isAthlete && !isExercising) && (ovrNomCeil || udrNomFl));

  if (athelteExercisingEMG || athelteRestEMG || nonAthelteExercisingEMG || nonAthleteRestEMG) {
    dangerLevel = 'EMG'; //high priority
    return dangerLevel;
  }

  if ((ovrNomCeil && udrExCeil && isExercising) || (udrNomFl && ovrAthFl && isAthlete)) {
     dangerLevel = 'HIGH'; //med priority
     return dangerLevel;
  }

  if ((currentBpm <= bpmNominalCeil) && (currentBpm >= bpmNominalFloor)) {
      return dangerLevel = 'NONE'; //low priority
  }

  return 'NONE'; //default return; catch block
}