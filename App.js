import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text style={styles.text}>Welcome to NetWorth Performance</Text>
        </View>
        <View style={styles.addIcon}>
          <Icon name="plus-circle" size={90} color="#eb008d" />
          <Text style={styles.addNew}>Track your first assets</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 36,
    textAlign: 'center'
  },
  addIcon: {
    marginTop: 60,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  plus: {
    fontSize: 54,
    textAlign: 'center'
  },
  addNew: {
    marginTop: 6,
    fontSize: 10,
    color: '#eb008d',
    textAlign: 'center'
  }
});

export default App;
