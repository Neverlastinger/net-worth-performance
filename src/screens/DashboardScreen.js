import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

const DashboardScreen = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.emptyScreen}>
      <Text style={styles.quote}>Know what you own, and know why you own it.</Text>
      <Text style={styles.author}>Peter Lynch</Text>
    </View>
    <View style={styles.emptyScreenButton}>
      <TouchableOpacity
        title="Add asset"
        style={styles.actionButton}
      >
        <Text style={styles.buttonText}>Add asset</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  emptyScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quote: {
    alignSelf: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#4d4d4d'
  },
  author: {
    alignSelf: 'center',
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
    color: '#4d4d4d'
  },
  emptyScreenButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30
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
  },
  actionButton: {
    paddingLeft: 72,
    paddingRight: 72,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#eb008d',
    borderRadius: 50
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  }
});

export default createStackNavigator({
  Dashboard: DashboardScreen,
});
