import React from 'react';
import { Text, View } from 'react-native';

import { useHeartBeat } from './src/hooks/heartBeat';
import { styles } from './src/styles/theme';


export default function App() {

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

  const { beat, isDanger } = useHeartBeat(); //const for "this render cycle" not "forever"
  //var isDanger = false
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.bigTitleBlue}>Tay's Heart Beat Monitor</Text>
      <Text style={styles.medTitlePurple}>Hello Alex!</Text>
      <Text style={styles.smallTitleOrange}>My beats so far are:</Text>
      <Text style={[styles.normalGreen, isDanger && styles.dangerRed]}>{beat}</Text>
    </View>
  );
}


