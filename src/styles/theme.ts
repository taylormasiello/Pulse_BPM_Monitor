import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d5d9be', //light yellow 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  bigTitleBlue: {
    color: '#1535a8',
    fontWeight: 'bold',
    fontSize: 30,
    gap: 20,
  },
  medTitlePurple: {
    color: '#710e71',
    fontWeight: 'bold',
    fontSize: 25,
  },
  smallTitleDarkYellow: {
    color: '#7b5a19',
    fontWeight: 'bold',
    fontSize: 28,
  },
  normalGreen: {
    color: '#2c7113',
    fontWeight: 'bold',
    fontSize: 100,
  },
  dangerRed: {
    color: '#f10d0d',
    fontWeight: 'bold',
    fontSize: 100,
  },
  veryDangerRed: { //for use when isAthelte and isExercise both false but within those ranges ?
    color: '#cf0707',
    fontWeight: 'bold',
    fontSize: 100,
  },
  warningOrange: {
    color: '#ff0000',
    fontWeight: 'bold',
    fontSize: 63,
  },
});