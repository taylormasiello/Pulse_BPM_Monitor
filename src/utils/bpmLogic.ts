//"math logic" file
import { UserInputs, DangerLevel } from "../types";

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

//isBPMDanger refactor makes it more "FDA audit ready"; refactored for readability + validation logic
export function isBPMDanger (currentBpm: number, inputs: UserInputs) {
  let dangerLevel: DangerLevel = 'NONE';
  const isAthlete = inputs.isAthlete;
  const isExercising = inputs.isExercising;

  //bools allow for better readability and debugging
  const udrAthFl = (currentBpm < bpmAthleteFloor );
  const udrExCeil = (currentBpm < bpmExerciseCeil );
  const udrNomFl = (currentBpm < bpmNominalFloor);

  const ovrAthFl = (currentBpm > bpmAthleteFloor);
  const ovrExCeil = (currentBpm > bpmExerciseCeil);
  const ovrNomCeil = (currentBpm > bpmNominalCeil);
 
  //if nonAthleteNotExcercising, DangerLevel should be NONE
  //Athletes' safe bpms can be lower, Exercising safe bpm can be higher
  //^HIGH range specifically to trigger only for Athletes or while Exercising
  //^^^if athlete bpm < nom but safe for athelte || exercising bpm > nom but safe when exercising; DangerLevel HIGH
  const athleteExercisingEMG = ((isAthlete || isExercising) && (ovrExCeil || udrAthFl));
  const athleteRestEMG = ((isAthlete && !isExercising) && (ovrNomCeil || udrAthFl));
  const nonAthleteExercisingEMG = ((!isAthlete && isExercising) && (ovrExCeil || udrNomFl));
  const nonAthleteRestEMG = ((!isAthlete && !isExercising) && (ovrNomCeil || udrNomFl));

  if (athleteExercisingEMG || athleteRestEMG || nonAthleteExercisingEMG || nonAthleteRestEMG) {
    dangerLevel = 'EMG';
    return dangerLevel;
  }

  if ((ovrNomCeil && udrExCeil && isExercising) || (udrNomFl && ovrAthFl && isAthlete)) {
     dangerLevel = 'HIGH';
     return dangerLevel;
  }

  //NONE is also default but for FDA level auditing, should have its own case logic
  if ((currentBpm <= bpmNominalCeil) && (currentBpm >= bpmNominalFloor)) {
      return dangerLevel = 'NONE';
  }

  return 'NONE'; // catch; if bpm falls through logic checks, will be treated as NONE
}