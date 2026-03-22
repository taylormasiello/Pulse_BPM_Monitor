import React from 'react';
import { Text, View } from 'react-native';

import { useHeartBeat } from './src/hooks/heartBeat';
import { styles } from './src/styles/theme';

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

export default function App() {

  const { beat, isDanger } = useHeartBeat(); //const for "this render cycle" not "forever"
  //init states for isAthlete and isExercising for user input
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.bigTitleBlue}>Tay's Heart Beat Monitor</Text>
      <Text style={styles.medTitlePurple}>Hello Alex!</Text>
      <Text style={styles.smallTitleDarkYellow}>My beats so far are:</Text>
      <Text style={[styles.normalGreen, isDanger && styles.dangerRed]}>{beat}</Text>
      <Text style={styles.warningOrange}>!! Warning!!</Text>
    </View>
  );
}

// "warning !!" will be made dynamic ; only displays when "high danger"

