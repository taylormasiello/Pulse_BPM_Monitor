
// **future considerations**:
// add pop up modal if user bpm enters "high but ok if exercising" range to prompt them to confirm if exercising or no
// dark mode
// add age considerations for isExercising (changes based on age range)
// ??? add button to "mute warnings"/haptics
// updating isAthlete / isExercising logic to useContext for Gloabl scope (if needed for scalability)

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

import React, { useState } from 'react';
import { Text, View, Switch, TextInput } from 'react-native';
import { useHeartBeat } from './src/hooks/heartBeat';
import { styles } from './src/styles/theme';
import { DangerLevel, UserInputs } from "./src/types"; //DangerLevel

export default function App(inputs: UserInputs) { //inputs are from user inputs (before new change that may happen within this function)
  //init states for isAthlete and isExercising for user input to update
  
  //"default" inputObj from inputs arg
  var inputUpdate: UserInputs = {
    isAthlete: inputs.isAthlete,
    isExercising: inputs.isExercising,
  }
  
  //text box input to update this string variable !
  //let user = "Alex";

  const [userName, setUserName] = useState('Alex');
  const [isAthlete, setIsAthlete] = useState<boolean>(inputUpdate.isAthlete); //need <boolean> for setters w/ arrow function below
  const [isExercising, setIsExercising] = useState<boolean>(inputUpdate.isExercising);

  const toggleIsAthlete = () => setIsAthlete(previousState => !previousState); //prevState needs to know what type it is;
  const toggleIsExercising = () => setIsExercising(previousState => !previousState); //^why <boolean> in above setter

  //updated inputObj from user inputs from checkbox toggles
  var newInputs: UserInputs = {
    isAthlete: isAthlete, //updated values from userInput toggles/checkbox clicking/changing the values of the checkboxes
    isExercising: isExercising,
  }
  
  const { beat, isDanger } = useHeartBeat(newInputs); //takes in updated from user inputs UserInputs

  //isDanger conditional styling logic; returns STYLE COLOR not dangerLevel
  function checkDangerLevel(danger: DangerLevel){
    if (danger === 'EMG'){
      return styles.emgBrightRed;
    }

    if (danger === 'HIGH'){
      return styles.cautionOrange;
    } else if (danger === 'NONE'){
      return styles.nominalGreen;
    }

    return styles.nominalGreen;
  }

  //"as DangerLevel" necessary to type gaurd dangerCheck to prevent string vs DangerLevel obj conflicts
  //^"as" operator explicitly tells compiler result of parenthesis is to be treated AS the obj, DangerLevel
  //^^forces dangerCheck to match necessary arg type required by checkDangerLevel
  const dangerCheck: DangerLevel = (isDanger || 'NONE') as DangerLevel;   //'NONE' default for first render
  
  return ( //refeactored "warning" to be "invisible" instead of "destroyed" to fix "jumping UI" bug
    <View style={styles.mainContainer}>
      <Text style={styles.bigTitleBlue}>Tay's Heart Beat Monitor</Text>
      <Text style={styles.medTitlePurple}>Hello 
        <TextInput
          style={styles.userNamePurple}
          onChangeText={setUserName}
          value={userName}
        />
       !</Text>
      <View>
        <Text style={styles.smallTitleDarkGreen}>"Check if you're an Athlete:</Text>
        <Switch onValueChange={() => toggleIsAthlete()} value={isAthlete}/>
      </View>
        <View>
          <Text style={styles.smallTitleDarkGreen}>Check if you're currently Exercising:</Text>
          <Switch onValueChange={() => toggleIsExercising()} value={isExercising}/>
      </View>

      <Text style={styles.smallTitleDarkYellow}>My beats so far are:</Text>
      <Text style={checkDangerLevel((dangerCheck))}>{beat}</Text>
      <Text style={(isDanger === 'EMG') ? styles.warnDarkRed : styles.warnInvisible}>!! Warning !!</Text>
    </View>
  );
};

//<Text style={styles.medTitlePurple}>Hello {user}!</Text>
//<TextInput
          //style={styles.medTitlePurple}
          //onChangeText={setUserName}
          //value={userName}
      //>