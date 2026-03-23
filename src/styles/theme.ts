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
    color: '#7d127d',
    fontWeight: 'bold',
    fontSize: 23,
  },
  userNamePurple: {
    color: '#5a075a',
    fontWeight: 'bold',
    fontSize: 25,
  },
  smallTitleDarkYellow: {
    color: '#7b5a19',
    fontWeight: 'bold',
    fontSize: 28,
  },
  smallTitleDarkGreen: {
    color: '#2f9117',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nominalGreen: {
    color: '#2c7113',
    fontWeight: 'bold',
    fontSize: 100,
  },
  emgBrightRed: {
    color: '#f10d0d',
    fontWeight: 'bold',
    fontSize: 100,
  },
  warnDarkRed: {
    color: '#cf0707',
    fontWeight: 'bold',
    fontSize: 65,
  },
  warnInvisible: {
    color: '#ffffff00',
    opacity: 0,
    fontWeight: 'bold',
    fontSize: 65,
  },
  cautionOrange: {
    color: '#c74f1f',
    fontWeight: 'bold',
    fontSize: 100,
  },
});