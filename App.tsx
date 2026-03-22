import React from 'react';
import { Text, View } from 'react-native';

import { useHeartBeat } from './src/hooks/heartBeat';
import { styles } from './src/styles/theme';


export default function App() {

// DONT FORGET TO REMOVE COMMENTS AND CONSOLE LOGS AT THE END OF THE PROJECT !!!

  const { beat } = useHeartBeat();
  
  return (
    <View style={styles.mainContainer}>
    {/*debug line: <View style={{ flex: 1, backgroundColor: 'red' }}>*/}
      <Text style={styles.bigTitleBlack}>Tay's Heart Beat Monitor</Text>
      <Text style={styles.smallTitleBlue}>Hello Alex!</Text>
      <Text style={styles.dangerRed}>My beats so far are: {beat}</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//  style={styles.container}
