//Union Types

export type DangerLevel = 'NONE' | 'HIGH' | 'EMG';

//Interfaces

export interface UserInputs { //declaration
    isAthlete: boolean;
    isExercising: boolean;
}

//instantiation
//const myVariable: InterfaceName = { key: value, key2: value };