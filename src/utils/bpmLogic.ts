//file contains the "math logic"

export const bpmDangerMin = 35
export const bmpDangerMax = 195

export function getRandomBMP(min: number, max: number){
  var bpm = Math.random();
  return Math.floor(bpm * ((max - min + 1)) + min); // +1 makes it inclusive ; + min bumps math.random from 1 to the min value
}

export function isBPMDanger (currentBpm: number) { //don't use "set" as function names in react native as it's a signal for a state change not just a flag/boolean logic
  var inDangerZone = false

  if (currentBpm > 100 || currentBpm < 60) {
     inDangerZone = true
  }

  return inDangerZone
}