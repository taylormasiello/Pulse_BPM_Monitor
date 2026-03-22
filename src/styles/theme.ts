import { StyleSheet } from 'react-native';

//future considerations : dark mode

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//  style={styles.container}

export const styles = StyleSheet.create({
  mainContainer: {
    //marginTop: 250, // "density-independent pxls"
    //marginLeft: 50, //for ref: avg iphone is 390-430 units wide, 800-950 units tall

    // flex: 1 - tells a component to fill all available space, shared evenly amongst other components with the same parent. The larger the flex given, the higher the ratio of space a component will take compared to its siblings.

    flex: 1,
    backgroundColor: 'grey', //testing
    alignItems: 'center', //align children along the cross axis of their container
    justifyContent: 'center', //center a child horizontally within a container
  },
  bigTitleBlack: {
    // flex: value for childen of container w/ flex: 1 - each will get that ratio of screen compared to each other; black gets 2/6 of screen, blue 1/6, and red 3/6 because 1+2+3 = 6; each is a ratio of the total
    //flex: 2, 
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
  },
  smallTitleBlue: {
    //flex: 1, 
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
  },
  dangerRed: {
    //flex: 3, 
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
});