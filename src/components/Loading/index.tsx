import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import load from '../../assets/load.json';
import colors from '../../../styles/colors';

export const LoadingComponent = () => (
  <SafeAreaView style={styles.container}>
    <LottieView source={load} autoPlay loop style={styles.animation} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
});
