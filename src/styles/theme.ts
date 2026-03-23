import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollViewSheet: {
    flexGrow: 1,
    backgroundColor: '#d5d9be', //light yellow 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  bigTitleBlue: {
    color: '#1535a8',
    fontWeight: 'bold',
    fontSize: 35,
    gap: 20,
    marginTop: 55,
  },
  helloPurple: {
    color: '#7d127d',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 30,
  },
  userNameInput: {
    height: 65,
    width: '80%',
    borderColor: '#2E5A88', 
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#7d127d',
    //backgroundColor: '#FFF',
    marginVertical: 10,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  // userNamePurple: {
  //   color: '#5a075a',
  //   fontWeight: 'bold',
  //   fontSize: 38,
  //   padding: 10,
  //   width: '20%',
  //   borderWidth: 3,
  //   borderColor: '#5a075a',
  //   borderRadius: 15,
  // },
  bpmDarkYellow: {
    color: '#59400d',
    fontWeight: 'bold',
    fontSize: 45,
    marginTop: 20,
  },
  toggleTitleDarkGreen: {
    color: '#257910',
    fontWeight: 'bold',
    fontSize: 20,
  },
  toggleSwitches: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    //width: '90%', 
    //marginVertical: 0,
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