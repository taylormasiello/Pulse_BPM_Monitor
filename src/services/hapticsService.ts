//file contains expo haptics logic
import { isBPMDanger } from '../utils/bpmLogic';
import {  UserInputs, DangerLevel  } from "../types";
import * as Haptics from 'expo-haptics';

const delay = (ms: number) => new Promise((finished) => setTimeout(finished, ms)); //allows for system hardware recovery between bpm's

export const triggerBuzz = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await delay(150); //confirm buzz finishes
    console.log("Haptic engine succeed!")  
  } catch (error) {
    console.log("Haptic engine failed: ", error)
  }
};

export const buzzBuzz = async (currentBpm: number, inputs: UserInputs, danger: DangerLevel) => {
  if (danger === 'EMG')
  {
    await triggerBuzz();
  }
};

