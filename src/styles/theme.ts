import { StyleSheet } from 'react-native';

//future considerations : dark mode

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
  medTitleGreen: {
    color: '#217b19',
    fontWeight: 'bold',
    fontSize: 25,
  },
  smallTitleOrange: {
    color: '#7b5a19',
    fontWeight: 'bold',
    fontSize: 28,
  },
  dangerRed: {
    color: '#f51212',
    fontWeight: 'bold',
    fontSize: 100,
  },
});