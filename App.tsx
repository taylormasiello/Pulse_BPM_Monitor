import React, { useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { useHeartBeat } from './src/hooks/heartBeat';
import { styles } from './src/styles/theme';

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

export default function App() {
  //init states for isAthlete and isExercising for user input
  // let isAthelte = false;
  // let isExercising = false;
  let user = "Alex";

  const { beat, isDanger } = useHeartBeat(); //const "immutable for this render"
  const [isAthelte, setIsAthlete] = useState(false);
  const [isExercising, setIsExercising] = useState(false);
  
  //function state updates/updater functions; queues updater to be executed in next render
  //^when react processes queue, passes most recent "pending state" as "previous"
  //^^queue model confirms setters always using most current state, here from user inputs
  //^^^avoids bugs from asynchornous states like stale state; prevents race conditions
  const toggleIsAthlete = () => setIsAthlete(previousState => !previousState);
  const toggleIsExercising = () => setIsExercising(previousState => !previousState);
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.bigTitleBlue}>Tay's Heart Beat Monitor</Text>
      <Text style={styles.medTitlePurple}>Hello {user}!</Text>

      <View>"Check if you're an Athlete:
        <Switch onValueChange={toggleIsAthlete} value={isAthelte}/>
      </View>
        <View>Check if you're currently Exercising: 
          <Switch onValueChange={toggleIsExercising} value={isExercising}/>
      </View>

      <Text style={styles.smallTitleDarkYellow}>My beats so far are:</Text>
      <Text style={[styles.normalGreen, isDanger && styles.dangerRed]}>{beat}</Text>
      <Text style={styles.warningOrange}>!! Warning!!</Text>
    </View>
  );
};

/*/ "warning !!" will be made dynamic ; only displays when "high danger"
// user name input: TextInput component. Docs: React Native TextInput
//  initialize a name state (defaulting to "Alex"), and use a callback (specifically onChangeText) to update that state as the user types*/
// <Switch onValueChange={toggleIsAthlete} value={isAthelte}>isAthlete</Switch>
// <Switch onValueChange={toggleIsExercising} value={isExercising}>isExercising</Switch>

