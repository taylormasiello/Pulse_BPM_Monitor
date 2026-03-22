//"math logic" file
import { DangerLevel, UserInputs  } from "../types";

export const bpmDangerCeil = 35;
export const bpmDangerFloor = 195;

const bpmNominalFloor = 60;
const bpmNominalCeil = 100;

const bpmAthleteFloor = 40;
const bpmExerciseCeil  = 150; 
//^more or less an "avg" for "highest safe bpm during exercise" for folks around 40-45 years old
//^^an estimaged average point of potential users, given app is a "health monitor"; less likely to be used by younger users

export function getRandomBMP(min: number, max: number){
  var bpm = Math.random();
  return Math.floor(bpm * ((max - min + 1)) + min); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value
}

//large scale isBPMDanger refactor makes it more "FDA audit ready"; refactored for readability + validation logic
export function isBPMDanger (currentBpm: number, inputs: UserInputs) { //isAthlete is in UserInputs ; declaration
  let dangerLevel: DangerLevel = 'NONE'; //let as will be reassigned within this scope
  const isAthlete = inputs.isAthlete; //const "read only"; deconstructed from inputs
  const isExercising = inputs.isExercising; //^same

  //updated bool's to const as they are "read only" in this scope; avoids "logic drift"
  const udrAthFl = (currentBpm < bpmAthleteFloor );
  const udrExCeil = (currentBpm < bpmExerciseCeil );
  const udrNomFl = (currentBpm < bpmNominalFloor);

  const ovrAthFl = (currentBpm > bpmAthleteFloor);
  const ovrExCeil = (currentBpm > bpmExerciseCeil);
  const ovrNomCeil = (currentBpm > bpmNominalCeil);
 
  const athelteExercisingEMG = ((isAthlete || isExercising) && (ovrExCeil || udrAthFl));
  const athelteRestEMG = ((isAthlete && !isExercising) && (ovrNomCeil || udrAthFl));
  const nonAthelteExercisingEMG = ((!isAthlete && isExercising) && (ovrExCeil || udrNomFl));
  const nonAthleteRestEMG = ((!isAthlete && !isExercising) && (ovrNomCeil || udrNomFl));

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