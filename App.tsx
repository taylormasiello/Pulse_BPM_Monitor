
// **future considerations**:
// add pop up modal if user bpm enters "high but ok if exercising" range to prompt them to confirm if exercising or no
// dark mode
// add age considerations for isExercising (changes based on age range)
// ??? add button to "mute warnings"/haptics
// updating isAthlete / isExercising logic to useContext for Gloabl scope (if needed for scalability)

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

import React, { useState } from 'react';
import { Text, View, Switch, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

  const [userName, setUserName] = useState(""); //left empty replaced with placeholde text for better UX
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
  
  //refeactored "warning" to be "invisible" instead of "destroyed" to fix "jumping UI" bug
  //KeyboardAvoidingView prevents userName textInput box being covered by keyboard
  //Platform.OS check so styling works on all devices as IOS has to manually push up the content w/ padding
  //behavior={} prop tells mobile device how to move UI; ^conditional makes it work well on all devices
  //added vertical offest for android as behavior ternary created bug with "height"; added negative offset
  return ( 
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={Platform.OS === 'android' ? -70 : 0}
        style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollViewSheet}>
        <Text style={styles.bigTitleBlue}>Heart Beat Monitor</Text>
        <Text style={{ fontStyle: 'italic', fontSize: 20 }}>(Hi Alex! :-D)</Text>
      
        <Text style={styles.bpmDarkYellow}>BPM Reading:</Text>
        <Text style={checkDangerLevel((dangerCheck))}>{beat}</Text>
        <Text style={(isDanger === 'EMG') ? styles.warnDarkRed : styles.warnInvisible}>!! Warning !!</Text>

        <Text style={styles.helloPurple}>Hello!</Text>
        
        <View>
          <TextInput
            style={styles.userNameInput}
            placeholder="Your Name?"
            placeholderTextColor={'#7d127d'}
            onChangeText={setUserName}
            //value={userName}
          />
        </View>

        <View style={styles.toggleSwitches}>
          <Text style={styles.toggleTitleDarkGreen}>Check if you're an Athlete:</Text>
          <Switch onValueChange={() => toggleIsAthlete()} value={isAthlete}/>
        </View>
          <View style={styles.toggleSwitches}>
            <Text style={styles.toggleTitleDarkGreen}>Check if you're currently Exercising:</Text>
            <Switch onValueChange={() => toggleIsExercising()} value={isExercising}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

//<Text style={styles.medTitlePurple}>Hello {user}!</Text>
//<TextInput
          //style={styles.medTitlePurple}
          //onChangeText={setUserName}
          //value={userName}
      //>

      
      // <Text style={styles.smallTitleDarkYellow}>My beats so far are:</Text>
      // <Text style={checkDangerLevel((dangerCheck))}>{beat}</Text>
      // <Text style={(isDanger === 'EMG') ? styles.warnDarkRed : styles.warnInvisible}>!! Warning !!</Text>