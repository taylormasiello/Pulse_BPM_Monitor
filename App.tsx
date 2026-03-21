//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { useHeartBeat } from './src/hooks/heartBeat';


export default function App() {
  
  //<View> is like <div>
  //<Text> only way to get strings on a screen
  //useEffect is like a constructor/destructor

  const { beat } = useHeartBeat();
  
  return (
    <View style={styles.container}>
      <Text>Hello Taylor!</Text>
      {/*<StatusBar style="auto" />*/}
      {/*<HeartBeat />*/}
      <Text>My beats so far are: {beat}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
